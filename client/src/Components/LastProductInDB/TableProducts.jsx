import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

function TableProducts({ ...props }) {
    const history = useHistory();

    const goToDetail = (param) => {
        history.push({
            pathname: '/productDetail/' + param.id,
            state: { value: param.id }
        });
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col"># ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Modelo</th>
                    <th scope="col">Activo</th>
                    <th scope="col">Detalle</th>
                </tr>
            </thead>
            <tbody>
            {props.products.map((row, i) => {
                return (
                    <tr key={i}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.brand}</td>
                        <td>{row.models[0].name}</td>
                        <td>{row.active ? "Activo" : "Inactivo"}</td>
                        <td>
                            <>
                                <Button variant="info" onClick={() => goToDetail(row)}>Ver detalle</Button>
                            </>
                        </td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
    )
}

export default TableProducts;