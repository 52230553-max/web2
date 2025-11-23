import { useParams } from "react-router-dom";

const books = [
  { id: 1, title: "The Great Gatsby", description: "..." },
  { id: 2, title: "Harry Potter", description: "..." },
  { id: 3, title: "Atomic Habits", description: "..." }
];
function BookDetails(){
    const{id}=useParams();
    const book=books.find((b)=>b.id===Number(id));
     return (
    <div className="p-6">
      {book ? (
        <>
          <h2 className="text-3xl font-bold mb-2">{book.title}</h2>
          <p>{book.description}</p>
        </>
      ) : (
        <p>Book not found.</p>
      )}
    </div>
  );
}
export default BookDetails