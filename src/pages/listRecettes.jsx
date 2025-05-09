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
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedAppliances, setSelectedAppliances] = useState([]);
  const [selectedUstensils, setSelectedUstensils] = useState([]);

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
    const search = searchTerm.trim().toLowerCase();

    const matchName = recette.name.toLowerCase().includes(search);
    const matchIngredient = recette.ingredients.some((i) =>
      i.ingredient.toLowerCase().includes(search)
    );
    const matchDescription = recette.description.toLowerCase().includes(search);

    const matchSelectedIngredients =
      selectedIngredients.length === 0 ||
      selectedIngredients.every((selIng) =>
        recette.ingredients.some(
          (i) =>
            i.ingredient &&
            i.ingredient.trim().toLowerCase() === selIng.toLowerCase()
        )
      );

    const matchSelectedAppliances =
      selectedAppliances.length === 0 ||
      selectedAppliances.includes(recette.appliance.trim().toLowerCase());

    const matchSelectedUstensils =
      selectedUstensils.length === 0 ||
      selectedUstensils.every((ust) =>
        recette.ustensils.map((u) => u.toLowerCase()).includes(ust)
      );

    return (
      (matchName || matchIngredient || matchDescription) &&
      matchSelectedIngredients &&
      matchSelectedAppliances &&
      matchSelectedUstensils
    );
  });

  const clearIngredient = () => setSelectedIngredients("Tous");
  const clearAppliance = () => setSelectedAppliances("Tous");
  const clearUstensil = () => setSelectedUstensils("Tous");

  return (
    <>
      <div className="filters">
        <FilterSelect
          options={allIngredients}
          selected={selectedIngredients}
          onChange={setSelectedIngredients}
          label="Ingrédients"
          onClear={clearIngredient}
        />
        <FilterSelect
          options={allAppliances}
          selected={selectedAppliances}
          onChange={setSelectedAppliances}
          label="Appareils"
          onClear={clearAppliance}
        />
        <FilterSelect
          options={allUstensils}
          selected={selectedUstensils}
          onChange={setSelectedUstensils}
          label="Ustensiles"
          onClear={clearUstensil}
        />
        <div className="recipe-count">{filteredRecettes.length} recettes</div>
      </div>
      <div className="recipe-list">
        {filteredRecettes.map((recette) => (
          <RecipeCard key={recette.id} recette={recette} />
        ))}
      </div>
    </>
  );
}
