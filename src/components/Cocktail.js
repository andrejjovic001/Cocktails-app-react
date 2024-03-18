export default function Cocktail({ cocktail, onSelectedId }) {
  return (
    <li>
      <img src={cocktail.img} alt={cocktail.name} />
      <div className="cocktail-inf">
        <h2>
          {cocktail.name} {cocktail.secName}
        </h2>
        <h4>{cocktail.category}</h4>
        <h5>{cocktail.typeOfDrink}</h5>

        <div className="btn-wrapp">
          <button onClick={() => onSelectedId(cocktail.id)}>DETAILS</button>
        </div>
      </div>
    </li>
  );
}
