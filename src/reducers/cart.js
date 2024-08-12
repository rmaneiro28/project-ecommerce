import { toast } from "sonner";
import { Orders, Productos } from "../data/data";
import { useState } from "react";

export const cartInitialState = JSON.parse(window.localStorage.getItem("cart")) || [];

export const CART_ACTION_TYPES = {
    ADD_TO_CART: "ADD_TO_CART",
    REMOVE_FROM_CART: "REMOVE_FROM_CART",
    CLEAR_CART: "CLEAR_CART"
}
export const cartReducer = (state, action, product) => {
    const orders = Orders;
    const products = Productos.products
    let inventario = [];
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

        const quantitySell = inventario.filter((item) => item.name === product.product)[0].ventas;
        console.log(quantitySell)
        return quantitySell
    })
    //update LocalStorage
    const updateLocalStorage = (cart) => {
        window.localStorage.setItem("cart", JSON.stringify(cart));
    }

    const { type: actionType, payload: actionPayload } = action;
    switch (actionType) {
        case CART_ACTION_TYPES.ADD_TO_CART: {
            const { id } = actionPayload;
            const productInCartIndex = state.findIndex(item => item.id === id);
            const quantitySell = inventario.filter((item) => item.id === id)[0].ventas;
            if (productInCartIndex >= 0) {
                const newState = structuredClone(state);
                if ((newState[productInCartIndex].stock - quantitySell) === 2) {
                    toast.error('Alerta: Última unidad de ' + newState[productInCartIndex].product)
                        newState[productInCartIndex].cantidad += 1;
                        newState[productInCartIndex].stock -= 1;
                        updateLocalStorage(newState);
                    return newState;
                } else if ((newState[productInCartIndex].stock - quantitySell) <= 0) {
                        toast.error('Sin stock de ' + newState[productInCartIndex].product)
                        return [...state];
                    }
                else {
                        newState[productInCartIndex].cantidad += 1;
                        newState[productInCartIndex].stock -= 1;
                        updateLocalStorage(newState);
                        toast.success("Producto agregado al carrito");
                        return newState;
                    }
            }
            const newState = [
                ...state,
                {
                    ...actionPayload,
                    cantidad: 1,
                    stock: actionPayload.stock - 1
                }
            ];
            updateLocalStorage(newState);
            return newState;
        }

        case CART_ACTION_TYPES.REMOVE_FROM_CART: {
            const { id } = actionPayload;
            const productInCartIndex = state.findIndex(item => item.id === id);
            toast.success("Producto disminuido del carrito");
            if (productInCartIndex >= 0) {
                let newState = structuredClone(state);
                newState[productInCartIndex].cantidad -= 1;
                newState[productInCartIndex].stock += 1;
                
                if (newState[productInCartIndex].cantidad === 0) {
                    const newState = state.filter(item => item.id !== id);
                    updateLocalStorage(newState);
                    toast.error('Producto eliminado del carrito')
                    return newState;
                }
                return newState;
            }

            return state;
        }


        case CART_ACTION_TYPES.CLEAR_CART: {
            const newState = [];
            updateLocalStorage(newState);
            toast.success("Carrito vaciado");
            return newState;
        }
        default: {
            return state;
        }
    }
}