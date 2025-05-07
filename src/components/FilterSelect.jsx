export function FilterSelect({ ingredients, selected, onChange }) {
    return (
      <div>
        <select
          id="ingredient-select"
          value={selected}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="Tous">Ingrédients</option>
          {ingredients.map((ingredient) => (
            <option key={ingredient} value={ingredient}>
                {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
            </option>          
          ))}
        </select>
      </div>
    );
  }
  