import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import CocktailsList from "./CocktailsList";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import CocktailDetails from "./CocktailDetails";
// import Footer from "./Footer";

// const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
// `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17222`

function App() {
  const [cocktails, setCocktails] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectedId(id) {
    setSelectedId((selectedId) => id);
  }

  function handleGoBack() {
    setSelectedId((selectedId) => null);
  }

  useEffect(
    function () {
      const abortController = new AbortController();
      const signal = abortController.signal;

      async function fetchCocktails() {
        try {
          setError("");
          setIsLoading(true);

          const res = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query.trim()}`,
            { signal }
          );

          if (!res.ok)
            throw new Error(
              "Failed to fetch cocktails. Please try again later."
            );

          const data = await res.json();
          if (!data.drinks) throw new Error("Cocktail does not exist!");

          const coctailObj = data.drinks.map((drink) => ({
            id: drink.idDrink,
            name: drink.strDrink,
            typeOfDrink: drink.strAlcoholic,
            category: drink.strCategory,
            secName: drink.strIngredient2,
            img: drink.strDrinkThumb,
          }));

          setCocktails(coctailObj);

          setError("");
        } catch (err) {
          if (err !== "AbortError") {
            setError(err.message);
            setCocktails([]);
          }
        } finally {
          setIsLoading(false);
        }
      }
      fetchCocktails();

      return () => abortController.abort();
    },
    [query]
  );

  return (
    <main>
      <Navbar
        cocktails={cocktails}
        query={query}
        setQuery={setQuery}
        selectedId={selectedId}
        onGoBack={handleGoBack}
      />

      {isLoading && <Loader />}
      {!isLoading && !error && !selectedId && (
        <CocktailsList cocktails={cocktails} onSelectedId={handleSelectedId} />
      )}
      {!isLoading && !error && selectedId && (
        <CocktailDetails
          selectedId={selectedId}
          setIsLoading={setIsLoading}
          setError={setError}
        />
      )}
      {error && <ErrorMessage message={error} />}
    </main>
  );
}

export default App;
