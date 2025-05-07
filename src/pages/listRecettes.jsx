import { useEffect, useState } from "react";
import recettes from "../../recettes.json";
import { FilterSelect } from "../components/FilterSelect";

export function ListRecettes() {
  const [recettesList, setRecettesList] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState("Tous");

  useEffect(() => {
    setRecettesList(recettes);
  }, []);

  const allIngredients = Array.from(
    new Set(
      recettes.flatMap((recette) =>
        recette.ingredients.map((i) => i.ingredient.trim().toLowerCase())
      )
    )
  );
  
  const filteredRecettes = selectedIngredient === "Tous"
  ? recettesList
  : recettesList.filter((recette) =>
      recette.ingredients.some(
        (i) => i.ingredient.trim().toLowerCase() === selectedIngredient
      )
    );

  return (
    <>
      <h2>Liste des Recettes</h2>

      <FilterSelect
        ingredients={allIngredients}
        selected={selectedIngredient}
        onChange={setSelectedIngredient}
      />

      {filteredRecettes.map((recette) => (
        <div key={recette.id}>
          <h3>{recette.name}</h3>
          <p>{recette.description}</p>
        </div>
      ))}
    </>
  );
}
