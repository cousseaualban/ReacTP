import { useEffect, useState } from "react";
import recettes from "../../recettes.json";

export function ListRecettes() {
  const [recettesList, setRecettesList] = useState([]);

  useEffect(() => {
    setRecettesList(recettes);
  }, []);

  return (
    <>
      <h2>Liste des Recettes</h2>
      {recettesList.map((recette) => (
        <div key={recette.id}>
          <h3>{recette.name}</h3>
          <p>{recette.description}</p>
        </div>
      ))}
    </>
  );
}
