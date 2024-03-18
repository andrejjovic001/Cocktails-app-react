export default function Search({ query, setQuery }) {
  return (
    <div>
      <input
        value={query}
        type="text"
        placeholder="Search Your Cocktail..."
        onChange={(e) => setQuery(e.target.value)}
      ></input>
    </div>
  );
}
