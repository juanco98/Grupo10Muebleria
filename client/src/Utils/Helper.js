import AuthService from "./AuthService";
const Auth = new AuthService();


const MuebleriaEndpoints = {

    Productos: {
        getProductos: function (params) {
            return Auth.get(get_products, params);
        },
    },
    Usuarios: {

    },
    Categorias: {
        getCategorias: function (params) {
            return Auth.get(get_categories, params);
        },
    }
}

//Productos
const products_endpoint = "products_controller/"; /// NOMBRE EN LA API DE LA RUTA
const get_products = products_endpoint + "getProducts/"; // NOMBRE DE LA FUNCION EN API DONDE TRAE LA INFO


//Categorias
const categories_endpoint = "categories_controller/"; /// NOMBRE EN LA API DE LA RUTA
const get_categories = categories_endpoint + "getCategories/"; // NOMBRE DE LA FUNCION EN API DONDE TRAE LA INFO


export default MuebleriaEndpoints;