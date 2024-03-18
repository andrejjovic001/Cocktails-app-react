import Search from "./Search";

export default function Navbar({
  cocktails,
  query,
  setQuery,
  selectedId,
  onGoBack,
}) {
  return (
    <nav>
      <div className="container">
        <h3 className="nav-title">CocktailsShop</h3>
        {!selectedId ? (
          <>
            <Search query={query} setQuery={setQuery} />
            <p>Found results: {cocktails.length}</p>
          </>
        ) : (
          <button className="back-btn" onClick={onGoBack}>
            Go Home
          </button>
        )}
      </div>
    </nav>
  );
}
