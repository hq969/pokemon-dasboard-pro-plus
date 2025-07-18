import { useEffect, useState } from 'react'
import dragon from '../assests/gifs/dragon.gif'
import hello from '../assests/gifs/hello.gif'
import meote from '../assests/gifs/meote.gif'
import walking from '../assests/gifs/walking.gif'

const Hero = () => {
    // Images to be displayed on the hero section as Deck
    const images = [
        { src: hello, alt: "Hello", style: { top: "10%", left: "5%", width: "150px" } },
        { src: walking, alt: "Walking", style: { bottom: "5%", right: "15%", width: "100px" } },
        { src: dragon, alt: "Dragon", style: { top: "19%", right: "49%" } },
        { src: meote, alt: "Meote", style: { bottom: "5%", left: "15%", width: "250px" } },
    ];
    return (
        <section className="hero position-relative">
            <div className='hero-container'>
                {images.map((item, index) => {
                    return (
                        <img
                            key={index}
                            src={item.src}
                            alt={item.alt}
                            style={item.style}
                            className="position-absolute deck-img"
                        />
                    );
                })}
                <h1 title="Hero Title">Your Favorite Pokemons Are Waiting</h1>
                <p title='Hero Description'>
                    Welcome to the Pokemon Dashboard Plus!
                    Here, you can explore a collection of your favorite Pokemon.
                    Add them to your favorites and view detailed information about each Pokemon.
                    Start your Pokemon journey now!
                </p>
            </div>
        </section>
    );
}

export default Hero
