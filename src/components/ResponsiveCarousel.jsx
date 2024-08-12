import { useEffect, useState } from "react";
import { Productos } from "./../data/data.js";
import { NavLink, useParams } from "react-router-dom";
import { Carousel } from "@trendyol-js/react-carousel";
import BackIcon from "./BackIcon.jsx";
import RightIcon from "./RightIcon.jsx";

const ResponsiveCarousel = () => {

    const products = Productos.products
    const categories = Productos.categories

    const { productId } = useParams()
    let product = products.find(product => product.product === productId)
    if (!product) return null;


    function isCategory(category) {
        return category.category === product.category;
    }

    const categorySelected = categories.find(isCategory).category;
    const prueba = products.filter(product => product.category === categorySelected && product.stock > 0 && productId !== product.product);

    console.log(prueba.length)
    console.log(products.length)

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getShowCount = () => {
        console.log(screenWidth);
        if (screenWidth < 768) {
            return 1; // Show 1 item per slide
        } else if (screenWidth < 1200) {
            return 2; // Show 2 items per slide
        } else if (screenWidth > 1200) {
            return 4; // Show 4 items per slide
        }
    };

    const getSlideCount = () => {
        if (screenWidth < 768) {
            return 1; // Slide 1 item at a time
        } else {
            return getShowCount(); // Slide the same number of items as displayed
        }
    };


    return (
        <Carousel
            className='carousel'
            infinite={false}
            show={getShowCount()}
            responsive={true}
            slide={getSlideCount()}
            useArrowKeys={true}
            leftArrow={<BackIcon />}
            rightArrow={<RightIcon />}
        >
            {prueba.reverse().map(function getCategories(product) {
                return (
                    <NavLink
                        key={product.id}
                        to={"/products/" + product.product}
                        reloadDocument={true}
                        className="producto"
                    >
                        <img src={product.image} alt="" />
                        <div className="detalle">
                            <h4>{product.product}</h4>
                            <p>${product.price}</p>
                        </div>
                    </NavLink>
                );
            })}
        </Carousel>
    );
};

export default ResponsiveCarousel;