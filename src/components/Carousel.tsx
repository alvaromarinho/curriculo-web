import { ProjectImage } from "../models/Portfolio";

interface CarouselProps { images: ProjectImage[] }

export default function Carousel({ images }: CarouselProps) {

    return (
        <>
            {images && images.length == 1 &&
                <img className="img-cover w-100" src={`${process.env.API_URL}/image?path=${images[0].url}`} />
            }
            {images && images.length > 1 &&
                <div id="carouselControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {images.map((image, index) =>
                            <div className={`carousel-item ${index == 0 && 'active'}`} key={image.id}>
                                <img className="d-block w-100" src={`${process.env.API_URL}/image?path=${image.url}`} />
                            </div>
                        )}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            }
        </>
    )
}