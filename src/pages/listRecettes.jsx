// ListRecettes est un composant qui gère une liste de recettes avec des filtres dynamiques.
// Il utilise des menus déroulants (via le composant FilterSelect) pour filtrer les recettes
// en fonction des ingrédients, des appareils et des ustensiles.
// Il charge les recettes initialement avec `useEffect` et applique les filtres choisis
// pour afficher uniquement les recettes qui correspondent aux critères sélectionnés.

import { useEffect, useState } from "react";
import { RecipeCard } from "../components/RecipeCard";
import recettes from "../../recettes.json";
import { FilterSelect } from "../components/FilterSelect";

export function ListRecettes({ searchTerm }) {
  const [recettesList, setRecettesList] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState("Tous");
  const [selectedAppliance, setSelectedAppliance] = useState("Tous");
  const [selectedUstensil, setSelectedUstensil] = useState("Tous");

  useEffect(() => {
    setRecettesList(recettes);
  }, []);

  const allIngredients = Array.from(
    new Set(
      recettes.flatMap((recette) =>
        recette.ingredients
          .map((i) => i.ingredient)
          .filter(Boolean)
          .map((name) => name.trim().toLowerCase())
      )
    )
  ).sort();

  const allAppliances = Array.from(
    new Set(
      recettes
        .map((recette) => recette.appliance)
        .filter(Boolean)
        .map((a) => a.trim().toLowerCase())
    )
  ).sort();

  const allUstensils = Array.from(
    new Set(
      recettes.flatMap((recette) =>
        recette.ustensils.filter(Boolean).map((u) => u.trim().toLowerCase())
      )
    )
  ).sort();

  const filteredRecettes = recettesList.filter((recette) => {
    const matchIngredient =
      selectedIngredient === "Tous" ||
      recette.ingredients.some(
        (i) =>
          i.ingredient &&
          i.ingredient.trim().toLowerCase() === selectedIngredient
      );

    const matchAppliance =
      selectedAppliance === "Tous" ||
      (recette.appliance &&
        recette.appliance.trim().toLowerCase() === selectedAppliance);

    const matchUstensil =
      selectedUstensil === "Tous" ||
      recette.ustensils.some(
        (u) => u.trim().toLowerCase() === selectedUstensil
      );

    return matchIngredient && matchAppliance && matchUstensil;
  });

  return (
    <>
      <h2>Liste des Recettes</h2>
      <FilterSelect
        options={allIngredients}
        selected={selectedIngredient}
        onChange={setSelectedIngredient}
        label="Ingrédients"
      />
      <FilterSelect
        options={allAppliances}
        selected={selectedAppliance}
        onChange={setSelectedAppliance}
        label="Appareils"
      />
      <FilterSelect
        options={allUstensils}
        selected={selectedUstensil}
        onChange={setSelectedUstensil}
        label="Ustensiles"
      />

      <div className="recipe-list">
        {filteredRecettes.map((recette) => (
          <RecipeCard key={recette.id} recette={recette} />
        ))}
      </div>
    </>
  );
}
