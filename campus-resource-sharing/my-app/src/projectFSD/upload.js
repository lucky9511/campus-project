import React, { useState, useRef } from 'react';
import './upload.css';
import { Link } from 'react-router-dom';

function Upload() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    semester: '',
    resourceType: ''
  });

  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileInputRef = useRef(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = [
    'application/pdf', 
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
    'image/jpeg', 
    'image/png'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Check if form is complete
  const isFormComplete = () => {
    return (
      formData.title.trim() !== '' &&
      formData.description.trim() !== '' &&
      formData.subject.trim() !== '' &&
      formData.semester !== '' &&
      formData.resourceType !== '' &&
      file !== null
    );
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    if (selectedFile.size > MAX_FILE_SIZE) {
      showToast("File size must be under 10MB", "error");
      return;
    }

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      showToast("Only PDF, DOC, and Image types allowed", "error");
      return;
    }

    setFile(selectedFile);
  };

  // Drag and Drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const removeFile = () => {
    setFile(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderFileIcon = () => {
    if (file.type.startsWith('image/')) {
       const urlUrl = URL.createObjectURL(file);
       return <img src={urlUrl} alt="preview" className="file-thumb" onLoad={() => URL.revokeObjectURL(urlUrl)} />;
    }
    if (file.type === 'application/pdf') {
       return <div className="file-thumb" style={{ background: '#fef2f2', color: '#ef4444' }}>PDF</div>;
    }
    return <div className="file-thumb" style={{ background: '#eff6ff', color: '#3b82f6' }}>DOC</div>;
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      subject: '',
      semester: '',
      resourceType: ''
    });
    setFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormComplete()) return;

    setLoading(true);
    setUploadProgress(0);

    // Simulate an upload process
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          return 100;
        }
        return prev + 15;
      });
    }, 300);

    setTimeout(() => {
      clearInterval(uploadInterval);
      setLoading(false);
      setUploadProgress(100);
      showToast("File uploaded successfully!", "success");
      
      // Optionally reset form after submission
      setTimeout(() => {
        handleReset();
        setUploadProgress(0);
      }, 1500);

    }, 2500);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">Campus Resource Sharing</div>
        <ul className="nav-links" style={{ listStyle:'none', display:'flex', gap:'20px', margin:0, padding:0 }}>
           <li><Link to="/" style={{color: '#555', textDecoration:'none', fontWeight:'bold'}}>Home</Link></li>
           <li><Link to="/upload" style={{color: '#4a90e2', textDecoration:'none', fontWeight:'bold'}}>Upload</Link></li>
        </ul>
      </nav>

      <div className="upload-page-container">
        
        <div className="upload-header">
          <h1>Upload Resource</h1>
          <p>Share notes, books, and tools easily with your campus.</p>
        </div>

        <form onSubmit={handleSubmit} className="upload-card">
          <div className="input-row">
            <div className="form-group">
              <label>Title <span style={{color:'red'}}>*</span></label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange} 
                placeholder="E.g., Engineering Math Notes" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Subject <span style={{color:'red'}}>*</span></label>
              <input 
                type="text" 
                name="subject" 
                value={formData.subject} 
                onChange={handleInputChange} 
                placeholder="Subject Name" 
                required 
              />
            </div>
          </div>

          <div className="input-row">
            <div className="form-group">
              <label>Semester <span style={{color:'red'}}>*</span></label>
              <select name="semester" value={formData.semester} onChange={handleInputChange} required>
                <option value="">Select Semester</option>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
                <option value="5">Semester 5</option>
                <option value="6">Semester 6</option>
                <option value="7">Semester 7</option>
                <option value="8">Semester 8</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Resource Type <span style={{color:'red'}}>*</span></label>
              <select name="resourceType" value={formData.resourceType} onChange={handleInputChange} required>
                <option value="">Select Type</option>
                <option value="notes">Notes</option>
                <option value="books">Books</option>
                <option value="assignments">Assignments</option>
                <option value="tools">Tools / Instruments</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description <span style={{color:'red'}}>*</span></label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleInputChange} 
              placeholder="Provide a brief description of the contents..." 
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Attachments (Max 10MB) <span style={{color:'red'}}>*</span></label>
            
            {!file ? (
              <div 
                className={`dropzone ${dragActive ? 'active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={triggerFileInput}
              >
                <div className="upload-icon">📁</div>
                <span>Drag & Drop files here or <b>browse</b></span>
                <p style={{fontSize:'0.85rem', color:'#718096', margin:0}}>Supports: PDF, DOC, JPG, PNG</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={(e) => handleFile(e.target.files[0])} 
                  style={{ display: 'none' }} 
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </div>
            ) : (
              <div className="file-preview">
                <div className="file-info">
                  {renderFileIcon()}
                  <div className="file-details">
                    <span className="file-name" title={file.name}>{file.name}</span>
                    <span className="file-size">{formatFileSize(file.size)}</span>
                  </div>
                </div>
                <button type="button" className="btn-remove" onClick={removeFile}>Remove</button>
              </div>
            )}
            
            {uploadProgress > 0 && (
                <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
                </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="btn-reset" onClick={handleReset} disabled={loading}>
              Reset Form
            </button>
            <button type="submit" className="btn-primary" disabled={loading || !isFormComplete()}>
              {loading ? <div className="spinner"></div> : "Upload Resource"}
            </button>
          </div>

        </form>

        <div className={`toast-overlay ${toast.show ? 'show' : ''} ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}>
          <div style={{fontSize:'1.2rem'}}>{toast.type === 'error' ? '❌' : '✅'}</div>
          <div>{toast.message}</div>
        </div>

      </div>
    </>
  );
}

export default Upload;
