import { useParams } from 'react-router-dom'
import { useGetPokemonDetailQuery } from '../../redux/pokemon/pokemon';
import PokeHeader from '../shared/pokeHeader';
import DetailCard from './DetailCard';
import DetailStats from './DetailStats';
import Loader from '../shared/Loader';
import Error from '../shared/Error';
import { useDocumentTitle } from '../../lib/date';
const Details = () => {
    const { pokemonName } = useParams();
    useDocumentTitle(pokemonName ? `Details of ${pokemonName}` : 'Details of Pokemon');
    const { data, error, isLoading
    } = useGetPokemonDetailQuery(pokemonName || '');

    // if loading, show loader
    if (isLoading) return <Loader />
    // if error, show error
    if (error) return <Error error={error} data={"Details"} />
    // if no loading and no error, show data
    return (
        <main className='home-container p-2'>
            <div title={`Detail title of ${data?.name}`} className='alert alert-success d-flex gap-3 p-3 align-items-center justify-content-center'>
                <div>
                    <h2>Details of the</h2>
                </div>
                <PokeHeader pokeName={data?.name} pokeImage={(data && 'image' in data && data?.image) || (data && data?.front_shiny)} />
            </div>
            <DetailCard {...data} />
            <div className="statistics">
                <div className="card alert-success mx-auto my-5 d-flex justify-content align-items-center p-5 pm-4 ps-3 pt-3" style={{ maxWidth: "800px" }}>
                    <PokeHeader pokeName={data?.name} pokeImage={(data && 'image' in data && data?.image) || (data && data?.front_shiny)} />
                    {data && 'stats' in data && <DetailStats stat={data.stats} pokeName={data?.name} />}
                </div>
            </div>
        </main>
    )
}

export default Details