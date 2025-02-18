/// <reference types="react-scripts" />

type Pokemon = {
    name: string;
    url: string;
}

type PokemonList = {
    count: number;
    next: string;
    previous: string;
    results: Pokemon[];
}

type PokemonType = {
    slot: number;
    type: {
        name: string;
        url: string;
    }
}

type ListResponse<T> = {
    page: number
    per_page: number
    total: number
    total_pages: number
    count: number
    data: T[]
    results: Pokemon[]
}
interface CustomButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    isLoading: boolean;
}

type PokemonDetail = {
    id: string | number,
    name: string,
    image: string,
    image: string,
    front_shiny: string,
    height: number,
    weight: number,
    base_experience: number,
    typesArr: string[],
    abilitiesArr: string[],
    moveArr: string[],
    itemsArr: string[],
    stats: any,
}

type PokemonByName = { 
    id: string | number, 
    name: string, 
    typesArr: string[], 
    abilitiesArr: string[], 
    front_default: string, 
    front_shiny: string,
}

type PokemonTypeList = {
    name: string;
    url: string;
}

interface Error {
    error: any;
}