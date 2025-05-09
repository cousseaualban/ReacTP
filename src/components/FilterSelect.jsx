// FilterSelect est un composant réutilisable qui affiche un menu déroulant (<select>)
// pour filtrer une liste selon une catégorie (ex. ingrédients, appareils, ustensiles).
// Il prend en paramètres :
// - options : les choix à afficher,
// - selected : la valeur actuellement sélectionnée,
// - onChange : la fonction à appeler lorsqu’un choix est sélectionné,
// - label : le texte à afficher comme option par défaut (non sélectionnable).

export function FilterSelect({ options, selected, onChange, label, onClear }) {
  const handleChange = (e) => {
    const value = e.target.value;
    if (value !== "") {
      onChange(value);
    }
  };
  return (
    <div>
      <select id={label} value="" onChange={handleChange}>
        <option value="" disabled hidden>{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>

      {selected !== "Tous" && (
        <div className="selected-item" onClick={() => onClear()}>
          {selected.charAt(0).toUpperCase() + selected.slice(1)} &times;
        </div>
      )}
    </div>
  );
}
  