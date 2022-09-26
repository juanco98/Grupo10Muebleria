import React, { useEffect, useState } from "react";
import MuebleriaEndpoints from "../../Utils/Helper";
import Category from "./Subcomponents/Category";
import MovieImage from "../../Assets/images/mandalorian.jpg";


function CategoriesInDb() {

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        // getData();
    }, [])

    // const getData = async () => {
    //     await MuebleriaEndpoints.Categorias.getCategorias().then(response => {
    //         console.log('test', response.data);
    //         setGenres(response.data)
    //     });
    // }

    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Categorias en Base de datos</h5>
                </div>
                {/* <div className="card-body body_del_genero">
                    <div className="row">
                        {
                            genres.map((genre, i) => <Category key={genre.name + i} genreName={genre.name} />)
                        }
                    </div>
                </div> */}
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: "40rem" }} src={MovieImage} alt=" Star Wars - Mandalorian " />
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, consequatur explicabo officia inventore libero veritatis iure voluptate reiciendis a magnam, vitae, aperiam voluptatum non corporis quae dolorem culpa citationem ratione aperiam voluptatum non corporis ratione aperiam voluptatum quae dolorem culpa ratione aperiam voluptatum?</p>
                    {/* <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View movie detail</a> */}
                </div>
            </div>
        </div>
    )
}

export default CategoriesInDb;