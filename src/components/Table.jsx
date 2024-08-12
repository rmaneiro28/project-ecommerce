import { orders } from "../data/db.json";
export function Table() {
    return (
        <div>
            <table>
                <thead>
                    <td>Número de orden</td>
                    <td>Id venta</td>
                    <td>Cliente</td>
                    <td>Fecha</td>
                    <td>Cantidad</td>
                    <td>Productos</td>
                    <td>Precio</td>
                    <td>Ubicacion</td>
                </thead>
                {orders.length === 0 ? <tr><td>No hay Ventas</td></tr> : orders.map((order) => {
                    return (
                        <tbody key={order.id}>
                            <td>{order.orden}</td>
                            <td>{order.id}</td>
                            <td>{order.nombre_cliente}</td>
                            <td>{order.fecha_orden}</td>
                            <td>{order.products.length}</td>
                            <td>
                                {order.products.map(product => {
                                    return (<td key={product.id}>{product.nombre_producto}</td>)
                                })}
                            </td>
                            <td>
                                {"$" + order.products.reduce(
                                    (acc, product) => acc + product.precioTotal, 0).toFixed(2)}
                            </td>
                            <td>{order.estado}</td>
                        </tbody>
                    );
                })}
            </table>
        </div>
    )
}