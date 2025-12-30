import { useEffect, useState } from "react";
import axios from "axios";
const simulatedDB = {
  users: [
    { id: 1, username: 'admin', email: 'admin@bookstore.com', password: 'admin123' },
    { id: 2, username: 'user1', email: 'user1@bookstore.com', password: 'user123' }
  ],
  books: [
    { id: 1, title: "The Great Gatsby", price: "$10", description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream." },
    { id: 2, title: "Harry Potter", price: "$12", description: "A magical adventure of a young wizard discovering his destiny and fighting against dark forces." },
    { id: 3, title: "Atomic Habits", price: "$15", description: "Transform your life with tiny changes and build good habits that stick." }
  ]
};

function Login({ onLoginSuccess }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:5000/auth/login", {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        onLoginSuccess(response.data.user);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:5000/auth/register", {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        setError("");
        setIsLoginMode(true);
        setUsername("");
        setEmail("");
        setPassword("");
        alert("Registration successful! Please login.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">📚 Bookstore</h1>
            <p className="text-slate-600">
              {isLoginMode ? "Welcome back!" : "Create your account"}
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                disabled={isLoading}
              />
            </div>

            {!isLoginMode && (
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  disabled={isLoading}
                />
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                disabled={isLoading}
              />
            </div>

            <button
              onClick={isLoginMode ? handleLogin : handleRegister}
              disabled={isLoading}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Please wait..." : isLoginMode ? "Login" : "Register"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setError("");
                setUsername("");
                setEmail("");
                setPassword("");
              }}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {isLoginMode
                ? "Don't have an account? Register"
                : "Already have an account? Login"}
            </button>
          </div>

          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-xs font-semibold text-slate-700 mb-2">Demo Credentials:</p>
            <p className="text-xs text-slate-600">
              Username: <span className="font-mono font-semibold">admin</span>
            </p>
            <p className="text-xs text-slate-600">
              Password: <span className="font-mono font-semibold">admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  
  const [id, setID] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isSuccess) return;
    const timer = setTimeout(() => clearAlerts(), 2500);
    return () => clearTimeout(timer);
  }, [isSuccess]);

  const clearAlerts = () => {
    setIsSuccess(false);
    setIsError(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const showSuccess = (message) => {
    clearAlerts();
    setSuccessMessage(message);
    setIsSuccess(true);
  };

  const showError = (message) => {
    clearAlerts();
    setErrorMessage(message);
    setIsError(true);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    showSuccess(`Welcome back, ${user.username}!`);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    setIsAuthenticated(false);
    setCurrentPage("home");
    showSuccess("Logged out successfully");
  };

  const getBooks = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:5000/books");
      if (response.status === 200) {
        setBooks(response.data);
      }
      if (response.status === 204) {
        setBooks([]);
      }
    } catch (err) {
      showError(err.response?.data?.message || "Error loading books.");
    } finally {
      setIsLoading(false);
    }
  };

  const addBook = async () => {
    if (!title || !price) {
      showError("Please fill in title and price before adding a book.");
      return;
    }
    const bookToAdd = { title, price, description };
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:5000/books", bookToAdd);
      if (response.status === 201) {
        showSuccess(response.data.message);
        getBooks();
      }
      clearForm();
    } catch (err) {
      showError(err.response?.data?.message || "Error adding book.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateBook = async () => {
    if (!title || !price) {
      showError("Please fill in title and price before updating a book.");
      return;
    }
    if (!id) {
      showError("Please provide an ID for updating a book.");
      return;
    }
    const bookToUpdate = { title, price, description };
    try {
      setIsLoading(true);
      const response = await axios.put(`http://localhost:5000/books/${id}`, bookToUpdate);
      if (response.status === 200) {
        showSuccess(response.data.message);
        getBooks();
      }
      clearForm();
    } catch (err) {
      showError(err.response?.data?.message || "Error updating book.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBook = async (bookID) => {
    if (!window.confirm("Are you sure you want to delete this book?")) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.delete(`http://localhost:5000/books/${bookID}`);
      if (response.status === 200) {
        showSuccess(response.data.message);
        getBooks();
      }
    } catch (err) {
      showError(err.response?.data?.message || "Error deleting book.");
    } finally {
      setIsLoading(false);
    }
  };

  const viewBookDetails = async (bookID) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:5000/books/${bookID}`);
      if (response.status === 200) {
        setSelectedBook(response.data);
        setCurrentPage("bookDetails");
      }
    } catch (err) {
      showError(err.response?.data?.message || "Error loading book details.");
    } finally {
      setIsLoading(false);
    }
  };

  const submitContact = async () => {
    if (!contactName || !contactEmail || !contactMessage) {
      showError("Please fill in all contact fields.");
      return;
    }
    const contactData = { name: contactName, email: contactEmail, message: contactMessage };
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:5000/contact", contactData);
      if (response.status === 201) {
        showSuccess(response.data.message);
        setContactName("");
        setContactEmail("");
        setContactMessage("");
      }
    } catch (err) {
      showError(err.response?.data?.message || "Error sending message.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearForm = () => {
    setID("");
    setTitle("");
    setPrice("");
    setDescription("");
  };

  useEffect(() => {
    if (currentPage === "books" && isAuthenticated) {
      getBooks();
    }
  }, [currentPage, isAuthenticated]);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  const Navbar = () => (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Online Bookstore</h1>
          <div className="flex gap-6">
            <button onClick={() => setCurrentPage("home")} className={`hover:text-blue-200 transition ${currentPage === "home" ? "font-bold underline underline-offset-4" : ""}`}>Home</button>
            <button onClick={() => setCurrentPage("books")} className={`hover:text-blue-200 transition ${currentPage === "books" ? "font-bold underline underline-offset-4" : ""}`}>Books</button>
            <button onClick={() => setCurrentPage("about")} className={`hover:text-blue-200 transition ${currentPage === "about" ? "font-bold underline underline-offset-4" : ""}`}>About</button>
            <button onClick={() => setCurrentPage("contact")} className={`hover:text-blue-200 transition ${currentPage === "contact" ? "font-bold underline underline-offset-4" : ""}`}>Contact</button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">👤 {currentUser?.username}</span>
          <button onClick={handleLogout} className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold hover:bg-red-600 transition">Logout</button>
        </div>
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-slate-900">Welcome, {currentUser?.username}! 👋</h2>
      <p className="text-gray-700 text-lg mb-6">Browse books, read descriptions, and discover your next favorite read!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-md border border-blue-200">
          <h3 className="text-xl font-semibold mb-3 text-blue-900">📚 Explore Our Collection</h3>
          <p className="text-gray-700 mb-4">Discover a wide variety of books across multiple genres.</p>
          <button onClick={() => setCurrentPage("books")} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Browse Books</button>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-md border border-green-200">
          <h3 className="text-xl font-semibold mb-3 text-green-900">✨ Features</h3>
          <ul className="text-gray-700 space-y-2">
            <li>• Search and filter books</li>
            <li>• Add new books to collection</li>
            <li>• Edit and update information</li>
            <li>• Detailed book descriptions</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const BooksPage = () => (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-900">Books Management</h2>
        <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800" onClick={getBooks}>Refresh</button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Book Form</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">ID (only for update)</label>
              <input disabled value={id} onChange={(e) => setID(e.target.value)} placeholder="Auto-generated" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 outline-none bg-slate-50" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Title *</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Book Title" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Price *</label>
              <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="$10" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Book description..." rows="4" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 outline-none" />
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <button type="button" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500" onClick={addBook}>Add</button>
              <button type="button" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500" onClick={updateBook}>Update</button>
              <button type="button" className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50" onClick={clearForm}>Clear</button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <input type="text" placeholder="🔍 Search books by title..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 outline-none" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Books Collection ({filteredBooks.length})</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {filteredBooks.map((book) => (
                <div key={book.id} className="rounded-xl border border-slate-200 p-4 hover:shadow-md transition">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">ID: {book.id}</span>
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">Book</span>
                  </div>
                  <h4 className="text-base font-semibold text-slate-900 mb-1">{book.title}</h4>
                  <p className="text-lg font-bold text-indigo-600 mb-2">{book.price}</p>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-3">{book.description || "No description"}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500" onClick={() => viewBookDetails(book.id)}>View</button>
                    <button className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50" onClick={() => { setID(book.id); setTitle(book.title); setPrice(book.price); setDescription(book.description || ""); }}>Edit</button>
                    <button className="flex-1 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-500" onClick={() => deleteBook(book.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
            {filteredBooks.length === 0 && <div className="text-center py-8 text-slate-600">No books found. Try adding one!</div>}
          </div>
        </div>
      </div>
    </div>
  );

  const BookDetailsPage = () => (
    <div className="max-w-4xl mx-auto p-6">
      {selectedBook ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <div className="mb-6">
            <h2 className="text-4xl font-bold mb-3 text-slate-900">{selectedBook.title}</h2>
            <p className="text-3xl text-indigo-600 font-bold">{selectedBook.price}</p>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-700 mb-2">Description</h3>
            <p className="text-slate-700 leading-relaxed text-lg">{selectedBook.description || "No description available"}</p>
          </div>
          <div className="flex gap-3 flex-wrap border-t pt-6">
            <button onClick={() => { setID(selectedBook.id); setTitle(selectedBook.title); setPrice(selectedBook.price); setDescription(selectedBook.description || ""); setCurrentPage("books"); }} className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700">Edit Book</button>
            <button onClick={() => { deleteBook(selectedBook.id); setCurrentPage("books"); }} className="rounded-lg bg-rose-600 px-6 py-3 text-sm font-semibold text-white hover:bg-rose-700">Delete Book</button>
            <button onClick={() => setCurrentPage("books")} className="rounded-lg bg-slate-600 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700">Back to Books</button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-600 text-lg">Book not found</p>
          <button onClick={() => setCurrentPage("books")} className="mt-4 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700">Back to Books</button>
        </div>
      )}
    </div>
  );

  const AboutPage = () => (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <h2 className="text-3xl font-bold mb-4 text-slate-900">About Us</h2>
        <p className="text-slate-700 text-lg mb-6">We are a simple bookstore dedicated to bringing you the best reading experience.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 className="font-semibold text-xl mb-3 text-blue-900">📖 Our Mission</h3>
            <p className="text-slate-700">To provide quality books and excellent service to book lovers everywhere.</p>
          </div>
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h3 className="font-semibold text-xl mb-3 text-green-900">🎯 Our Vision</h3>
            <p className="text-slate-700">To become your go-to destination for discovering great books.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <h2 className="text-3xl font-bold mb-3 text-slate-900">Contact Us</h2>
        <p className="text-slate-600 mb-6">Have a question? We'd love to hear from you!</p>
        <div className="flex flex-col gap-4 max-w-2xl">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Your Name *</label>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 outline-none" type="text" placeholder="Enter your name" value={contactName} onChange={(e) => setContactName(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Your Email *</label>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 outline-none" type="email" placeholder="Enter your email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Your Message *</label>
            <textarea className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 outline-none" placeholder="Write your message..." rows="6" value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} />
          </div>
          <button onClick={submitContact} className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700">Send Message</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 mb-6 space-y-3">
          {isLoading && <div className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700">Loading...</div>}
          {isSuccess && <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">{successMessage}</div>}
          {isError && <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">{errorMessage}</div>}
        </div>
        {currentPage === "home" && <HomePage />}
        {currentPage === "books" && <BooksPage />}
        {currentPage === "bookDetails" && <BookDetailsPage />}
        {currentPage === "about" && <AboutPage />}
        {currentPage === "contact" && <ContactPage />}
      </div>
      <footer className="bg-slate-800 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto text-center px-4">
          <p className="text-slate-300">© 2024 Online Bookstore. All rights reserved.</p>
          <p className="text-slate-400 text-sm mt-2">Built with React, Express & MySQL</p>
        </div>
      </footer>
    </div>
  );
}

export default App;