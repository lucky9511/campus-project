import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Notes() {
  const [notesData, setNotesData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/notes.json")
      .then((res) => res.json())
      .then((data) => setNotesData(data));
  }, []);

  const handleDownload = () => {
    alert("Downloading notes...");
  };

  const filteredNotes = notesData.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="resources" style={{ minHeight: "100vh", background: "#f8fafc", paddingTop: "100px" }}>
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

     <h2 style={{ color: "#1e293b" }}>
  Notes Section 📝
</h2>

      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        id="searchBar"
      />

      <div id="notesList" className="card-container">
        {filteredNotes.map((note, index) => (
          <div className="noteCard" key={index}>
            <img src={note.image} alt={note.title} />

            <div className="noteInfo">
              <h3 style={{ color: "black" }}>{note.title}</h3>
<p style={{ color: "black" }}>Author: {note.author}</p>
<p style={{ color: "black" }}>Pages: {note.pages}</p>
<p style={{ color: "black" }}>Posted Year: {note.year}</p>
              <button onClick={handleDownload}>
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;