import Cocktail from "./Cocktail";

export default function CocktailsList({ cocktails, onSelectedId }) {
  return (
    <div className="container">
      <h1>🍹 Cocktails 🍸</h1>

      <ul>
        {cocktails.map((cocktail) => (
          <Cocktail
            cocktail={cocktail}
            key={cocktail.id}
            onSelectedId={onSelectedId}
          />
        ))}
      </ul>
    </div>
  );
}
