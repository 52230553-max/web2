import React, { useState } from 'react'; 
import { Link } from "react-router-dom";

const books = [
  { id: 1, title: "The Great Gatsby", price: "$10" },
  { id: 2, title: "Harry Potter", price: "$12" },
  { id: 3, title: "Atomic Habits", price: "$15" },
];

 function Books() {

  const [search, setSearch] = useState("");

 
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 pt-20">
      <h2 className="text-2xl font-bold mb-4">Books</h2>

   
      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full mb-4 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredBooks.map((book) => (
          <Link
            key={book.id}
           
            to={`/Books/${book.id}`} 
            className="p-4 border rounded shadow hover:shadow-lg transition duration-200">
            <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
            <p className="text-indigo-600 font-bold">{book.price}</p>
          </Link>
        ))}
      </div>
      </div>
    
  );
}
export default Books;