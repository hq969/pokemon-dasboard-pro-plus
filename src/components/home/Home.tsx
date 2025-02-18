import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useGetPokemonQuery } from '../../redux/pokemon/pokemon';
import Button from '../Button';
import PokemonCard from '../shared/PokemonCard';
import TypeFilter from './TypeFilter';
import Loader from '../shared/Loader';
import Hero from '../Hero';
import Error from '../shared/Error';
import { useDispatch, useSelector } from 'react-redux';
import TypePokemon from './TypePokemon';
import { setNext, setPage, setPrevious } from '../../redux/feature/typeFilterSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { type, next, previous, page, inMobile: isMobile } = useSelector((state: any) => state.typeFilter);
    const { data, error, isFetching } = useGetPokemonQuery(page);
    const [scrollLength, setScrollLength] = useState<number>(0)
    const [fixed, setFixed] = useState<boolean>(false);
    const [pageData, setPageData] = useState<string[]>([]);
    const dispatch = useDispatch();
    const viewport = useRef<HTMLDivElement>(null);
    const endScroll = useRef<HTMLDivElement>(null);
    const navigate = useNavigate()
    // Increment and decrement page
    const nextPagination = useCallback((): void => {
        if (data) {
            setPageData([...pageData, ...data.results.map((pokemon: Pokemon) => pokemon.name)])
        }
    }, [data, pageData]);
    // Scroll event listener
    useEffect(() => {
        const handleScroll = () => {
            setScrollLength(window.scrollY);
            if (viewport.current && endScroll.current) {
                const top = viewport.current.offsetTop;
                const end = endScroll.current.offsetTop;
                console.log(top, end, scrollLength);
                if (scrollLength >= top) {
                    setFixed(true);
                } else {
                    setFixed(false);
                }
                if (scrollLength + window.innerHeight >= end && (!isFetching) && type === "all") {
                    console.log('end');
                    dispatch(setPage(page + 1))
                    nextPagination();
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [
        scrollLength,
        fixed,
        dispatch,
        nextPagination,
        data,
        pageData,
        page,
        isFetching,
        type
    ]);


    const decrementor = (): void => {
        if (page > 1) {
            dispatch(setPage(page - 1))
            dispatch(setPrevious(false))
        } else if (page === 2) {
            dispatch(setPrevious(true))
        }
        navigate('/#filter')
    }

    return (
        <main className='home-container'>
            <Hero />
            <div ref={viewport} id="viewport"></div>
            {/* Setter function would be used in future feature */}
            <TypeFilter fixed={fixed} />
            {error && <Error error={error} data={"Pokemon"} />}
            <div className='pokemon-container'>
                <div className="container  my-5">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                        <Suspense fallback={<Loader />}>
                            {type === "all" && pageData && pageData.map((pokemon: string, index: number) => (
                                <PokemonCard key={index} pokemonName={pokemon} />
                            ))}
                            {type !== "all" && <TypePokemon type={type} page={page} />}
                        </Suspense>
                    </div>
                </div>
                <Button
                    title={previous ? "Back" : "disable"}
                    type="button"
                    className={fixed && type !== "all" ? "btn btn-secondary paginator position-fixed top-50 start-0" : "d-none"}
                    button={isMobile ? "<<" : "<<Back"}
                    onClick={() => decrementor()}
                    isLoading={isFetching}
                    disabled={page === 1 || previous}
                />
                <Button
                    type="button"
                    tile={next ? "next" : "disable"}
                    className={fixed && type !== "all" ? "btn btn-secondary paginator position-fixed top-50 end-0" : "d-none"}
                    button={isMobile ? ">>" : "next>>"}
                    onClick={() => {
                        dispatch(setPage(page + 1))
                        dispatch(setNext(false))
                        dispatch(setPrevious(false))
                        nextPagination();
                        navigate('/#filter')
                    }}
                    isLoading={isFetching}
                    disabled={next}
                />
                <div ref={endScroll} id="endScroll"></div>
            </div>
        </main>
    );
};

export default Home;