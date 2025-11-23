import { Link } from "react-router-dom";
function Navbar(){
    return(
        <nav className="bg-blue-600 text-white p-4">
            <h1 className="text-xl font-bold">Online</h1>
            <div className="flex gap-4">
                <link to="/">Home</link>
                <link to="/Books">Books</link>
                <link to="/About">About</link>
                <link to="/Contact">Contact</link>
            </div>
        </nav>
    )
}
export default Navbar; 