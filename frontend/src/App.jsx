import { useState, useEffect } from "react";
import { DateTime } from 'luxon';
import "./App.css";
import yayLogo from "./assets/yay.png";

// Sample records keep the UI usable until the backend is connected.
const computerScienceBooks = [
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "9780132350884",
    publisher: "Prentice Hall",
    category: "Software Engineering",
    yearPublished: 2008,
    status: "Available",
    description:
      "A practical guide to writing readable, maintainable, and professional-quality code.",
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt and David Thomas",
    isbn: "9780201616224",
    publisher: "Addison-Wesley",
    category: "Programming",
    yearPublished: 1999,
    status: "Available",
    description:
      "An influential collection of practical advice for software developers and technical teams.",
  },
  {
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein",
    isbn: "9780262033848",
    publisher: "MIT Press",
    category: "Algorithms",
    yearPublished: 2009,
    status: "On loan",
    description:
      "A foundational text covering algorithm design, analysis, and complexity across computer science.",
  },
  {
    title: "Design Patterns",
    author: "Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides",
    isbn: "9780201633610",
    publisher: "Addison-Wesley",
    category: "Software Design",
    yearPublished: 1994,
    status: "Available",
    description:
      "A classic reference for reusable object-oriented design patterns and software architecture.",
  },
  {
    title: "Structure and Interpretation of Computer Programs",
    author: "Harold Abelson and Gerald Jay Sussman",
    isbn: "9780262510875",
    publisher: "MIT Press",
    category: "Computer Science Fundamentals",
    yearPublished: 1996,
    status: "Available",
    description:
      "A readable introduction to programming, computation, and the fundamentals of computer science.",
  },
  {
    title: "The Mythical Man-Month",
    author: "Frederick P. Brooks Jr.",
    isbn: "9780201835953",
    publisher: "Addison-Wesley",
    category: "Software Management",
    yearPublished: 1975,
    status: "Available",
    description:
      "Insights into software project planning, team productivity, and the realities of large systems development.",
  },
  {
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell and Peter Norvig",
    isbn: "9780134610993",
    publisher: "Pearson",
    category: "Artificial Intelligence",
    yearPublished: 2020,
    status: "Available",
    description:
      "A comprehensive survey of AI principles, techniques, and modern applications.",
  },
  {
    title: "Computer Systems: A Programmer's Perspective",
    author: "Randal E. Bryant and David R. O'Hallaron",
    isbn: "9780134092669",
    publisher: "Pearson",
    category: "Systems",
    yearPublished: 2015,
    status: "On loan",
    description:
      "A detailed look at how computers work from a programmer's point of view, including hardware and software interfaces.",
  },
  {
    title: "Refactoring",
    author: "Martin Fowler",
    isbn: "9780201485677",
    publisher: "Addison-Wesley",
    category: "Refactoring",
    yearPublished: 1999,
    status: "Available",
    description:
      "A practical guide to improving code structure without changing behavior.",
  },
  {
    title: "Cracking the Coding Interview",
    author: "Gayle Laakmann McDowell",
    isbn: "9780984782857",
    publisher: "CareerCup",
    category: "Interview Preparation",
    yearPublished: 2015,
    status: "Available",
    description:
      "A widely used resource for preparing for technical interviews in software engineering.",
  },
  {
    title: "Operating System Concepts",
    author: "Abraham Silberschatz, Peter Baer Galvin, and Greg Gagne",
    isbn: "9781119320913",
    publisher: "Wiley",
    category: "Operating Systems",
    yearPublished: 2018,
    status: "Available",
    description:
      "A standard text on operating systems concepts, design, and implementation principles.",
  },
  {
    title: "Database System Concepts",
    author: "Abraham Silberschatz, Henry F. Korth, and S. Sudarshan",
    isbn: "9780073523323",
    publisher: "McGraw-Hill",
    category: "Databases",
    yearPublished: 2010,
    status: "Available",
    description:
      "A comprehensive introduction to database management systems and data modeling.",
  },
  {
    title: "Deep Learning",
    author: "Ian Goodfellow, Yoshua Bengio, and Aaron Courville",
    isbn: "9780262035613",
    publisher: "MIT Press",
    category: "Machine Learning",
    yearPublished: 2016,
    status: "Available",
    description:
      "A foundational text on neural networks, deep learning theory, and practical techniques.",
  },
  {
    title: "Compilers: Principles, Techniques, and Tools",
    author: "Alfred V. Aho, Monica S. Lam, Ravi Sethi, and Jeffrey D. Ullman",
    isbn: "9780201104893",
    publisher: "Addison-Wesley",
    category: "Compilers",
    yearPublished: 2006,
    status: "Available",
    description:
      "A classic reference on compiler construction, optimization, and language processing.",
  },
  {
    title: "Code Complete",
    author: "Steve McConnell",
    isbn: "9780735619678",
    publisher: "Microsoft Press",
    category: "Programming",
    yearPublished: 2004,
    status: "On loan",
    description:
      "A detailed guide to practical software construction, code quality, and engineering discipline.",
  },
  {
    title: "The C Programming Language",
    author: "Brian W. Kernighan and Dennis M. Ritchie",
    isbn: "9780131103627",
    publisher: "Prentice Hall",
    category: "Programming Languages",
    yearPublished: 1988,
    status: "Available",
    description:
      "The canonical book on the C language, covering syntax, idioms, and systems programming.",
  },
  {
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    isbn: "9781593279509",
    publisher: "No Starch Press",
    category: "Web Development",
    yearPublished: 2018,
    status: "Available",
    description:
      "A modern introduction to JavaScript and programming concepts with clear examples.",
  },
  {
    title: "Computer Networking: A Top-Down Approach",
    author: "James F. Kurose and Keith W. Ross",
    isbn: "9780132856201",
    publisher: "Pearson",
    category: "Networking",
    yearPublished: 2016,
    status: "Available",
    description:
      "A widely used introduction to computer networking, covering protocols and architecture.",
  },
  {
    title: "Algorithms",
    author: "Robert Sedgewick and Kevin Wayne",
    isbn: "9780321573513",
    publisher: "Addison-Wesley",
    category: "Algorithms",
    yearPublished: 2011,
    status: "Available",
    description:
      "An accessible and practical treatment of fundamental algorithms and data structures.",
  },
  {
    title: "Modern Operating Systems",
    author: "Andrew S. Tanenbaum and Herbert Bos",
    isbn: "9780133591620",
    publisher: "Pearson",
    category: "Operating Systems",
    yearPublished: 2014,
    status: "Available",
    description:
      "A comprehensive overview of modern operating system design, concurrency, and security.",
  },
  {
    title: "The Linux Programming Interface",
    author: "Michael Kerrisk",
    isbn: "9781593272203",
    publisher: "No Starch Press",
    category: "Systems Programming",
    yearPublished: 2010,
    status: "Available",
    description:
      "A practical guide to Linux system calls, APIs, and low-level programming techniques.",
  },
];

const initialBooks = computerScienceBooks.map((book, index) => ({
  id: index + 1,
  ...book,
}));

const issuedBooks = [
  {
    id: 1,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein",
    member: "Aarav Mehta",
    studentId: "LB-1048",
    issuedOn: "08 Sep 2026",
    dueDate: "22 Sep 2026",
    status: "On loan",
  },
  {
    id: 2,
    title: "Computer Systems: A Programmer's Perspective",
    author: "Randal E. Bryant and David R. O'Hallaron",
    member: "Maya Patel",
    studentId: "LB-1031",
    issuedOn: "04 Sep 2026",
    dueDate: "18 Sep 2026",
    status: "Overdue",
  },
  {
    id: 3,
    title: "Code Complete",
    author: "Steve McConnell",
    member: "Noah Williams",
    studentId: "LB-1022",
    issuedOn: "02 Sep 2026",
    dueDate: "16 Sep 2026",
    status: "Overdue",
  },
  {
    id: 4,
    title: "Clean Code",
    author: "Robert C. Martin",
    member: "Sara Khan",
    studentId: "LB-1009",
    issuedOn: "11 Sep 2026",
    dueDate: "25 Sep 2026",
    status: "On loan",
  },
  {
    id: 5,
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell and Peter Norvig",
    member: "Rohan Shah",
    studentId: "LB-1017",
    issuedOn: "14 Sep 2026",
    dueDate: "28 Sep 2026",
    status: "On loan",
  },
];

const returnedBooks = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    member: "Aarav Mehta",
    studentId: "LB-1048",
    issuedOn: "25 Aug 2026",
    returnedOn: "08 Sep 2026",
    status: "Available",
  },
  {
    id: 2,
    title: "Algorithms",
    author: "Robert Sedgewick and Kevin Wayne",
    member: "Maya Patel",
    studentId: "LB-1031",
    issuedOn: "20 Aug 2026",
    returnedOn: "03 Sep 2026",
    status: "Available",
  },
  {
    id: 3,
    title: "Database System Concepts",
    author: "Abraham Silberschatz, Henry F. Korth, and S. Sudarshan",
    member: "Noah Williams",
    studentId: "LB-1022",
    issuedOn: "16 Aug 2026",
    returnedOn: "30 Aug 2026",
    status: "Available",
  },
  {
    id: 4,
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    member: "Sara Khan",
    studentId: "LB-1009",
    issuedOn: "10 Aug 2026",
    returnedOn: "24 Aug 2026",
    status: "Available",
  },
  {
    id: 5,
    title: "The Linux Programming Interface",
    author: "Michael Kerrisk",
    member: "Rohan Shah",
    studentId: "LB-1017",
    issuedOn: "08 Aug 2026",
    returnedOn: "18 Aug 2026",
    status: "Available",
  },
];

const allStatuses = [
  ...new Set(
    [...initialBooks, ...issuedBooks, ...returnedBooks].map((book) => book.status),
  ),
];

const pageSize = 10;
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "The server request failed.");
  }
  return response.status === 204 ? null : response.json();
}

function normalizeBook(book) {
  return { ...book, yearPublished: book.year_published ?? "" };
}

function normalizeLoan(loan) {
  return {
    ...loan,
    studentId: loan.student_id,
    issuedOn: DateTime.fromISO(loan.issued_on).toFormat("dd LLL yyyy"),
    dueDate: loan.due_date
      ? DateTime.fromISO(loan.due_date).toFormat("dd LLL yyyy")
      : undefined,
    returnedOn: loan.returned_on
      ? DateTime.fromISO(loan.returned_on).toFormat("dd LLL yyyy")
      : undefined,
  };
}

async function loadLibraryData() {
  const [bookData, issuedData, returnedData] = await Promise.all([
    apiRequest("/books"),
    apiRequest("/loans/issued"),
    apiRequest("/loans/returned"),
  ]);
  return {
    books: bookData.map(normalizeBook),
    issuedBooks: issuedData.map(normalizeLoan),
    returnedBooks: returnedData.map(normalizeLoan),
  };
}

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
  const [issuedRecords, setIssuedRecords] = useState(issuedBooks);
  const [returnedRecords, setReturnedRecords] = useState(returnedBooks);

  useEffect(() => {
    loadLibraryData()
      .then(({ books: loadedBooks, issuedBooks: loadedIssued, returnedBooks: loadedReturned }) => {
        setBooks(loadedBooks);
        setIssuedRecords(loadedIssued);
        setReturnedRecords(loadedReturned);
        if (loadedBooks.length > 0) setSelectedBookId(loadedBooks[0].id);
      })
      .catch((error) => console.error("Unable to load library data:", error));
  }, []);

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
  const handleSaveNewBook = async (event) => {
    event.preventDefault();
    try {
      const book = normalizeBook(await apiRequest("/books", {
        method: "POST",
        body: JSON.stringify({ ...newBook, year_published: newBook.yearPublished || null }),
      }));
      setBooks((currentBooks) => [...currentBooks, book]);
      setSelectedBookId(book.id);
      setShowBookForm(false);
      setNewBook({ title: "", author: "", isbn: "", publisher: "", category: "", yearPublished: "", description: "" });
    } catch (error) {
      window.alert(error.message);
    }
  };
  const handleEditBook = () => {
    if (selectedBook) setEditBook({ ...selectedBook });
  };
  const handleCloseEditForm = () => setEditBook(null);
  const handleSaveBook = async (event) => {
    event.preventDefault();
    try {
      const savedBook = normalizeBook(await apiRequest(`/books/${editBook.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...editBook, year_published: editBook.yearPublished || null }),
      }));
      setBooks((currentBooks) => currentBooks.map((book) => (book.id === savedBook.id ? savedBook : book)));
      handleCloseEditForm();
    } catch (error) {
      window.alert(error.message);
    }
  };
  const handleIssueBook = async (book) => {
    const studentId = window.prompt("Student ID");
    const dueDate = window.prompt("Due date (YYYY-MM-DD)");
    if (!studentId || !dueDate) return;
    try {
      const data = await apiRequest("/loans", {
        method: "POST",
              body: JSON.stringify({ book_id: book.id, student_id: studentId, member_name: studentId, due_date: dueDate }),
      });
      const refreshed = await loadLibraryData();
      setBooks(refreshed.books);
      setIssuedRecords(refreshed.issuedBooks);
      setReturnedRecords(refreshed.returnedBooks);
      setSelectedBookId(data.book_id);
    } catch (error) {
      window.alert(error.message);
    }
  };
  const handleDeleteBook = async () => {
    if (!selectedBook) return;
    try {
      await apiRequest(`/books/${selectedBook.id}`, { method: "DELETE" });
      const remainingBooks = books.filter((book) => book.id !== selectedBook.id);
      setBooks(remainingBooks);
      setSelectedBookId(remainingBooks[0]?.id || null);
    } catch (error) {
      window.alert(error.message);
    }
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
                      <div
                        className={`table-row book-row ${selectedBookId === book.id ? "selected" : ""}`}
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
                      </div>
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
              records={issuedRecords}
              onReturned={async () => {
                const refreshed = await loadLibraryData();
                setBooks(refreshed.books);
                setIssuedRecords(refreshed.issuedBooks);
                setReturnedRecords(refreshed.returnedBooks);
              }}
            />
          ) : (
            <ReturnedBooks
              searchText={searchText}
              setSearchText={setSearchText}
              onViewDetails={handleReturnedBookDetails}
              records={returnedRecords}
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
  if (!book) {
    return (
      <aside className="details-panel panel">
        <div className="panel-heading">
          <div>
            <h2>Record details</h2>
            <p>No books have been added yet.</p>
          </div>
        </div>
      </aside>
    );
  }

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
function IssuedBooks({ searchText, setSearchText, records, onReturned }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const handleMarkAsReturned = async (book) => {
    try {
      await apiRequest(`/loans/${book.id}/return`, { method: "POST" });
      await onReturned();
    } catch (error) {
      window.alert(error.message);
    }
  };
  const filteredIssuedBooks = records.filter((book) =>
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
function ReturnedBooks({ searchText, setSearchText, onViewDetails, records }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const filteredReturnedBooks = records.filter((book) =>
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
