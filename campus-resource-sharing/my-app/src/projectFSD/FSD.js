import "./style.css";
import { Link } from "react-router-dom";

function FSD() {
  return (
    <>
      <div className="video-container">

        <video autoPlay muted loop className="background-video">
          <source src="/campus-bg.mp4" type="video/mp4" />
        </video>

        <div className="overlay"></div>

        <nav className="navbar">
          <div className="logo">
            Campus Resource Sharing & Optimization Platform
          </div>

          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><button>Resources</button></li>
            <li><button>Tools</button></li>
            <li><button>Upload</button></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>

        <div className="hero-content">
          <h1>Share Books, Notes & Tools</h1>
          <p>Connect, Share & Learn Together Within Your Campus</p>

          <Link to="/login">
            <button className="explore-btn">Explore Resources</button>
          </Link>
        </div>

      </div>

      {/* RESOURCES SECTION */}
      <section className="resources">
        <h2 style={{ color: "#1e293b" }}>
  Explore Campus Resources
</h2>

        <div className="card-container">

          <div className="card">
            <h3>📚 Books</h3>
            <p>Share and borrow academic textbooks easily</p>

            <Link to="/books">
              <button>View Books</button>
            </Link>
          </div>

          <div className="card">
            <h3>📝 Notes</h3>
            <p>Access handwritten notes and study materials</p>
            <Link to="/notes">
  <button>View Notes</button>
</Link>
          </div>

          <div className="card">
            <h3>🧰 Tools</h3>
            <p>Borrow tools like compass, drafter & calculators</p>
            <button>View Tools</button>
          </div>

        </div>
      </section>

      <footer>
        <p>Swami Keshvanand Institute of Technology, Jaipur</p>
      </footer>
    </>
  );
}

export default FSD;