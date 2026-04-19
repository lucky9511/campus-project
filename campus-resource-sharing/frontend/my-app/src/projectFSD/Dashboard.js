import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    navigate("/");
  };

  const username = localStorage.getItem("username") || "Student";
  const userEmail = localStorage.getItem("userEmail") || localStorage.getItem("email") || "student@campus.edu";

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80");
  const [profileData, setProfileData] = useState({
    phone: localStorage.getItem("phone") || "+91 9876543210",
    joiningDate: localStorage.getItem("joiningDate") || "August 2023",
    campus: localStorage.getItem("campus") || "SKIT Jaipur",
    department: localStorage.getItem("department") || "Computer Science",
    semester: localStorage.getItem("semester") || "6th Semester",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        // Note: localStorage might complain about quota if image is huge, but it's okay for prototyping
        localStorage.setItem("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Save data back to localStorage when turning off edit mode
      localStorage.setItem("phone", profileData.phone);
      localStorage.setItem("joiningDate", profileData.joiningDate);
      localStorage.setItem("campus", profileData.campus);
      localStorage.setItem("department", profileData.department);
      localStorage.setItem("semester", profileData.semester);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="dashboard-container">
      {/* 1. LEFT SIDEBAR */}
      <aside className="sidebar-left">
        <div className="sidebar-logo">
          <h2>Campus Resources</h2>
        </div>
        <ul className="sidebar-menu">
          <li className="active"><i className="icon-dashboard"></i> Dashboard</li>
          <li><Link to="/books"><i className="icon-books"></i> Books</Link></li>
          <li><Link to="/notes"><i className="icon-notes"></i> Notes</Link></li>
          <li><Link to="/tools"><i className="icon-tools"></i> Tools</Link></li>
          <li><Link to="/upload"><i className="icon-upload"></i> Upload Resource</Link></li>
          <li><i className="icon-requests"></i> Borrow Requests</li>
          <li><i className="icon-messages"></i> Messages</li>
        </ul>
        <div className="sidebar-bottom">
          <button onClick={handleLogout} className="logout-btn">
            <i className="icon-logout"></i> Logout
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="dashboard-main">
        
        {/* Top Profile Banner Card */}
        <div className="profile-banner-card">
          <div className="banner-bg"></div>
          <div className="profile-info-container">
            <div className="profile-image-wrapper">
              <img 
                src={profileImage} 
                alt="Student Profile" 
                className="profile-image" 
              />
              {isEditing && (
                <>
                  <label htmlFor="profile-upload" className="profile-upload-label" title="Upload Image">
                    📷
                  </label>
                  <input 
                    type="file" 
                    id="profile-upload" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    style={{ display: "none" }} 
                  />
                </>
              )}
            </div>
            <div className="profile-details">
              <h1>Welcome, {username}</h1>
              <div className="profile-actions">
                <button className="action-icon" title={isEditing ? "Save Profile" : "Edit Profile"} onClick={handleEditToggle}>
                  {isEditing ? '💾' : '✏️'}
                </button>
                <button className="action-icon" title="Settings">⚙️</button>
                <button className="action-icon" title="Contact Email">✉️</button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards (2-column layout) */}
        <div className="info-cards-grid">
          <div className="info-card">
            <span className="info-label">Email</span>
            <span className="info-value">{userEmail}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Phone</span>
            {isEditing ? (
              <input className="edit-input" value={profileData.phone} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} />
            ) : (
              <span className="info-value">{profileData.phone}</span>
            )}
          </div>
          <div className="info-card">
            <span className="info-label">Joining Date</span>
            {isEditing ? (
              <input className="edit-input" value={profileData.joiningDate} onChange={(e) => setProfileData({...profileData, joiningDate: e.target.value})} />
            ) : (
              <span className="info-value">{profileData.joiningDate}</span>
            )}
          </div>
          <div className="info-card">
            <span className="info-label">Campus / Location</span>
            {isEditing ? (
              <input className="edit-input" value={profileData.campus} onChange={(e) => setProfileData({...profileData, campus: e.target.value})} />
            ) : (
              <span className="info-value">{profileData.campus}</span>
            )}
          </div>
          <div className="info-card">
            <span className="info-label">Department</span>
            {isEditing ? (
              <input className="edit-input" value={profileData.department} onChange={(e) => setProfileData({...profileData, department: e.target.value})} />
            ) : (
              <span className="info-value">{profileData.department}</span>
            )}
          </div>
          <div className="info-card">
            <span className="info-label">Semester</span>
            {isEditing ? (
              <input className="edit-input" value={profileData.semester} onChange={(e) => setProfileData({...profileData, semester: e.target.value})} />
            ) : (
              <span className="info-value">{profileData.semester}</span>
            )}
          </div>
        </div>

        {/* 3. Skills / Interests Section */}
        <div className="skills-section">
          <h3>Skills & Interests</h3>
          <div className="tags-container">
            <span className="skill-tag">Programming</span>
            <span className="skill-tag">Design</span>
            <span className="skill-tag">Electronics</span>
            <span className="skill-tag">Engineering</span>
            <span className="skill-tag">Mathematics</span>
            <span className="skill-tag">Communication</span>
          </div>
        </div>

        {/* 4. Suggested Resources Section */}
        <div className="suggested-resources">
          <h3>Suggested Resources</h3>
          <div className="horizontal-scroll-container">
            
            <div className="resource-card">
              <div className="resource-img dbms-bg"></div>
              <div className="resource-details">
                <h4>DBMS Notes</h4>
                <p>Complete handwritten notes for Database Management Systems.</p>
                <button className="borrow-btn">View / Borrow</button>
              </div>
            </div>

            <div className="resource-card">
              <div className="resource-img dsa-bg"></div>
              <div className="resource-details">
                <h4>Data Structures Book</h4>
                <p>Core textbook by Cormen for DS & Algorithms.</p>
                <button className="borrow-btn">View / Borrow</button>
              </div>
            </div>

            <div className="resource-card">
              <div className="resource-img drafter-bg"></div>
              <div className="resource-details">
                <h4>Drafter Kit</h4>
                <p>Engineering Drawing mini drafter toolkit.</p>
                <button className="borrow-btn">View / Borrow</button>
              </div>
            </div>

            <div className="resource-card">
              <div className="resource-img calc-bg"></div>
              <div className="resource-details">
                <h4>Calculator</h4>
                <p>Casio fx-991EX Scientific Calculator.</p>
                <button className="borrow-btn">View / Borrow</button>
              </div>
            </div>

          </div>
        </div>

      </main>

    </div>
  );
}

export default Dashboard;
