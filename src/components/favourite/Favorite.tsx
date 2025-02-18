import { Suspense } from "react"
import { useDocumentTitle } from "../../lib/date"
import Loader from "../shared/Loader"
import PokemonCard from "../shared/PokemonCard"
import { useSelector } from "react-redux"
import Default from "../default/DefaultPage"

const Favorite = () => {
  useDocumentTitle('Favorite Pokemons');
  const { favItems } = useSelector((state: any) => state.favLocalStorage);
  return (
    <>
      <div className="alert alert-success">
        <h1 className="text-center favorite-title">Favorite Pokemons</h1>
      </div>
      {Object.values(favItems).length === 0 && <Default text="No Favorite Pokemons Please add one" />}
      <div className="pokemon-container">
        <div className="container  my-5">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
            {Object.values(favItems).map((value, index) => (
              <Suspense key={index} fallback={<Loader />}>
                <PokemonCard pokemonName={value} />
              </Suspense>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Favorite;