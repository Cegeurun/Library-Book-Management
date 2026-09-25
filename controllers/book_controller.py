from datetime import date
from typing import Any

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from models.book_model import (
    create_book,
    delete_book,
    issue_book,
    list_books,
    list_issued_books,
    list_returned_books,
    return_book,
    update_book,
)


router = APIRouter(prefix="/api")


class BookInput(BaseModel):
    title: str = Field(min_length=1)
    author: str = Field(min_length=1)
    isbn: str | None = None
    publisher: str | None = None
    category: str | None = None
    year_published: int | None = None
    status: str = "Available"
    description: str | None = None


class LoanInput(BaseModel):
    book_id: int
    student_id: str = Field(min_length=1)
    member_name: str = Field(min_length=1)
    due_date: date


def book_values(book: BookInput) -> dict[str, Any]:
    return book.model_dump()


@router.get("/books")
def get_books() -> list[dict[str, Any]]:
    return list_books()


@router.post("/books", status_code=201)
def post_book(book: BookInput) -> dict[str, Any]:
    return create_book(book_values(book))


@router.put("/books/{book_id}")
def put_book(book_id: int, book: BookInput) -> dict[str, Any]:
    result = update_book(book_id, book_values(book))
    if result is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return result


@router.delete("/books/{book_id}")
def remove_book(book_id: int) -> dict[str, bool]:
    if not delete_book(book_id):
        raise HTTPException(status_code=404, detail="Book not found")
    return {"deleted": True}


@router.get("/loans/issued")
def get_issued_books() -> list[dict[str, Any]]:
    return list_issued_books()


@router.get("/loans/returned")
def get_returned_books() -> list[dict[str, Any]]:
    return list_returned_books()


@router.post("/loans", status_code=201)
def post_loan(loan: LoanInput) -> dict[str, Any]:
    return issue_book(loan.model_dump())


@router.post("/loans/{loan_id}/return")
def post_return(loan_id: int) -> dict[str, Any]:
    result = return_book(loan_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Open loan not found")
    return result
