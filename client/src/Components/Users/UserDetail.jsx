import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function UserDetail({ ...props }) {
    const location = useLocation();

    const idLocation = location.state.value;
    const [detailUser, setDetailUser] = useState(null);

    useEffect(() => {
        getData();
    },[])

    const getData = async () => {
        let response = await axios.get('http://localhost:4000/user/api/detailUser/' + idLocation)
            .then(function (response) {
                setDetailUser(response.data);
            })
            .catch((error) => {
                console.error('No se pudo conectar a la Api' + error);
            });
        return response;
    }

    return (
        <>
            {detailUser && detailUser.users.name}
        </>
    )
}

export default UserDetail;