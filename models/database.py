import os
from collections.abc import Callable, Iterator
from contextlib import contextmanager
from typing import Any

import psycopg


def database_url() -> str:
    return os.getenv(
        "DATABASE_URL",
        "postgresql://postgres:1234@localhost:5432/library_book_management",
    )


@contextmanager
def connection() -> Iterator[psycopg.Connection[Any]]:
    with psycopg.connect(database_url(), options="-c search_path=library,public") as conn:
        yield conn


def with_connection(operation: Callable[[psycopg.Connection[Any]], Any]) -> Any:
    with connection() as conn:
        return operation(conn)
