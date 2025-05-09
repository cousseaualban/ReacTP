// FilterSelect est un composant réutilisable qui affiche un menu déroulant (<select>)
// pour filtrer une liste selon une catégorie (ex. ingrédients, appareils, ustensiles).
// Il prend en paramètres :
// - options : les choix à afficher,
// - selected : la valeur actuellement sélectionnée,
// - onChange : la fonction à appeler lorsqu’un choix est sélectionné,
// - label : le texte à afficher comme option par défaut (non sélectionnable).

import { useState, useEffect, useRef } from "react";

export function FilterSelect({ options, selected, onChange, label, onClear }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelect = (value) => {
    onChange(value);
    setSearchText("");
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="filter-select" ref={dropdownRef}>
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {label}
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          <input
            type="text"
            placeholder={`Rechercher ${label.toLowerCase()}`}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <ul>
            {filteredOptions.map((option) => (
              <li key={option} onClick={() => handleSelect(option)}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selected !== "Tous" && (
        <div className="selected-item" onClick={onClear}>
          {selected.charAt(0).toUpperCase() + selected.slice(1)} &times;
        </div>
      )}
    </div>
  );
}
  