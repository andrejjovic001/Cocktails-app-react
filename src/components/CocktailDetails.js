import { useEffect, useState } from "react";

export default function CocktailDetails({
  selectedId,
  setIsLoading,
  setError,
}) {
  const [cocktail, setCocktail] = useState({});

  useEffect(
    function () {
      setIsLoading(true);
      setError("");

      async function fetchCockailDetails() {
        try {
          const res = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${selectedId}`
          );

          if (!res.ok) throw new Error("Something went wrong!");

          const data = await res.json();
          const drink = data.drinks[0];

          if (!drink) throw new Error("Cocktail does not exist!");

          const cocktailDetailsObj = {
            id: drink.idDrink,
            name: drink.strDrink,
            typeOfDrink: drink.strAlcoholic,
            category: drink.strCategory,
            glass: drink.strGlass,
            secName: drink.strIngredient2,
            img: drink.strDrinkThumb,
          };

          setCocktail(cocktailDetailsObj);
          setError("");
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      fetchCockailDetails();
    },
    [selectedId]
  );

  return (
    <div>
      <h1>{cocktail.name} 🍹</h1>
      <div className="cocktail-details">
        <div className="cocktail-info">
          <h2>
            Name - <span>{cocktail.name} 🍸</span>
          </h2>
          <h2>
            Category - <span>{cocktail.category} 🍸</span>{" "}
          </h2>
          <h2>
            Type - <span>{cocktail.typeOfDrink} 🍸</span>
          </h2>

          <h2>
            Glass - <span>{cocktail.glass} 🍸</span>
          </h2>

          <h2>
            Ing - <span> {cocktail.secName} 🍸</span>
          </h2>
        </div>

        <div className="details-img">
          <img src={cocktail.img} alt={cocktail.name}></img>
        </div>
      </div>
    </div>
  );
}
