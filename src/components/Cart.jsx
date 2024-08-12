import "./../components/__cart.scss"
import CartIcon from "./CartIcon";
import "./../hooks/useCart.js";
import { useId, useState } from "react";
import { MenosIcon } from "./MenosIcon";
import { ClearIcon } from "./ClearIcon";
import { MasIcon } from "./MasIcon";
import { CartProvider } from "../context/cart";
import { Toaster, toast } from 'sonner';
import "../context/cart";
import { ExclamationIcon } from "./ExclamationIcon";
import { Orders, Productos } from "../data/data.js";
function CartItem({ inventario, product, price, stock, cantidad, addToCart, removeFromCart }) {
    const quantitySell = inventario.filter((item) => item.name === product)[0].ventas;
    return (
        <li className="cart-item" key={product} >
            <div className="item-details">
                <strong className="product-item">{product}</strong>
                <small className="stock"> {stock - quantitySell} unidades disponibles - ${price * cantidad}</small>
            </div>
            <footer>
                <button type="button" id="menos" onClick={() => removeFromCart(product)}>
                    {cantidad === 1 ? <ClearIcon /> : <MenosIcon />}
                </button>
                <span className="cantidad">{cantidad}</span>
                <button type="button" onClick={() => addToCart(product)}>
                    {stock - quantitySell <= 1 ? <ExclamationIcon /> : <MasIcon />}
                </button>
            </footer>
        </li>
    )
}

export function Cart({ cart, addToCart, clearCart, removeFromCart, setStateModal }) {
    const cartCheckBoxId = useId();
    function finalizarCompra() {
        if (cart.length > 0) {
            const total = cart.reduce((acc, product) => acc + product.price * product.cantidad, 0);

            console.log(JSON.stringify(cart));
            let message = `Buen día Sr. Rúvel, le escribo desde su página web de Oterventas!. Estoy interesado en los siguientes productos:* %0A${cart.map(product => product.cantidad + ' ' + product.product + ' - $' + product.cantidad * product.price).join('%0A')} %0A%0A*Total:* $${total} `;
            const number = "+584166124494";

            location.search = "http://wa.me/" + number + "?text=" + message;
        } else {
            toast.error("No hay productos en el carrito, agrega alguno antes de finalizar la compra");
        };
    }
    const orders = Orders;
    const products = Productos.products
    const [inventario, setInventario] = useState([]);
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
        let stockActual = product.stock - cantVendida.cant;
        inventario.push({
            id: cantVendida.id === undefined ? product.id : cantVendida.id,
            ventas: cantVendida.cant,
            inventarioActual: stockActual,
            name: cantVendida.products === undefined ? product.product : cantVendida.products
        })


    })
    return (
        <CartProvider>
            <div className="carrito-container">
                <Toaster className="toaster" expand={false} richColors position="bottom-left" />
                <label className="cart-button" htmlFor={cartCheckBoxId}>
                    <CartIcon />
                    <span>{cart.length}</span>
                </label>
                <input type="checkbox" id={cartCheckBoxId} hidden />

                <aside className="cart">
                    <div className="cart-info">
                        <h4>Carrito de compras
                        </h4>
                        <ul className="cart-items">
                            {cart.length === 0 ? <p>No hay productos en el carrito</p> : cart.map(product => {
                                return (
                                    <CartItem inventario={inventario}
                                        key={product.id}
                                        addToCart={() => addToCart(product)}
                                        {...product} removeFromCart={() => removeFromCart(product)}
                                    />
                                );
                            })}
                        </ul>
                    </div>

                    <div className="totalPrice">
                        <p className="totalPrice--title">TOTAL: </p>
                        <p className="totalPrice--price">${cart.reduce((acc, product) => acc + product.price * product.cantidad, 0)}</p>
                    </div>

                    <div className="cart-button-clear">
                        <button className="compra" onClick={cart.length === 0 ? () => toast.error("No hay productos en el carrito, agrega alguno antes de finalizar la compra") : () => setStateModal(true)}> CONFIRMAR COMPRA </button>

                        <button className="limpiar" onClick={() => clearCart()}>
                            LIMPIAR
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="21" height="21" >
                                <path
                                    d="M16 1.75V3h5.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75Zm-6.5 0V3h5V1.75a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25ZM4.997 6.178a.75.75 0 1 0-1.493.144L4.916 20.92a1.75 1.75 0 0 0 1.742 1.58h10.684a1.75 1.75 0 0 0 1.742-1.581l1.413-14.597a.75.75 0 0 0-1.494-.144l-1.412 14.596a.25.25 0 0 1-.249.226H6.658a.25.25 0 0 1-.249-.226L4.997 6.178Z" fill="#000">
                                </path>
                                <path
                                    d="M9.206 7.501a.75.75 0 0 1 .793.705l.5 8.5A.75.75 0 1 1 9 16.794l-.5-8.5a.75.75 0 0 1 .705-.793Zm6.293.793A.75.75 0 1 0 14 8.206l-.5 8.5a.75.75 0 0 0 1.498.088l.5-8.5Z" fill="#000">
                                </path>
                            </svg>
                        </button>
                    </div>
                </aside>
            </div >
        </CartProvider >
    );
}