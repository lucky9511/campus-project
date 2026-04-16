import { BrowserRouter, Routes, Route } from "react-router-dom";
import FSD from "./projectFSD/FSD";
import Login from "./projectFSD/Login";
import Signup from "./projectFSD/Signup";
import Books from "./projectFSD/books";
import Notes from "./projectFSD/notes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FSD />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/books" element={<Books />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;