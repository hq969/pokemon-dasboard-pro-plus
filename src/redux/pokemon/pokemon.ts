import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const arrOutput = (arr: any, property: any) => {
    return arr.map((item: any) => item[property].name);
}

export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    endpoints: (builder) => ({
        getPokemonByName: builder.query<PokemonByName | Error, string>({
            // Custom query function to fetch short Details from the API by name
            queryFn: async (pName: string) => {
                try {
                    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pName}`);
                    if (!res.ok) {
                        throw new Error(`Network response was not ok ${res.status} ${res.statusText}`);
                    }
                    const tempData = await res.json();
                    const { id, name, abilities, sprites: { front_shiny, other: { dream_world: { front_default } } } } = tempData;
                    const typesArr = tempData.types.map((type: any) => type.type.name);
                    const abilitiesArr = abilities.map((ability: any) => ability.ability.name);
                    return { data: { id, name, typesArr, abilitiesArr, front_default, front_shiny } };
                } catch (error: any) {
                    return { error: error.message };
                }
            },
        }),
        getPokemon: builder.query<ListResponse<PokemonList>, number | void>({
            // build in query function to fetch data from the API
            query: (page: any = 1) => `pokemon?limit=25&offset=${page * 25 - 25}`,
        }),
        getAllPokemonName: builder.query<string[], undefined | void>({
            // build in query function to fetch data from the API
            query: () => `pokemon?limit=1000000&offset=0`,
            transformResponse: (response: any) => {
                if (response) {
                    const { results } = response;
                    return results.map((poke: any) => poke.name);
                }
            }
        }),
        // getPokemonType: builder.query<PokemonTypeList[] | Error, null>({
        //     // Custom query function to fetch types of pokemon from the API
        //     queryFn: async () => {
        //         try {
        //             const res = await fetch('https://pokeapi.co/api/v2/type');
        //             if (!res.ok) {
        //                 throw new Error(`Network response was not ok ${res.status} ${res.statusText}`);
        //             }
        //             const tempData = await res.json();
        //             return { data: tempData.results };
        //         } catch (error: any) {
        //             return { error: error };
        //         }
        //     }
        // }),
        getPokemonByType: builder.query<string[], string>({
            // Custom query function to fetch pokemon from the API by type
            queryFn: async (type: string) => {
                try {
                    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
                    if (!res.ok) {
                        throw new Error(`Network response was not ok ${res.status} ${res.statusText}`);
                    }
                    const tempData = await res.json();
                    const pokemon = tempData.pokemon;
                    const name = pokemon.map((poke: any) => poke.pokemon.name);
                    return { data: name };
                } catch (error: any) {
                    return { error: error.message };
                }
            },
        }),
        getPokemonDetail: builder.query<PokemonDetail | Error, string>({
            // Custom query function to fetch Details from the API by name
            queryFn: async (pokeName: string) => {
                try {
                    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
                    if (!res.ok) {
                        throw new Error(`Network response was not ok ${res.status} ${res.statusText}`);
                    }
                    const tempData = await res.json();
                    const {
                        id,
                        name,
                        height,
                        weight,
                        base_experience,
                        types,
                        moves,
                        held_items,
                        stats,
                        abilities,
                        sprites: {
                            front_shiny,
                            other: {
                                dream_world: { front_default: image }
                            }
                        }
                    } = tempData;
                    const typesArr = arrOutput(types, "type");
                    const abilitiesArr = arrOutput(abilities, "ability");
                    const moveArr = arrOutput(moves, "move");
                    const itemsArr = arrOutput(held_items, "item");
                    return {
                        data: {
                            id,
                            name,
                            image,
                            front_shiny,
                            height,
                            weight,
                            base_experience,
                            typesArr,
                            abilitiesArr,
                            moveArr,
                            itemsArr,
                            stats,
                        }
                    };
                } catch (error: any) {
                    return { error: error.message };
                }
            },

        })
    }),
});

export const { useGetPokemonByNameQuery, useGetPokemonQuery, useGetPokemonByTypeQuery, useGetPokemonDetailQuery, usePrefetch, useGetAllPokemonNameQuery } = pokemonApi;