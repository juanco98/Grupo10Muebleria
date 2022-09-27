import axios from "axios";
import React, { useEffect, useState } from "react";
import TableProducts from "./TableProducts";

function LastProductInDB() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getData();
    }, []);


    const getData = async () => {
        let response = await axios.get('http://localhost:4000/products/api/allProducts')
            .then(function (response) {
                setProducts(response.data.products);
            })
            .catch((error) => {
                console.error('No se pudo conectar a la Api' + error);
            });
        return response;
    }

    return (
        <div className="col-lg-12 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Tabla de productos</h5>
                </div>
                <div className="card-body-juancho">
                    <TableProducts
                        products={products}
                    />
                </div>
            </div>
        </div>
    )
};
export default LastProductInDB;