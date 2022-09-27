import React, { useEffect, useState } from "react";
import ContentRowTop from "../../Components/ContentRowTop/ContentRowTop";
import axios from "axios";

function ContentWrapper() {

  const [productsQuant, setProductsQuant] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoriesQuant, setCategoriesQuant] = useState([]);
  const [usersQuant, setUsersQuant] = useState([]);

    useEffect(() => {

      getProducts();
      getCategories();
      getUsers();
    }, []);

    const getProducts = async () => {
        let response = await axios.get('http://localhost:4000/products/api/allProducts')
            .then(function (response) {
              setProductsQuant(response.data.quantity);
              setProducts(response.data.products);
            })
            .catch((error) => {
                console.error('No se pudo conectar a la Api' + error);
            });
        return response;
    }

    const getCategories = async () => {
      let response = await axios.get('http://localhost:4000/category/api/allCategories')
          .then(function (response) {
            setCategoriesQuant(response.data.quantity);
          })
          .catch((error) => {
              console.error('No se pudo conectar a la Api' + error);
          });
      return response;
    } 

    const getUsers = async () => {
      let response = await axios.get('http://localhost:4000/user/api/allUsers')
          .then(function (response) {
            setUsersQuant(response.data.quantity);
          })
          .catch((error) => {
              console.error('No se pudo conectar a la Api' + error);
          });
      return response;
  }

  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <ContentRowTop 
        products={products}
        productsQuant={productsQuant} 
        categoriesQuant={categoriesQuant}
        usersQuant={usersQuant}
      />
    </div>
  )
}
export default ContentWrapper;