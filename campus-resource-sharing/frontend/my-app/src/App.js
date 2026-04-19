import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FSD from "./projectFSD/FSD";
import Login from "./projectFSD/Login";
import Signup from "./projectFSD/Signup";
import Books from "./projectFSD/books";
import Notes from "./projectFSD/notes";
import Upload from "./projectFSD/upload";
import Tools from "./projectFSD/tools";
import Dashboard from "./projectFSD/Dashboard";

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("userLoggedIn") === "true";
  return isAuth ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FSD />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/books" element={<ProtectedRoute><Books /></ProtectedRoute>} />
        <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
        <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
        <Route path="/tools" element={<ProtectedRoute><Tools /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;