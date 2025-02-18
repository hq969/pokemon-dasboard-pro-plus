import React from 'react';

const PokemonCardSkeleton = ({pokemonName}: {pokemonName:string}) => {
    const name = pokemonName.split(' ').join('+').toUpperCase();
    return (
    <div className="col skeleton-pokemon">
        <div className="card pokemon-card p-2">
            <div className="skeleton-header" style={{height: "20px"}}>
            </div>
            <div className="skeleton-img" style={{height:"300px"}}>
            </div>
            <div className="card-body">
                <div className="skeleton-title"></div>
            </div>
            <ul className="list-group list-group-flush" style={{height: "20px"}}>
                <li className="list-group-item d-flex gap-2">
                    <div className="skeleton-types"></div>
                </li>
            </ul>
            <div className="card-body d-flex justify-content-between align-items-center">
                <div className="w-50 d-flex gap-2">
                    <div className="skeleton-button"></div>
                    <div className="skeleton-button"></div>
                </div>
                <div className="d-flex gap-2">
                    <div className="skeleton-heart"></div>
                </div>
            </div>
        </div>
    </div>
)};

export default PokemonCardSkeleton;
