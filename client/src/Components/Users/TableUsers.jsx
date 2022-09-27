import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

function TableUsers({ ...props }) {
    const history = useHistory();

    const goToDetail = (param) => {
        history.push({
            pathname: '/usersDetail/' + param.id,
            state: { value: param.id }
        });
    }

    //URL PARA IMAGENES DE USUARIOS
    const urlImage = 'http://localhost:4000/images/users/';

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col"># ID</th>
                    <th scope="col">Avatar</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Nacimiento</th>
                    <th scope="col">Email</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Detalle</th>
                </tr>
            </thead>
            <tbody>
            {props.users.map((row, i) => {
                return (
                    <tr key={i}>
                        <td>{row.id}</td>
                        <td>{row.avatar ? <img src={urlImage + row.avatar} width="50px" height="50px" /> : '-'}</td>
                        <td>{row.name}</td>
                        <td>{row.last_name}</td>
                        <td>{row.born_date}</td>
                        <td>{row.email}</td>
                        <td>{row.user}</td>
                        <td>{row.rol.name}</td>
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

export default TableUsers;