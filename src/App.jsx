import "./App.css";
import { ListRecettes } from "./pages/listRecettes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <BrowserRouter>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<ListRecettes searchTerm={searchTerm} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
