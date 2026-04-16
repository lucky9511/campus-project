import { useEffect, useState } from "react";
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
    <div className="resources">
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