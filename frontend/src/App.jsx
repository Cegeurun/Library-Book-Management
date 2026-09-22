import { useState, useEffect } from "react";
import { DateTime } from 'luxon';
import "./App.css";
import yayLogo from "./assets/yay.png";

// Sample records keep the UI usable until the backend is connected.
const initialBooks = [
  {
    id: 1,
    title: "The Design of Everyday Things",
    author: "Don Norman",
    isbn: "9780262525671",
    publisher: "Basic Books",
    category: "Design",
    yearPublished: 1988,
    status: "Available",
    description:
      "A foundational design book that explores how everyday objects and systems should be designed for clarity, usability, and human behavior.",
  },
  {
    id: 2,
    title: "The Creative Act",
    author: "Rick Rubin",
    isbn: "9780593652886",
    publisher: "Penguin Press",
    category: "Creativity",
    yearPublished: 2023,
    status: "Available",
    description:
      "A guide to the creative process and the habits that help ideas become meaningful work.",
  },
  {
    id: 3,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    isbn: "9780374533557",
    publisher: "Farrar, Straus and Giroux",
    category: "Psychology",
    yearPublished: 2011,
    status: "On loan",
    description:
      "An exploration of the two systems that drive the way people think and make decisions.",
  },
  ...Array.from({ length: 18 }, (_, index) => ({
    id: index + 4,
    title: `Library Book ${index + 4}`,
    author: `Author ${index + 4}`,
    isbn: `978000000${String(index + 4).padStart(4, "0")}`,
    publisher: "Library Press",
    category: "General",
    yearPublished: 2000 + index,
    status: index % 3 === 0 ? "On loan" : "Available",
    description: `A test book record for pagination, number ${index + 4}.`,
  })),
];

const issuedBooks = [
  {
    id: 1,
    title: "The Design of Everyday Things",
    author: "Don Norman",
    member: "Aarav Mehta",
    studentId: "LB-1048",
    issuedOn: "08 Sep 2026",
    dueDate: "22 Sep 2026",
    status: "On loan",
  },
  {
    id: 2,
    title: "The Creative Act",
    author: "Rick Rubin",
    member: "Maya Patel",
    studentId: "LB-1031",
    issuedOn: "04 Sep 2026",
    dueDate: "18 Sep 2026",
    status: "Overdue",
  },
  {
    id: 3,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    member: "Noah Williams",
    studentId: "LB-1022",
    issuedOn: "02 Sep 2026",
    dueDate: "16 Sep 2026",
    status: "Overdue",
  },
  {
    id: 4,
    title: "The Design of Everyday Things",
    author: "Don Norman",
    member: "Aarav Mehta",
    studentId: "LB-1048",
    issuedOn: "08 Sep 2026",
    dueDate: "22 Sep 2026",
    status: "On loan",
  },
  ...Array.from({ length: 17 }, (_, index) => ({
    id: index + 5,
    title: `Issued Book ${index + 5}`,
    author: `Author ${index + 5}`,
    member: `Member ${index + 5}`,
    studentId: `LB-${1050 + index}`,
    issuedOn: `${String((index % 9) + 1).padStart(2, "0")} Sep 2026`,
    dueDate: `${String((index % 9) + 15).padStart(2, "0")} Sep 2026`,
    status: index % 3 === 0 ? "Overdue" : "On loan",
  })),
];

const returnedBooks = [
  {
    id: 1,
    title: "The Design of Everyday Things",
    author: "Don Norman",
    member: "Aarav Mehta",
    studentId: "LB-1048",
    issuedOn: "25 Aug 2026",
    returnedOn: "08 Sep 2026",
    status: "Available",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    member: "Maya Patel",
    studentId: "LB-1031",
    issuedOn: "20 Aug 2026",
    returnedOn: "03 Sep 2026",
    status: "Available",
  },
  {
    id: 3,
    title: "The Creative Act",
    author: "Rick Rubin",
    member: "Noah Williams",
    studentId: "LB-1022",
    issuedOn: "16 Aug 2026",
    returnedOn: "30 Aug 2026",
    status: "Available",
  },
  {
    id: 4,
    title: "The Design of Everyday Things",
    author: "Don Norman",
    member: "Sara Khan",
    studentId: "LB-1009",
    issuedOn: "10 Aug 2026",
    returnedOn: "24 Aug 2026",
    status: "Available",
  },
  ...Array.from({ length: 17 }, (_, index) => ({
    id: index + 5,
    title: `Returned Book ${index + 5}`,
    author: `Author ${index + 5}`,
    member: `Member ${index + 5}`,
    studentId: `LB-${1050 + index}`,
    issuedOn: `${String((index % 9) + 1).padStart(2, "0")} Aug 2026`,
    returnedOn: `${String((index % 9) + 15).padStart(2, "0")} Aug 2026`,
    status: "Available",
  })),
];

const allStatuses = [
  ...new Set(
    [...initialBooks, ...issuedBooks, ...returnedBooks].map((book) => book.status),
  ),
];

const pageSize = 10;

function App() {
  const [activePage, setActivePage] = useState("manage");
  const [books, setBooks] = useState(initialBooks);
  const [selectedBookId, setSelectedBookId] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [catalogStatus, setCatalogStatus] = useState("all");
  const [showBookForm, setShowBookForm] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    isbn: "",
    publisher: "",
    category: "",
    yearPublished: "",
    description: "",
  });
  const [editBook, setEditBook] = useState(null);
  const [catalogPage, setCatalogPage] = useState(1);

  const selectedBook =
    books.find((book) => book.id === selectedBookId) || books[0];
  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author} ${book.isbn}`
      .toLowerCase()
      .includes(searchText.toLowerCase()) &&
    (catalogStatus === "all" || book.status === catalogStatus),
  );
  const catalogPageCount = Math.max(1, Math.ceil(filteredBooks.length / pageSize));
  const visibleBooks = filteredBooks.slice(
    (catalogPage - 1) * pageSize,
    catalogPage * pageSize,
  );

  // Button handlers are intentionally small placeholders for future API calls.
  const handleCreateBook = () => setShowBookForm(true);
  const handleCloseForm = () => setShowBookForm(false);
  const handleSaveNewBook = (event) => {
    event.preventDefault();
    window.alert("TODO: Implement the Add Book function properly.");
    const book = {
      ...newBook,
      id: Math.max(...books.map((currentBook) => currentBook.id), 0) + 1,
      status: "Available",
      yearPublished: Number(newBook.yearPublished),
    };
    setBooks((currentBooks) => [...currentBooks, book]);
    setSelectedBookId(book.id);
    setShowBookForm(false);
    setNewBook({
      title: "",
      author: "",
      isbn: "",
      publisher: "",
      category: "",
      yearPublished: "",
      description: "",
    });
  };
  const handleEditBook = () => setEditBook({ ...selectedBook });
  const handleCloseEditForm = () => setEditBook(null);
  const handleSaveBook = (event) => {
    event.preventDefault();
    window.alert("TODO: Implement the Save Changes function properly.");
    setBooks((currentBooks) =>
      currentBooks.map((book) => (book.id === editBook.id ? editBook : book)),
    );
    handleCloseEditForm();
  };
  const handleIssueBook = (book) => {
    window.alert(`Issue ${book.title} here.`);
  };
  const handleDeleteBook = () => {
    window.alert(`Delete ${selectedBook.title} here.`);
    setBooks((currentBooks) =>
      currentBooks.filter((book) => book.id !== selectedBook.id),
    );
  };
  const handleReturnedBookDetails = (title) => {
    setCatalogPage(1);
    setSearchText(title);
    setActivePage("manage");
  };

  return (
    <div className="app-shell">
      {/* Top navigation and account area */}
      <header className="topbar">
        <div className="brand-name">LIBRARY MANAGEMENT SYSTEM</div>
        <img className="library-mark" src={yayLogo} alt="Library logo" />
        <TimeZoneDisplay />
      </header>
      <div className="workspace">
        {/* Main page navigation */}
        <aside className="sidebar">
          <p className="sidebar-label">MANAGEMENT</p>
          <button
            className={`nav-item ${activePage === "manage" ? "active" : ""}`}
            type="button"
            onClick={() => setActivePage("manage")}
          >
            <span className="nav-icon">x</span> Manage Library
          </button>
          <button
            className={`nav-item ${activePage === "issued" ? "active" : ""}`}
            type="button"
            onClick={() => setActivePage("issued")}
          >
            <span className="nav-icon">□</span> Issued Books
          </button>
          <button
            className={`nav-item ${activePage === "returned" ? "active" : ""}`}
            type="button"
            onClick={() => setActivePage("returned")}
          >
            <span className="nav-icon">✓</span> Returned Books
          </button>
        </aside>
        <main className="main-content">
          {activePage === "manage" ? (
            <>
              <section className="page-heading">
                <div>
                  <h1>Manage Library</h1>
                  <p>
                    Create, read, update, and delete book records in one
                    workspace while keeping the library catalog organized and up
                    to date.
                  </p>
                </div>
                <div className="heading-actions">
                  <button
                    className="primary-button"
                    type="button"
                    onClick={handleCreateBook}
                  >
                    + &nbsp; Add Book
                  </button>
                </div>
              </section>
              <section className="toolbar">
                <label className="search-box">
                  <span>⌕</span>
                  <input
                    value={searchText}
                    onChange={(event) => {
                      setCatalogPage(1);
                      setSearchText(event.target.value);
                    }}
                    placeholder="Search books, author, or ISBN"
                  />
                </label>
                <select
                  className="filter-select"
                  value={catalogStatus}
                  onChange={(event) => {
                    setCatalogPage(1);
                    setCatalogStatus(event.target.value);
                  }}
                  aria-label="Filter books by status"
                >
                  <option value="all">All statuses</option>
                  <option value="Available">Available</option>
                  <option value="On loan">On loan</option>
                </select>
              </section>
              <section className="catalog-layout">
                <div className="catalog-panel panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Book Catalog</h2>
                      <p>Browse your collection</p>
                    </div>
                  </div>
                  <div className="catalog-table table-scroll">
                    <div className="table-row table-header">
                      <span>BOOK</span>
                      <span>AUTHOR</span>
                      <span>STATUS</span>
                      <span></span>
                    </div>
                    {visibleBooks.map((book) => (
                      <button
                        className={`table-row book-row ${selectedBookId === book.id ? "selected" : ""}`}
                        type="button"
                        key={book.id}
                        onClick={() => setSelectedBookId(book.id)}
                      >
                        <span>
                          <strong>{book.title}</strong>
                          <small>{book.isbn}</small>
                        </span>
                        <span>{book.author}</span>
                        <span>
                          <em
                            className={`status ${book.status === "On loan" ? "loan" : ""}`}
                          >
                            ● {book.status}
                          </em>
                        </span>
                        <span>
                          <button
                            className={`table-view issue-book-button ${book.status === "Available" ? "available" : "unavailable"}`}
                            type="button"
                            disabled={book.status !== "Available"}
                            onClick={(event) => {
                              event.stopPropagation();
                              setSelectedBookId(book.id);
                              handleIssueBook(book);
                            }}
                          >
                            Issue book
                          </button>
                        </span>
                      </button>
                    ))}
                  </div>
                  <Pagination
                    currentPage={catalogPage}
                    pageCount={catalogPageCount}
                    totalItems={filteredBooks.length}
                    onPageChange={setCatalogPage}
                  />
                </div>
                <BookDetails
                  book={selectedBook}
                  onEdit={handleEditBook}
                  onDelete={handleDeleteBook}
                />
              </section>
            </>
          ) : activePage === "issued" ? (
            <IssuedBooks
              searchText={searchText}
              setSearchText={setSearchText}
            />
          ) : (
            <ReturnedBooks
              searchText={searchText}
              setSearchText={setSearchText}
              onViewDetails={handleReturnedBookDetails}
            />
          )}
        </main>
      </div>
      {showBookForm && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={handleCloseForm}
        >
          <form
            className="modal edit-modal"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
            onSubmit={handleSaveNewBook}
          >
            <h2>Create a book</h2>
            <p>Add the details for the new book record.</p>
            <label>
              Title <span className="required-mark">*</span>
              <input
                required
                value={newBook.title}
                onChange={(event) => setNewBook({ ...newBook, title: event.target.value })}
              />
            </label>
            <label>
              Author <span className="required-mark">*</span>
              <input
                required
                value={newBook.author}
                onChange={(event) => setNewBook({ ...newBook, author: event.target.value })}
              />
            </label>
            <label>
              ISBN
              <input
                value={newBook.isbn}
                onChange={(event) => setNewBook({ ...newBook, isbn: event.target.value })}
              />
            </label>
            <label>
              Publisher
              <input
                value={newBook.publisher}
                onChange={(event) => setNewBook({ ...newBook, publisher: event.target.value })}
              />
            </label>
            <label>
              Category
              <input
                value={newBook.category}
                onChange={(event) => setNewBook({ ...newBook, category: event.target.value })}
              />
            </label>
            <label>
              Year published
              <input
                type="number"
                value={newBook.yearPublished}
                onChange={(event) => setNewBook({ ...newBook, yearPublished: event.target.value })}
              />
            </label>
            <label>
              Description
              <textarea
                value={newBook.description}
                onChange={(event) => setNewBook({ ...newBook, description: event.target.value })}
              />
            </label>
            <div>
              <button
                className="secondary-button"
                type="button"
                onClick={handleCloseForm}
              >
                Cancel
              </button>
              <button
                className="primary-button"
                type="submit"
              >
                Add book
              </button>
            </div>
          </form>
        </div>
      )}
      {editBook && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={handleCloseEditForm}
        >
          <form
            className="modal edit-modal"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
            onSubmit={handleSaveBook}
          >
            <h2>Edit book</h2>
            <p>Replace the current book values, then save the record.</p>
            <label>
              Title
              <input
                value={editBook.title}
                onChange={(event) => setEditBook({ ...editBook, title: event.target.value })}
              />
            </label>
            <label>
              Author
              <input
                value={editBook.author}
                onChange={(event) => setEditBook({ ...editBook, author: event.target.value })}
              />
            </label>
            <label>
              ISBN
              <input
                value={editBook.isbn}
                onChange={(event) => setEditBook({ ...editBook, isbn: event.target.value })}
              />
            </label>
            <label>
              Publisher
              <input
                value={editBook.publisher}
                onChange={(event) => setEditBook({ ...editBook, publisher: event.target.value })}
              />
            </label>
            <label>
              Category
              <input
                value={editBook.category}
                onChange={(event) => setEditBook({ ...editBook, category: event.target.value })}
              />
            </label>
            <label>
              Year published
              <input
                type="number"
                value={editBook.yearPublished}
                onChange={(event) => setEditBook({ ...editBook, yearPublished: event.target.value })}
              />
            </label>
            <label>
              Status
              <select
                value={editBook.status}
                onChange={(event) => setEditBook({ ...editBook, status: event.target.value })}
              >
                <option value="Available">Available</option>
                <option value="On loan">On loan</option>
              </select>
            </label>
            <label>
              Description
              <textarea
                value={editBook.description}
                onChange={(event) => setEditBook({ ...editBook, description: event.target.value })}
              />
            </label>
            <div>
              <button className="secondary-button" type="button" onClick={handleCloseEditForm}>
                Cancel
              </button>
              <button className="primary-button" type="submit">
                Save changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// Date Time for Header
function TimeZoneDisplay() {
    const [phTime, setPhTime] = useState(() =>
      DateTime.now().setZone('Asia/Manila').toFormat('hh:mm:ss a'),
    );
    const [phDate, setPhDate] = useState(() =>
      DateTime.now().setZone('Asia/Manila').toFormat('MM-dd-yyyy'),
    );


    useEffect(() => {
      const timer = setInterval (() => {
        const now = DateTime.now().setZone('Asia/Manila');
        setPhTime(now.toFormat('hh:mm:ss a'));
        setPhDate(now.toFormat('MM-dd-yyyy'));
      }, 1000);
    
    return () => clearInterval(timer);
    }, []);  

  return (
    <div className="timezone-display">
      <span className="timezone-offset">GMT+8</span>
      <span className="timezone-values">
        <span className="timezone-time">{phTime}</span>
        <span className="timezone-date">{phDate}</span>
      </span>
    </div>
  );
}

// Selected record details and future CRUD actions.
function BookDetails({ book, onEdit, onDelete }) {
  return (
    <aside className="details-panel panel">
      <div className="panel-heading">
        <div>
          <h2>Record details</h2>
          <p>Review the selected book record.</p>
        </div>
      </div>
      <div className="book-preview">
        <div className="book-cover">BK</div>
        <div>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <em className={`status ${book.status === "On loan" ? "loan":""}`}>● {book.status}</em>
          <small>ISBN {book.isbn}</small>
        </div>
      </div>
      <h3 className="metadata-heading">Metadata</h3>
      <div className="metadata-grid">
        {[
          ["Title", "title"],
          ["Author", "author"],
          ["ISBN", "isbn"],
          ["Publisher", "publisher"],
          ["Category", "category"],
          ["Year Published", "yearPublished"],
        ].map(([label, field]) => (
            <label key={label}>
              {label}
              <input value={book[field]} readOnly />
            </label>
        ))}
      </div>
      <label className="description-field">
        Description
        <textarea value={book.description} readOnly />
      </label>
      <div className="detail-actions">
        <button className="primary-button" type="button" onClick={onEdit}>
          ✎ &nbsp; Edit
        </button>
        <button className="delete-button" type="button" onClick={onDelete}>
          ▢ &nbsp; Delete
        </button>
      </div>
    </aside>
  );
}

function isDateInRange(date, dateRange) {
  const value = DateTime.fromFormat(date, "dd LLL yyyy").toISODate();

  return (
    (!dateRange.start || value >= dateRange.start) &&
    (!dateRange.end || value <= dateRange.end)
  );
}

function DateRangeFilter({ dateRange, onChange, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const rangeLabel = "🗓";

  return (
    <div className="date-range-filter">
      <button
        className="filter-select date-range-trigger"
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={label}
      >
        {rangeLabel}
      </button>
      {isOpen && (
        <div className="date-range-popup" role="dialog" aria-label={label}>
          <label>
            Start date
            <input
              type="date"
              value={dateRange.start}
              max={dateRange.end || undefined}
              onChange={(event) => onChange({ ...dateRange, start: event.target.value })}
            />
          </label>
          <label>
            End date
            <input
              type="date"
              value={dateRange.end}
              min={dateRange.start || undefined}
              onChange={(event) => onChange({ ...dateRange, end: event.target.value })}
            />
          </label>
        </div>
      )}
    </div>
  );
}

// Issued book records mirror the second reference screen.
function IssuedBooks({ searchText, setSearchText }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const handleMarkAsReturned = (book) => {
    window.alert(`TODO: Add the return workflow for ${book.title}. Make sure na nakadisable ung button after nya mareturn successfully thx.`);
  };
  const filteredIssuedBooks = issuedBooks.filter((book) =>
    `${book.title} ${book.member} ${book.studentId}`
      .toLowerCase()
      .includes(searchText.toLowerCase()) &&
    (statusFilter === "all" || book.status === statusFilter) &&
    isDateInRange(book.issuedOn, dateRange),
  );
  const pageCount = Math.max(1, Math.ceil(filteredIssuedBooks.length / pageSize));
  const visibleIssuedBooks = filteredIssuedBooks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <section className="issued-page">
      <section className="page-heading">
        <div>
          <h1>Issued Books</h1>
          <p>Track books currently on loan and their return dates.</p>
        </div>
      </section>
      <div className="filter-bar">
        <label className="search-box issued-search">
          <span>⌕</span>
          <input
            value={searchText}
            onChange={(event) => {
              setCurrentPage(1);
              setSearchText(event.target.value);
            }}
            placeholder="Search book, member, or ID"
          />
        </label>
        <select
          className="filter-select"
          value={statusFilter}
          onChange={(event) => {
            setCurrentPage(1);
            setStatusFilter(event.target.value);
          }}
          aria-label="Filter issued books by status"
        >
          <option value="all">All statuses</option>
          {allStatuses.map((status) => (
            <option value={status} key={status}>{status}</option>
          ))}
        </select>
        <DateRangeFilter
          dateRange={dateRange}
          onChange={(range) => {
            setCurrentPage(1);
            setDateRange(range);
          }}
          label="Filter issued books by date range"
        />
      </div>
      <div className="issued-table panel">
        <div className="table-row table-header">
          <span>BOOK</span>
          <span>MEMBER</span>
          <span>STUDENT ID</span>
          <span>ISSUED ON</span>
          <span>DUE DATE</span>
          <span>STATUS</span>
          
        </div>
        {visibleIssuedBooks.map((book) => (
          <div className="table-row issued-row" key={book.id}>
            <span>
              <strong>{book.title}</strong>
              <small>{book.author}</small>
            </span>
            <span>{book.member}</span>
            <span>{book.studentId}</span>
            <span>{book.issuedOn}</span>
            <span>{book.dueDate}</span>
            <span>
              <em
                className={`status ${book.status === "Overdue" ? "overdue" : ""}`}
              >
                ● {book.status}
              </em>
            </span>
            <span>
              <button
                className="secondary-button"
                type="button"
                onClick={() => handleMarkAsReturned(book)}
              >
                ✓ Mark As Returned
              </button>
            </span>
          </div>
        ))}
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          totalItems={filteredIssuedBooks.length}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
}

// Returned book records use the issued-book layout with return-specific fields.
function ReturnedBooks({ searchText, setSearchText, onViewDetails }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const filteredReturnedBooks = returnedBooks.filter((book) =>
    `${book.title} ${book.member} ${book.studentId}`
      .toLowerCase()
      .includes(searchText.toLowerCase()) &&
    (statusFilter === "all" || book.status === statusFilter) &&
    isDateInRange(book.returnedOn, dateRange),
  );
  const pageCount = Math.max(1, Math.ceil(filteredReturnedBooks.length / pageSize));
  const visibleReturnedBooks = filteredReturnedBooks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <section className="issued-page">
      <section className="page-heading">
        <div>
          <h1>Returned Books</h1>
          <p>
            Review books that have been returned.
          </p>
        </div>
      </section>
      <div className="filter-bar">
        <label className="search-box issued-search">
          <span>⌕</span>
          <input
            value={searchText}
            onChange={(event) => {
              setCurrentPage(1);
              setSearchText(event.target.value);
            }}
            placeholder="Search book, member, or ID"
          />
        </label>
        <select
          className="filter-select"
          value={statusFilter}
          onChange={(event) => {
            setCurrentPage(1);
            setStatusFilter(event.target.value);
          }}
          aria-label="Filter returned books by status"
        >
          <option value="all">All statuses</option>
          {allStatuses.map((status) => (
            <option value={status} key={status}>{status}</option>
          ))}
        </select>
        <DateRangeFilter
          dateRange={dateRange}
          onChange={(range) => {
            setCurrentPage(1);
            setDateRange(range);
          }}
          label="Filter returned books by date range"
        />
      </div>
      <div className="issued-table returned-table panel">
        <div className="table-row table-header">
          <span>BOOK</span>
          <span>MEMBER</span>
          <span>STUDENT ID</span>
          <span>RETURNED ON</span>
          <span>STATUS</span>
        </div>
        {visibleReturnedBooks.map((book) => (
          <div className="table-row issued-row" key={book.id}>
            <span>
              <strong>{book.title}</strong>
              <small>{book.author}</small>
            </span>
            <span>{book.member}</span>
            <span>{book.studentId}</span>
            <span>{book.returnedOn}</span>
            <span><em className="status">● {book.status}</em></span>
            <span>
              <button
                className="secondary-button"
                type="button"
                onClick={() => onViewDetails(book.title)}
              >
                👁 View Details
              </button>
            </span>
          </div>
        ))}
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          totalItems={filteredReturnedBooks.length}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
}

function Pagination({ currentPage, pageCount, totalItems, onPageChange }) {
  const firstItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const lastItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="panel-footer">
      <span>Showing {firstItem}-{lastItem} of {totalItems}</span>
      <span className="pagination-controls">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        <b>{currentPage}</b>
        <button
          type="button"
          disabled={currentPage === pageCount}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </span>
    </div>
  );
}

export default App;
