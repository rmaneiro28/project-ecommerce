import styled from "styled-components"
import React, { useEffect, useState } from "react";
import { toast } from 'sonner';
import { orders } from "../data/db.json";
import { clientes } from "../data/db.json";
import moment from "moment";
import "../context/cart";
import { helpFetch } from "../helpers/helpFetch";
export function Modal({ children, stateModal, setStateModal, cart, clearCart }) {
    const API = helpFetch();
    const [ventas, setVentas] = useState(orders);
    const [customers, setCustomers] = useState({
        id_cliente: 0,
        nombre_cliente: "",
        telf: "",
        estado: ""
    });



    useEffect(() => {
        API.get("/orders").then((res) => {
            if (res.error) {
                toast.error(res.error);
            } else if (!res.error) {
                setVentas(res)
            };
        });
    }, [])

    useEffect(() => {
        API.get("/clientes").then((response) => {
            if (response.error) {
                toast.error(response.error);
            } else if (!response.error) {
                setCustomers(response);
            };
        });
    }, []);

    const addVentas = (venta) => {
        const options = {
            body: venta,
        }

        const options2 = {
            body: customers,
        }


        if (cart.length === 0) {
            toast.error("No hay productos en el carrito, agrega alguno antes de finalizar la compra");
            return;
        }


        for (let i = 0; i < customers.length; i++) {
            if (customers[i].telf === venta.telf) {
                toast.error("El cliente ya existe");
                return;
            }
        }


        const total = cart.reduce((acc, product) => acc + product.price * product.cantidad, 0);

        API.post("/clientes", options2)
            .then(
                (response) => {
                    console.log(response);
                    if (response.error) {
                        toast.error(response.error);
                    } else {
                        setCustomers([...customers, response]);
                    }
                });

        API.post("/orders", options)
            .then(
                (response) => {
                    if (response.error) {
                        toast.error(response.error);
                    } else {

                        setVentas([...ventas, response]);
                        setCustomers([...customers, response]);
                        toast.success("Gracias por su compra");
                        let message = `Buen día Sr. Rúvel soy ${response.nombre_cliente}, le escribo desde su página web de Oterventas!. Estoy interesado en los siguientes productos: %0A${cart.map(product => product.cantidad + ' ' + product.product + ' (ID: ' + product.id + ') - $' + product.cantidad * product.price).join('%0A')} %0A%0A*Total:* $${total} `;
                        const number = "+584166124494";
                        location.href = "http://wa.me/" + number + "?text=" + message;
                        localStorage.removeItem("cart");
                    }
                });
    };

    function formatNumber(orders) {
        let orderLength = orders.length + 1;
        let prepended_out = String(orderLength).padStart(4, '0');
        return 'NE-' + prepended_out
    }

    const [formData, setFormData] = useState({
        id: orders.length + 1,
        nombre_cliente: '',
        orden: formatNumber(orders),
        telf: '',
        estado: '',
        fecha_orden: moment().format("DD-MM-YYYY"),
        products: cart.map((product) => {
            return {
                id: product.id,
                nombre_producto: product.product,
                cant: product.cantidad,
                stock: product.stock,
                precio: product.price,
                precioTotal: product.price * product.cantidad
            }
        })
    })

    const [customerData, setCustomerData] = useState({
        id: customers.length + 1,
        nombre_cliente: '',
        telf: '',
        estado: ''
    })


    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
        setCustomerData({
            ...customerData,
            [event.target.name]: event.target.value
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.nombre_cliente === "" || formData.telf === "" || formData.estado === "") {
            toast.error("Por favor rellene todos los campos");
        }
        else {
            setVentas([...ventas, formData]);

            formData.products = cart.map((product) => {
                return {
                    id: product.id,
                    nombre_producto: product.product,
                    cant: product.cantidad,
                    stock: product.stock,
                    precio: product.price,
                    precioTotal: product.price * product.cantidad
                }
            })

            customerData.id = customers.length + 1;
            customerData.nombre_cliente = formData.nombre_cliente;
            customerData.telf = formData.telf;
            customerData.estado = formData.est;

            setCustomers([...customers, customerData]);
            addVentas(formData, customerData);
        }
    }
    return (
        <>
            {stateModal && (
                <Overlay>
                    <ContenedorModal >
                        <BotonCerrar onClick={() => setStateModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" className="bi bi-x" viewBox="0 0 21 21">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                            </svg>
                        </BotonCerrar>
                        {children}
                        <form onSubmit={handleSubmit} >
                            <div className="form-group">
                                <label htmlFor="inputName">Nombre</label>
                                <input type="text" className="form-control" id="inputName" aria-describedby="nameHelp" name="nombre_cliente" onChange={handleChange} placeholder="Ingrese su nombre" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputTelf">Teléfono</label>
                                <input type="text" className="form-control" name="telf" onChange={handleChange} id="inputTelf" placeholder="Ingrese su número de teléfono" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputEstado">Estado</label>
                                <input list="estado" onChange={handleChange} name="estado" className="form-control" id="inputEstado" placeholder="Ingrese su estado" required />
                                <datalist id="estado">
                                    <option value="Amazonas" />
                                    <option value="Anzoátegui" />
                                    <option value="Apure" />
                                    <option value="Aragua" />
                                    <option value="Barinas" />
                                    <option value="Bolívar" />
                                    <option value="Carabobo" />
                                    <option value="Cojedes" />
                                    <option value="Delta Amacuro" />
                                    <option value="Dependencias Federales" />
                                    <option value="Distrito Capital" />
                                    <option value="Falcón" />
                                    <option value="Guárico" />
                                    <option value="Lara" />
                                    <option value="Mérida" />
                                    <option value="Miranda" />
                                    <option value="Monagas" />
                                    <option value="Nueva Esparta" />
                                    <option value="Portuguesa" />
                                    <option value="Sucre" />
                                    <option value="Táchira" />
                                    <option value="Trujillo" />
                                    <option value="Vargas" />
                                    <option value="Yaracuy" />
                                    <option value="Zulia" />
                                </datalist>
                            </div>
                            <div className="form-group">
                                <hr />
                                <p>Cantidad de productos: <b>{cart.reduce((acc, product) => acc + product.cantidad, 0)}</b></p>
                                <p>Total: <b>${cart.reduce((acc, product) => acc + product.price * product.cantidad, 0)}.00</b></p>
                            </div>
                            <button type="submit" className="btnPrimary">CONFIRMAR COMPRA</button>
                        </form>
                    </ContenedorModal>
                </Overlay >
            )
            }

        </>

    )
}

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
`;
const ContenedorModal = styled.div`
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
    width: 90%;
    max-width: 400px;
    min-height: 100px;
    text-align: left;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    #bfdeff
    `;

const BotonCerrar = styled.button`
    position: absolute;
    top: 20px;
    right: 30px;

    width: 40px;
    height: 40px;
    border: none;
    outline: none;
    cursor: pointer;
    transition: 0.3s ease all;
    border-radius: 5px;
    color: #1766dc;
    &:hover {
    background - color: #f2f2f2;
    transform: scale(1.1);
    }
    &:focus {
    border: none;
    outline: none;
    }
    svg {
    width: 26px;
    height: 26px;
    color: #1766dc;
    fill: #1766dc;

    }
    `;

export default Modal