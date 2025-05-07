import { useEffect, useState } from "react";
import { RecipeCard } from "../components/RecipeCard";
import recettes from "../../recettes.json";

export function ListRecettes({ searchTerm }) {
  const [recettesList, setRecettesList] = useState([]);

  useEffect(() => {
    setRecettesList(recettes);
  }, []);

  const filteredRecettes = recettesList.filter(
    (recette) =>
      recette.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recette.ingredients.some(
        (ingredient) =>
          typeof ingredient === "string" &&
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <>
      <h2>Liste des Recettes</h2>
      <div className="recipe-list">
        {filteredRecettes.map((recette) => (
          <RecipeCard key={recette.id} recette={recette} />
        ))}
      </div>
    </>
  );
}
