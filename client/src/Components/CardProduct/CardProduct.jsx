import React, { useState } from "react";
import './card-product.css'
import ListProduct from "./LIstProduct";

function CardProduct({...props}) {
    const [product, setProduct] = useState(props.product)
    const [tittle, setTittle] = useState(props.tittle)
    const urlImage = 'http://localhost:4000/images/products/';
    return (
        <div className="col-lg-12 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800"> {tittle} {product.name} </h5>
                </div>
                <div className="card-body-juancho">
                    <div className="left-side">
                        <img src={urlImage + product.models[0].img} alt={product.models[0].name} className='img-product' />
                    </div>
                    <div className="data-side">
                        <div className="right-side-jc">
                            <div className="inside-right-side">
                                <h5>Marca</h5>
                                <h2>{product.brand}</h2>
                            </div>
                            <div className="inside-right-side">
                                <h5>Modelo</h5>
                                <h2>{product.models[0].name}</h2>
                            </div>
                            <div className="inside-right-side">
                                <h5>Precio</h5>
                                <h2>{product.models[0].prices[0].value}</h2>
                            </div>
                            <div className="inside-right-side">
                                <h5>Subcategoria</h5>
                                <h2>{product.subCategory.name}</h2>
                            </div>
                        </div>
                        <div className="data-desc">
                            <h5>Descripcion</h5>
                            <p>{product.models[0].description}</p>
                        </div>
                        <div className="list-prop-jc">
                            <div className="list-jc">
                                <div className="list-ind-jc">
                                    <h5>Maderas:</h5>
                                    <ul>
                                        <ListProduct datas={product.models[0].property.wood} />
                                    </ul>
                                </div>
                                <div className="list-ind-jc">
                                    <h5>Metales:</h5>
                                    <ul>
                                        <ListProduct datas={product.models[0].property.metal} />
                                    </ul>
                                </div>
                                <div className="list-ind-jc">
                                    <h5>Telas:</h5>
                                    <ul>
                                        <ListProduct datas={product.models[0].property.cloth} />
                                    </ul>
                                </div>
                                <div className="list-ind-jc">
                                    <h5>Otros:</h5>
                                    <ul>
                                        <ListProduct datas={product.models[0].property.other} />
                                    </ul>
                                </div>
                            </div>
                            <div className="list-jc">
                                <div className="list-ind-jc">
                                    <h5>Colores:</h5>
                                    <ul>
                                        <ListProduct datas={product.models[0].feature.colors} />
                                    </ul>
                                </div>
                            </div>
                            <div className="list-jc">
                                <div className="list-ind-jc">
                                    <h5>Alto:</h5>
                                    <p>
                                        {product.models[0].feature.height}
                                    </p>
                                </div>
                                <div className="list-ind-jc">
                                    <h5>Ancho:</h5>
                                    <p>
                                        {product.models[0].feature.width}
                                    </p>
                                </div>
                                <div className="list-ind-jc">
                                    <h5>Profundo:</h5>
                                    <p>
                                        {product.models[0].feature.deep}
                                    </p>
                                </div>
                                <div className="list-ind-jc">
                                    <h5>Peso:</h5>
                                    <p>
                                        {product.models[0].feature.weight}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default CardProduct;