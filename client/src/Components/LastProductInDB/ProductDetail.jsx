import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CardProduct from "../CardProduct/CardProduct";

function ProducDetail({ ...props }) {
    const location = useLocation();

    const idLocation = location.state.value;
    const [detailProduct, setDetailProduct] = useState(null);

    useEffect(() => {
        getData();
    },[])

    const getData = async () => {
        let response = await axios.get('http://localhost:4000/products/api/detailProduct/' + idLocation)
            .then(function (response) {
                setDetailProduct(response.data.product);
            })
            .catch((error) => {
                console.error('No se pudo conectar a la Api' + error);
            });
        return response;
    }

    return (
        <>
            {detailProduct && 
                <CardProduct product={detailProduct} />
            }
        </>
    )
}

export default ProducDetail;