from typing import Any

from psycopg.rows import dict_row

from .database import with_connection
from .book_functions import (
    BOOK_FIELDS,
    records,
    storage_status,
    values_with_id,
    view_query,
)


def list_books() -> list[dict[str, Any]]:
    def query(conn: Any) -> list[dict[str, Any]]:
        with conn.cursor(row_factory=dict_row) as cursor:
            cursor.execute(f"SELECT {BOOK_FIELDS} FROM library.book_catalog ORDER BY id")
            return records(cursor.fetchall())

    return with_connection(query)


def create_book(book: dict[str, Any]) -> dict[str, Any]:
    def query(conn: Any) -> dict[str, Any]:
        with conn.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                """
                INSERT INTO library.books
                    (title, author, isbn, publisher, category, year_published, description)
                VALUES (%(title)s, %(author)s, %(isbn)s, %(publisher)s, %(category)s,
                        %(year_published)s, %(description)s)
                RETURNING id, title, author, isbn, publisher, category, year_published,
                          'Available' AS status, description
                """,
                book,
            )
            return cursor.fetchone()

    return with_connection(query)


def update_book(book_id: int, book: dict[str, Any]) -> dict[str, Any] | None:
    def query(conn: Any) -> dict[str, Any] | None:
        with conn.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                """
                UPDATE library.books
                SET title = %(title)s, author = %(author)s, isbn = %(isbn)s,
                    publisher = %(publisher)s, category = %(category)s,
                    year_published = %(year_published)s,
                    status = %(status)s::library.book_status,
                    description = %(description)s
                WHERE id = %(id)s
                RETURNING id, title, author, isbn, publisher, category, year_published,
                          CASE status WHEN 'available' THEN 'Available' ELSE 'On loan' END AS status,
                          description
                """,
                values_with_id(
                    book_id,
                    {**book, "status": storage_status(book.get("status"))},
                ),
            )
            return cursor.fetchone()

    return with_connection(query)


def delete_book(book_id: int) -> bool:
    def query(conn: Any) -> bool:
        with conn.cursor() as cursor:
            cursor.execute("DELETE FROM library.books WHERE id = %s", (book_id,))
            return cursor.rowcount == 1

    return with_connection(query)


def list_issued_books() -> list[dict[str, Any]]:
    return with_connection(lambda conn: _fetch_view(conn, "issued_books"))


def list_returned_books() -> list[dict[str, Any]]:
    return with_connection(lambda conn: _fetch_view(conn, "returned_books"))


def issue_book(loan: dict[str, Any]) -> dict[str, Any]:
    def query(conn: Any) -> dict[str, Any]:
        with conn.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                """
                WITH member AS (
                    INSERT INTO library.members (student_id, full_name)
                    VALUES (%(student_id)s, %(member_name)s)
                    ON CONFLICT (student_id) DO UPDATE SET full_name = EXCLUDED.full_name
                    RETURNING id
                )
                INSERT INTO library.loans (book_id, member_id, due_date)
                VALUES (%(book_id)s, (SELECT id FROM member), %(due_date)s)
                RETURNING id, book_id, issued_on, due_date
                """,
                loan,
            )
            return cursor.fetchone()

    return with_connection(query)


def return_book(loan_id: int) -> dict[str, Any] | None:
    def query(conn: Any) -> dict[str, Any] | None:
        with conn.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                """
                UPDATE library.loans
                SET returned_on = CURRENT_DATE
                WHERE id = %s AND returned_on IS NULL
                RETURNING id, book_id, returned_on
                """,
                (loan_id,),
            )
            return cursor.fetchone()

    return with_connection(query)


def _fetch_view(conn: Any, view: str) -> list[dict[str, Any]]:
    with conn.cursor(row_factory=dict_row) as cursor:
        cursor.execute(view_query(view))
        return records(cursor.fetchall())
from psycopg.rows import dict_row
