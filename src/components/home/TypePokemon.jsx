import { Suspense, useEffect, useState } from 'react'
import Loader from '../shared/Loader';
import PokemonCard from '../shared/PokemonCard';
import { useGetPokemonByTypeQuery } from '../../redux/pokemon/pokemon';
import Error from '../shared/Error';
import { setNext } from '../../redux/feature/typeFilterSlice';
import NoMoreData from './NoMoreData';
import { useDispatch } from 'react-redux';

const TypePokemon = ({ type, page }) => {
    const { data, error, isLoading } = useGetPokemonByTypeQuery(type);
    const [dataAvailable, setDataAvailable] = useState(true);
    const dispatch = useDispatch();
    const paginateData = data && data.slice((page - 1) * 15, page * 15);
    useEffect(() => {
        (() => {
            if (data && data.length < page * 15) {
                dispatch(setNext(true))
                setDataAvailable(false)
            }
            setDataAvailable(true)
        })()
    }, [data, page, dispatch]);

    if (isLoading) return <Loader />
    if (error) return <Error error={error} data={type} />
    return (
        <Suspense fallback={<Loader />}>
            {data && paginateData.map((pokemonName) => (
                <PokemonCard key={pokemonName} pokemonName={pokemonName} />
            ))}
            {!dataAvailable && <NoMoreData />}
        </Suspense>
    )
}

export default TypePokemon