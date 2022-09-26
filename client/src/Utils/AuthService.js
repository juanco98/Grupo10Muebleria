import axios from 'axios';

export default class AuthService {

    constructor(domain) {
        this.domain = domain || process.env.REACT_APP_API_URI // API server url
    }

    get(url, params = false) {
        let uri = this.domain + url;
        let response = axios.get(uri, { params: params }) // ojo aca si falla ruta,, uri o url
            .then((responseJson) => {
                responseJson.data.duration = responseJson.duration;

                return responseJson.data;
            })
            .catch((error) => {
                console.error('No se pudo conectar a la Api' + error);
            });
        return response;
    }
};