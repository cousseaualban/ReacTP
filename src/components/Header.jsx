import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <header className="header">
      <img
        className="header-title"
        src="../logo.png"
        alt="Les Petits Plats Logo"
      />
      <div className="header-overlay">
        <p className="header-subtitle">
          cherchez parmi plus de 1500 recettes du quotidien, simples et
          délicieuses
        </p>
        <div className="search-container">
          <input
            type="text"
            placeholder="Rechercher une recette, un ingrédient, ..."
            value={searchTerm}
            onChange={handleSearch}
            className="header-input"
          />
          <button className="search-button">
            <FaSearch className="search-icon" />
          </button>
        </div>
      </div>
    </header>
  );
};
