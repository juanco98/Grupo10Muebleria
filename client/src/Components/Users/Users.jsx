import axios from "axios";
import React, { useEffect, useState } from "react";
import TableUsers from "./TableUsers";

function UsersInDB() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getData();
    }, []);


    const getData = async () => {
        let response = await axios.get('http://localhost:4000/user/api/allUsers')
            .then(function (response) {
                setUsers(response.data.users);
            })
            .catch((error) => {
                console.error('No se pudo conectar a la Api' + error);
            });
        return response;
    }

    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Tabla de usuarios</h5>
                </div>
                <div className="card-body-juancho">
                    <TableUsers
                        users={users}
                    />
                </div>
            </div>
        </div>
    )
};
export default UsersInDB;