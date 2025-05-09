// FilterSelect est un composant réutilisable qui affiche un menu déroulant (<select>)
// pour filtrer une liste selon une catégorie (ex. ingrédients, appareils, ustensiles).
// Il prend en paramètres :
// - options : les choix à afficher,
// - selected : la valeur actuellement sélectionnée,
// - onChange : la fonction à appeler lorsqu’un choix est sélectionné,
// - label : le texte à afficher comme option par défaut (non sélectionnable).

export function FilterSelect({ options, selected, onChange, label }) {
    return (
      <div>
        <select
          id={label}
          value={selected}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="Tous" disabled hidden>{label}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      </div>
    );
  }
  