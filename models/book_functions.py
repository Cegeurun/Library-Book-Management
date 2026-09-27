from collections.abc import Iterable, Mapping
from typing import Any


BOOK_FIELDS = (
    "id, title, author, isbn, publisher, category, year_published, "
    "status, description"
)

_VIEW_ORDERINGS = {
    "issued_books": "issued_on DESC, id DESC",
    "returned_books": "returned_on DESC, id DESC",
}


def copy_values(values: Mapping[str, Any]) -> dict[str, Any]:
    """Return an independent payload without changing the input mapping."""
    return dict(values)


def values_with_id(book_id: int, values: Mapping[str, Any]) -> dict[str, Any]:
    """Build the update payload without mutating the request payload."""
    return {**values, "id": book_id}


def storage_status(status: str | None) -> str:
    """Translate the API status into the database enum value."""
    return "on_loan" if status == "On loan" else "available"


def records(rows: Iterable[Mapping[str, Any]]) -> list[dict[str, Any]]:
    """Convert database rows into plain API records."""
    return list(map(dict, rows))


def view_query(view: str) -> str:
    """Build a view query from the small set of supported read models."""
    ordering = _VIEW_ORDERINGS[view]
    return f"SELECT * FROM library.{view} ORDER BY {ordering}"