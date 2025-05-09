export function RecipeCard({ recette }) {
  return (
    <div className="recipe-card">
      <p className="recipe-time">{recette.time}min</p>
      <img
        src={`/recettes/recettes/${recette.image}`}
        alt={recette.name}
        className="recipe-image"
      />
      <div className="recipe-details">
        <h2>{recette.name}</h2>
        <p class="ingredients-title">Recette</p>
        <p class="ingredients-description">{recette.description}</p>
        <p class="ingredients-title">Ingrédients</p>
        <div className="ingredients-grid">
          {recette.ingredients.map((ing, index) => (
            <div key={index} className="ingredient-item">
              <span className="ingredient-name">{ing.ingredient || ing}</span>
              <span className="ingredient-quantity">
                {ing.quantity || ""} {ing.unit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
