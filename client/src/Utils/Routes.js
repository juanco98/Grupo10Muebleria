import React from "react";
import CategoriesInDb from "../Components/CategoriesInDB/CategoriesInDB";
import LastProductInDB from "../Components/LastProductInDB/LastProductInDB";
import UsersInDB from "../Components/Users/Users";
import GeneralLayout from "../Layouts/GeneralLayout";
import ContentWrapper from "../Views/ContentWrapper/ContentWrapper";

const PublicRoutes = [
    {
        path: "/",
        exact: true,
        label: 'Home',
        main: () => <GeneralLayout children={ContentWrapper} />
    },
    {
        path: "/categorias",
        exact: true,
        label: 'Categorias',
        main: () => <GeneralLayout children={CategoriesInDb} />
    },
    {
        path: "/productos",
        exact: true,
        label: 'Productos',
        main: () => <GeneralLayout children={LastProductInDB} />
    },
    {
        path: "/usuarios",
        exact: true,
        label: 'Usuarios',
        main: () => <GeneralLayout children={UsersInDB} />
    }
]
export default PublicRoutes;