// FilterSelect est un composant réutilisable qui affiche un menu déroulant (<select>)
// pour filtrer une liste selon une catégorie (ex. ingrédients, appareils, ustensiles).
// Il prend en paramètres :
// - options : les choix à afficher,
// - selected : la valeur actuellement sélectionnée,
// - onChange : la fonction à appeler lorsqu’un choix est sélectionné,
// - label : le texte à afficher comme option par défaut (non sélectionnable).

import { useState, useEffect, useRef } from "react";

export function FilterSelect({ options, selected, onChange, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleToggleOption = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
    setIsOpen(false);
  };

  const handleClearOption = (value) => {
    onChange(selected.filter((item) => item !== value));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
              <li
                key={option}
                onClick={() => handleToggleOption(option)}
                style={{
                  fontWeight: selected.includes(option) ? "bold" : "normal",
                }}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selected.length > 0 && (
        <div className="selected-tags">
          {selected.map((item) => (
            <div key={item} className="selected-item" onClick={() => handleClearOption(item)}>
              {item.charAt(0).toUpperCase() + item.slice(1)} &times;
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
  