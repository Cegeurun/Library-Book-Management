import { useState } from "react";
import "./App.css";

// Sample records keep the UI usable until the backend is connected.
const initialBooks = [
  {
    id: 1,
    title: "The Design of Everyday Things",
    author: "Don Norman",
    isbn: "9780262525671",
    publisher: "Basic Books",
    category: "Design",
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
    status: "On loan",
    description:
      "An exploration of the two systems that drive the way people think and make decisions.",
  },
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
    condition: "Good",
    status: "Returned",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    member: "Maya Patel",
    studentId: "LB-1031",
    issuedOn: "20 Aug 2026",
    returnedOn: "03 Sep 2026",
    condition: "Good",
    status: "Returned",
  },
  {
    id: 3,
    title: "The Creative Act",
    author: "Rick Rubin",
    member: "Noah Williams",
    studentId: "LB-1022",
    issuedOn: "16 Aug 2026",
    returnedOn: "30 Aug 2026",
    condition: "Minor wear",
    status: "Returned",
  },
  {
    id: 4,
    title: "The Design of Everyday Things",
    author: "Don Norman",
    member: "Sara Khan",
    studentId: "LB-1009",
    issuedOn: "10 Aug 2026",
    returnedOn: "24 Aug 2026",
    condition: "Good",
    status: "Returned",
  },
];

function App() {
  const [activePage, setActivePage] = useState("manage");
  const [books, setBooks] = useState(initialBooks);
  const [selectedBookId, setSelectedBookId] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [showBookForm, setShowBookForm] = useState(false);

  const selectedBook =
    books.find((book) => book.id === selectedBookId) || books[0];
  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author} ${book.isbn}`
      .toLowerCase()
      .includes(searchText.toLowerCase()),
  );

  // Button handlers are intentionally small placeholders for future API calls.
  const handleCreateBook = () => setShowBookForm(true);
  const handleCloseForm = () => setShowBookForm(false);
  const handleImportBooks = () =>
    window.alert("Import books from a CSV file here.");
  const handleViewBook = () => window.alert(`Viewing ${selectedBook.title}`);
  const handleEditBook = () => window.alert(`Editing ${selectedBook.title}`);
  const handleDeleteBook = () => {
    window.alert(`Delete ${selectedBook.title} here.`);
    setBooks((currentBooks) =>
      currentBooks.filter((book) => book.id !== selectedBook.id),
    );
  };

  return (
    <div className="app-shell">
      {/* Top navigation and account area */}
      <header className="topbar">
        <div className="brand-name">LIBRARY MANAGEMENT SYSTEM</div>
        <div className="library-mark" aria-label="Library logo">
          <span>LB</span>
        </div>
        <button
          className="account-button"
          type="button"
          onClick={() => window.alert("Account menu")}
        >
          <span>
            <strong>Library Admin</strong>
            <small>Administrator</small>
          </span>
          <b>LA</b>
        </button>
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
                    + &nbsp; Create Book
                  </button>
                  <button
                    className="secondary-button"
                    type="button"
                    onClick={handleImportBooks}
                  >
                    ⇧ &nbsp; Import CSV
                  </button>
                </div>
              </section>
              <section className="toolbar">
                <label className="search-box">
                  <span>⌕</span>
                  <input
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                    placeholder="Search books, author, or ISBN"
                  />
                </label>
                <div className="toolbar-actions">
                  <button
                    className="select-button"
                    type="button"
                    onClick={() => window.alert("Choose a status filter")}
                  >
                    All statuses⌄
                  </button>
                  <button
                    className="select-button"
                    type="button"
                    onClick={() => window.alert("Choose a sort order")}
                  >
                    Newest first⌄
                  </button>
                </div>
              </section>
              <section className="catalog-layout">
                <div className="catalog-panel panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Book Catalog</h2>
                      <p>Browse your collection</p>
                    </div>
                    <span className="count-pill">
                      {filteredBooks.length} records
                    </span>
                  </div>
                  <div className="catalog-table table-scroll">
                    <div className="table-row table-header">
                      <span>BOOK</span>
                      <span>AUTHOR</span>
                      <span>STATUS</span>
                      <span></span>
                    </div>
                    {filteredBooks.map((book) => (
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
                            className="table-view"
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              setSelectedBookId(book.id);
                              handleViewBook();
                            }}
                          >
                            ◉ &nbsp; View
                          </button>
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="panel-footer">
                    <span>Showing 1-{filteredBooks.length} of 24</span>
                    <span>
                      Previous <b>1</b>{" "}
                      <button
                        type="button"
                        onClick={() => window.alert("Next page")}
                      >
                        Next
                      </button>
                    </span>
                  </div>
                </div>
                <BookDetails
                  book={selectedBook}
                  onView={handleViewBook}
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
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <h2>Create a book</h2>
            <p>This form is ready for your create-book API.</p>
            <input placeholder="Book title" />
            <input placeholder="Author" />
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
                type="button"
                onClick={() => {
                  handleCloseForm();
                  window.alert("Create book here.");
                }}
              >
                Create book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Selected record details and future CRUD actions.
function BookDetails({ book, onView, onEdit, onDelete }) {
  return (
    <aside className="details-panel panel">
      <div className="panel-heading">
        <div>
          <h2>Record details</h2>
          <p>Review the selected book record.</p>
        </div>
        <span className="selected-pill">Selected record</span>
      </div>
      <div className="book-preview">
        <div className="book-cover">BK</div>
        <div>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <em className="status">● {book.status}</em>
          <small>ISBN {book.isbn}</small>
        </div>
      </div>
      <h3 className="metadata-heading">Metadata</h3>
      <div className="metadata-grid">
        {["Title", "Author", "ISBN", "Publisher", "Category", "Status"].map(
          (label) => (
            <label key={label}>
              {label}
              <input value={book[label.toLowerCase()]} readOnly />
            </label>
          ),
        )}
      </div>
      <label className="description-field">
        Description
        <textarea value={book.description} readOnly />
      </label>
      <div className="detail-actions">
        <button className="primary-button" type="button" onClick={onView}>
          + &nbsp; Create
        </button>
        <button className="secondary-button" type="button" onClick={onView}>
          ◉ &nbsp; Read
        </button>
        <button className="secondary-button" type="button" onClick={onEdit}>
          ✎ &nbsp; Edit
        </button>
        <button className="delete-button" type="button" onClick={onDelete}>
          ▢ &nbsp; Delete
        </button>
      </div>
    </aside>
  );
}

// Issued book records mirror the second reference screen.
function IssuedBooks({ searchText, setSearchText }) {
  const filteredIssuedBooks = issuedBooks.filter((book) =>
    `${book.title} ${book.member} ${book.studentId}`
      .toLowerCase()
      .includes(searchText.toLowerCase()),
  );
  return (
    <section className="issued-page">
      <section className="page-heading">
        <div>
          <h1>Issued Books</h1>
          <p>Track books currently on loan and their return dates.</p>
        </div>
        <button
          className="primary-button"
          type="button"
          onClick={() => window.alert("Issue a book here")}
        >
          + &nbsp; Issue a Book
        </button>
      </section>
      <label className="search-box issued-search">
        <span>⌕</span>
        <input
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search book, member, or ID"
        />
      </label>
      <div className="issued-table panel">
        <div className="table-row table-header">
          <span>BOOK</span>
          <span>MEMBER</span>
          <span>STUDENT ID</span>
          <span>ISSUED ON</span>
          <span>DUE DATE</span>
          <span>STATUS</span>
        </div>
        {filteredIssuedBooks.map((book) => (
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
          </div>
        ))}
        <div className="panel-footer">
          <span>Showing 1-{filteredIssuedBooks.length} of 24</span>
          <span>
            Previous <b>1</b>{" "}
            <button type="button" onClick={() => window.alert("Next page")}>
              Next
            </button>
          </span>
        </div>
      </div>
    </section>
  );
}

// Returned book records use the issued-book layout with return-specific fields.
function ReturnedBooks({ searchText, setSearchText }) {
  const filteredReturnedBooks = returnedBooks.filter((book) =>
    `${book.title} ${book.member} ${book.studentId}`
      .toLowerCase()
      .includes(searchText.toLowerCase()),
  );

  return (
    <section className="issued-page">
      <section className="page-heading">
        <div>
          <h1>Returned Books</h1>
          <p>
            Review books that have been returned and their recorded condition.
          </p>
        </div>
        <button
          className="primary-button"
          type="button"
          onClick={() => window.alert("Record a returned book here")}
        >
          + &nbsp; Record Return
        </button>
      </section>
      <label className="search-box issued-search">
        <span>⌕</span>
        <input
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search book, member, or ID"
        />
      </label>
      <div className="issued-table returned-table panel">
        <div className="table-row table-header">
          <span>BOOK</span>
          <span>MEMBER</span>
          <span>STUDENT ID</span>
          <span>RETURNED ON</span>
          <span>CONDITION</span>
          <span>STATUS</span>
        </div>
        {filteredReturnedBooks.map((book) => (
          <div className="table-row issued-row" key={book.id}>
            <span>
              <strong>{book.title}</strong>
              <small>{book.author}</small>
            </span>
            <span>{book.member}</span>
            <span>{book.studentId}</span>
            <span>{book.returnedOn}</span>
            <span>{book.condition}</span>
            <span>
              <em className="status">● {book.status}</em>
            </span>
          </div>
        ))}
        <div className="panel-footer">
          <span>Showing 1-{filteredReturnedBooks.length} of 24</span>
          <span>
            Previous <b>1</b>{" "}
            <button type="button" onClick={() => window.alert("Next page")}>
              Next
            </button>
          </span>
        </div>
      </div>
    </section>
  );
}

export default App;
