import "./App.css";
import { ListRecettes } from "./pages/listRecettes";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1>Navbar</h1>
        <nav>
          <Link to="/"> Home </Link>
          {/* <Link to="/ajout"> Ajout utilisateur </Link> */}
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<ListRecettes />} />
        {/* <Route path="/ajout" element={<AddUser />} /> */}
      </Routes>
      <footer>Made by Me</footer>
    </BrowserRouter>
  );
}

export default App;
