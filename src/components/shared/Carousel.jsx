// This component would be used in future to display images in a carousel format
const Carousel = ({ images }) => (
    <>
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {images.map((image) => (
                    <div key={image} className="card-img-top carousel-item active">
                        <img src={image} className="d-block w-100" alt="cards" />
                    </div>
                ))}
            </div>
        </div>
    </>
)

export default Carousel