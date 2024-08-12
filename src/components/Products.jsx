import "./../components/__products.scss";
import { Productos } from "./../data/data.js";
import { Orders } from "./../data/data.js";
import "../hooks/useFilters.js";
import "../hooks/useCart.js";
import AddProduct from "../assets/add-product.svg"
import { NavLink } from "react-router-dom";
import { useCart } from "../hooks/useCart.js";
import { CartProvider } from "../context/cart";
import { useState } from "react";
import Footer from "./Footer.jsx";

export function Products({ cart }) {
    const products = Productos.products
    const orders = Orders
    const { addToCart } = useCart();

    const checkProductInCart = product => {
        return cart.some(item => item.id === product.id);
    }

    const [inventario, setInventario] = useState([]);
    console.log(inventario);
    return (
        <CartProvider>
            <main className="products">
                <h2>Productos</h2>
                <div className="grid">
                    {products.filter((product) => {
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


                        let stockActual = product.stock - cantVendida.cant;
                        return stockActual > 0
                    }
                    ).map(
                        function getCategories(product) {
                            const isProductInCart = checkProductInCart(product)
                            const stockClasses = {
                                inStock: '',
                                lowStock: 'low-stock',
                                outOfStock: 'out-of-stock',
                            };


                            let cantVendida = {
                                id: Productos.products.id,
                                cant: 0,
                                products: ""
                            };

                            for (let i = 0; i < orders.length; i++) {
                                for (let j = 0; j < orders[i].products.length; j++) {
                                    if (orders[i].products[j].id === product.id) {
                                        cantVendida.products = orders[i].products[j].nombre_producto
                                        cantVendida.cant += orders[i].products[j].cant;
                                    }
                                }
                            }
                            let stockActual = product.stock - cantVendida.cant;
                            const stockStatus = stockActual > 0 ? (
                                stockActual < 10 ? 'lowStock' : 'inStock'
                            ) : 'outOfStock';
                            stockActual > 0


                            return (
                                <div key={product.id} className="product" category={product.category}>
                                    <NavLink to={`/products/${product.product}`} key={product.id} className="product-link">
                                        <header className="product-image">
                                            <img loading="lazy" src={product.image} alt={product.product} title={product.product} />
                                        </header>

                                        <footer className="product-footer">

                                            <div className="product-info">
                                                <h3 className="product-name"> {product.product} </h3>
                                                <p className={`product-stock ${stockClasses[stockStatus]}`}>
                                                    {stockActual} unidades disponibles
                                                </p>
                                            </div>

                                            <div className="product-price">
                                                <p> ${product.price} </p>
                                            </div>
                                        </footer>
                                    </NavLink>
                                    <button style={{ backgroundColor: isProductInCart ? '#D87400' : '#969696' }} className="addProducts" id={product.product} onClick={() => {
                                        addToCart(product);
                                    }}>
                                        {
                                            <img src={AddProduct} alt="" />
                                        }
                                    </button>

                                </div>

                            );
                        })}
                </div>
            </main >
            <Footer />
        </CartProvider>
    )
}