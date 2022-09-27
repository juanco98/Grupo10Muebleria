import React, { useEffect, useState } from "react";
import axios from "axios";
import TableCategories from "./TableCategories";


function CategoriesInDb() {

    const [categories, setcategories] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        let response = await axios.get('http://localhost:4000/category/api/allCategories')
            .then(function (response) {
                setcategories(response.data.categories);
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
                    <h5 className="m-0 font-weight-bold text-gray-800">Tabla de categorias</h5>
                </div>
                <div className="card-body-juancho">
                    <TableCategories
                        categories={categories}
                    />
                </div>
            </div>
        </div>
    )
}

export default CategoriesInDb;