import { Header } from './Header';
import { Cart } from './Cart';
import { Products } from './Products';
import { Filters } from './Filters';
import { useCart } from '../hooks/useCart';
import { useState } from 'react';
import "./Products.jsx";
import Modal from './Modal';
import { Productos } from '../data/data.js';
export function Home() {
    const { cart, addToCart, removeFromCart, clearCart } = useCart();
    const [stateModal, setStateModal] = useState(false);
    return (
        <div className='container'>
            <Header />
            <Cart cart={cart} addToCart={addToCart} clearCart={clearCart} removeFromCart={removeFromCart} setStateModal={setStateModal} stateModal={stateModal} />
            <div className="hero">
                <Filters />
                <Products cart={cart} />
            </div>
            <Modal stateModal={stateModal} setStateModal={setStateModal} cart={cart} />
        </div>
    )
}
