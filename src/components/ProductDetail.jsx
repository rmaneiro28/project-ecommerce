import { Header } from './Header';
import { NavLink, useParams } from 'react-router-dom';
import { Orders, Productos } from "./../data/data.js";
import AddProduct from "../assets/add-product.svg"
import BackIcon from "../components/BackIcon";
import RightIcon from "../components/RightIcon";
import CartIcon from "../assets/CartIcon.svg";
import "../hooks/useCart.js";
import { CartProvider } from "../context/cart";
import { useCart } from '../hooks/useCart.js';
import { Cart } from './Cart';
import React from 'react';
import ResponsiveCarousel from './ResponsiveCarousel.jsx';
import ResponsiveCarouselProd from './ResponsiveCarouselProd.jsx';
import { useState } from 'react';
import { Modal } from './Modal';
import Footer from './Footer.jsx';
export function ProductDetail() {
    const products = Productos.products
    const { cart, addToCart, removeFromCart, clearCart } = useCart();
    const [stateModal, setStateModal] = useState(false);

    const { productId } = useParams()
    let product = products.find(product => product.product === productId)
    if (!product) return null;
    const orders = Orders;
    const [inventario, setInventario] = useState([])
    products.filter((product) => {
        let cantVendida = {
            id: Productos.products.id,
            cant: 0,
            products: Productos.products.product
        };
        for (let i = 0; i < orders.length; i++) {
            for (let j = 0; j < orders[i].products.length; j++) {
                if (orders[i].products[j].id === product.id) {
                    cantVendida.id = orders[i].products[j].id;
                    cantVendida.cant += orders[i].products[j].cant
                    cantVendida.products = orders[i].products[j].nombre_producto
                }
            }
        }
        inventario.push({
            id: cantVendida.id === undefined ? product.id : cantVendida.id,
            ventas: cantVendida.cant,
            inventarioActual: product.stock - cantVendida.cant,
            name: cantVendida.products === undefined ? product.product : cantVendida.products
        })

    })
    const quantitySell = inventario.filter((item) => item.name === product.product)[0].ventas;

    return (
        <CartProvider>
            <Header className="Header" />
            <div className="ruta">
                <NavLink to={"/"} className="back">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                    <p>Todos / {product.category} / {product.product}</p>
                </NavLink>
            </div>
            <div className="detalleProducto">

                <div className="product">
                    <img src={product.image} alt="" />
                    {/* // TODO: AÑADIR FUNCIONALIDAD DE LAS IMAGENES ACTIVAS AL DARLE CLICK
                    <img className='preview' src={product.image} alt={productId} />
                    <img className=' preview' src={product.image} alt={productId} /> */}
                    <div className="info">
                        <div className="price">
                            <h1>{product.product}</h1>
                            <p>${product.price}</p>
                        </div>
                        <div className="cartInfo">

                            <button className='addProducts' onClick={() => addToCart(product)}>
                                <img src={CartIcon} alt="" />
                                <p>Añadir</p>
                                <img src={AddProduct} alt="" />
                            </button>
                            <p style={{ color: (product.stock > 0) & (product.stock < 5) ? '#D87400' : product.stock == 0 ? '#9D1D1D' : "#969696" }} className='stock'> {product.stock - quantitySell} unidades disponibles</p>
                        </div>
                    </div>
                </div>

                <div className="productDetail" >
                    <h2>Detalles</h2>
                    <div className="description">
                        <p>{product.description}</p>
                    </div>
                </div>

                <Cart cart={cart} addToCart={addToCart} clearCart={() => clearCart()} removeFromCart={removeFromCart} setStateModal={setStateModal} stateModal={stateModal} />
            </div>

            <section className="productosRecomendadosContainer">
                <div className="productsRecomended">
                    <h2>Productos Relacionados</h2>
                    <div className="productosRecomendados">
                        <ResponsiveCarousel />
                    </div>
                </div>
            </section>
            <div className="otrosProductos">
                <h2>Otros productos</h2>
                <div className="otrosProductosContainer">
                    <ResponsiveCarouselProd />
                </div>
            </div>
            <Footer />
        </CartProvider >
    )
}
