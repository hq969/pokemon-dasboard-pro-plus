import { useDispatch, useSelector } from 'react-redux'
import { useGetPokemonByNameQuery } from '../../redux/pokemon/pokemon'
import Loader from './Loader'
import { showModal } from '../../redux/feature/modalSlice'
import { Link, useNavigate } from 'react-router-dom'
import PokeHeader from './pokeHeader'
import Error from './Error'
import { setPage, setType } from '../../redux/feature/typeFilterSlice'
import { useIsFavorite } from '../../lib/date'
import { toggleFav } from '../../redux/feature/favLocalStorageSlice'
import PokemonCardSkeleton from './PokemonCardSkeleton'

const PokemonCard = ({ pokemonName }) => {
    const { data, error, isLoading } = useGetPokemonByNameQuery(pokemonName);
    const isFav = useIsFavorite(pokemonName);
    const { type } = useSelector((store) => store.typeFilter);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const typeRender = (query) => {
        if (query === type) return
        dispatch(setType(query))
        dispatch(setPage(1));
        if (window.location.pathname !== "/") {
            navigate('/#filter')
        }
    }

    const imgPreview = (e) => {
        e.stopPropagation()
        dispatch(showModal({
            title: data.name,
            body: <img height="400px" width="100%" src={data.front_default || data.front_shiny} alt={data.name} />,
            image: data.front_default,
        }))
    }
    // if loading, show loader
    if (isLoading) return <PokemonCardSkeleton pokemonName={pokemonName} />
    // if error, show error
    if (error) return <Error error={error} data={pokemonName} />

    return (
        <div to={`/pokemon/${pokemonName}`} className="col" onClick={() => {
            navigate(`/pokemon/${pokemonName}`)
        }}>
            <div className="card pokemon-card p-2">
                <PokeHeader pokeName={data.name} pokeImage={data.front_shiny} />
                <img
                    data-bs-toggle="modal"
                    title={`Preview of ${data.name}`}
                    data-bs-target="#exampleModal"
                    onClick={imgPreview}
                    src={data.front_default || data.front_shiny}
                    alt={data.name}
                    height="200px"
                    className="card-img-top courser-pointer p-2 poke-img"
                />
                <div className="card-body">
                    <h5 title={data.name} className="card-title text-capitalize">{data.name}</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex gap-2">
                        Types:
                        {' '}
                        {
                            data.typesArr.map(type => (
                                <button
                                    className='badge bg-info text-capitalize'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        typeRender(type)
                                    }}
                                >
                                    {type}
                                </button>))
                        }
                    </li>
                </ul>
                <div className="card-body d-flex justify-content-between align-items-center">
                    <div className='w-50 d-flex gap-2'>
                        <Link title={`See Details of ${pokemonName}`} to={`/pokemon/${pokemonName}`} className="card-link btn btn-primary fs-6">Details</Link>
                        <button
                            type="button" onClick={imgPreview}
                            className="btn btn-success fs-6"
                            title={`Preview of ${data.name}`}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal">
                            Preview
                        </button>
                    </div>
                    <div className="d-flex gap-2">
                        <i
                            className={`fa-solid fa-heart fs-2 ${isFav && 'fav'} courser-pointer`}
                            onClick={(e) => {
                                e.stopPropagation()
                                dispatch(toggleFav({ name: pokemonName }))
                            }}
                        ></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonCard