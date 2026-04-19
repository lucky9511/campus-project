import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Books() {
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    fetch("/books.json")
      .then((res) => res.json())
      .then((data) => {
        // ✅ initialize requests = 0
        const updatedData = data.map((book) => ({
          ...book,
          requests: 0,
        }));
        setBooksData(updatedData);
      })
      .catch((err) => console.log(err));
  }, []);

  // ✅ FIXED request function (no NaN)
  const handleRequest = (index) => {
    const updatedBooks = [...booksData];

    updatedBooks[index].requests =
      (updatedBooks[index].requests || 0) + 1;

    setBooksData(updatedBooks);
  };

  // ✅ Chat function
  const openChat = () => {
    alert("Chat feature coming soon!");
  };

  return (
    <div
      style={{
        background: "#0f3d4c",
        minHeight: "100vh",
        padding: "40px",
        paddingTop: "100px"
      }}
    >
      <nav className="navbar" style={{ background: "#1e293b", position: "fixed", top: 0, left: 0, zIndex: 10 }}>
        <div className="logo">
          Campus Resource Sharing & Optimization Platform
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/tools">Tools</Link></li>
          <li><Link to="/upload">Upload</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>

      <h2 style={{ color: "white", textAlign: "center" }}>
        Books Section 📚
      </h2>

      <div className="card-container">
        {booksData.map((book, index) => (
          <div className="card" key={index}>
            
            <img
              src={book.image}
              alt="book"
              style={{
                width: "100px",
                height: "120px",
                objectFit: "cover",
              }}
            />

            <h3 style={{ color: "black" }}>{book.title}</h3>
            <p style={{ color: "black" }}>
              Author: {book.author}
            </p>

            {/* ✅ request count */}
            <p style={{ color: "black" }}>
              Requests: {book.requests}
            </p>

            {/* ✅ buttons */}
            <button onClick={() => handleRequest(index)}>
              Request
            </button>

            <button onClick={openChat}>
              Chat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;