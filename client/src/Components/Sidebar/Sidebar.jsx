import React from "react";
import { useHistory } from "react-router-dom";
import Logo from "../../Assets/images/logo-DH.png";

function Sidebar() {
    const history = useHistory();

    return (
        <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

            {/* <!-- Sidebar - Brand --> */}
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                <div className="sidebar-brand-icon">
                    <img className="w-100" src={Logo} alt="MuebleriaDH" />
                </div>
            </a>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />

            {/* <!-- Nav Item - Dashboard --> */}
            <li className="nav-item active">
                <a className="nav-link" href="/">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard - DH movies</span></a>
            </li>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider" />

            {/* <!-- Heading --> */}
            <div className="sidebar-heading">Tablas</div>

            {/* <!-- Nav Item - Pages --> */}
            <li className="nav-item" onClick={() => history.push('/productos')}>
                <a className="nav-link collapsed">
                    <i className="fas fa-fw fa-folder"></i>
                    <span>Productos</span></a>
            </li>

            {/* <!-- Nav Item - Charts --> */}
            <li className="nav-item" onClick={() => history.push('/usuarios')}>
                <a className="nav-link">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Usuarios</span></a>
            </li>

            {/* <!-- Nav Item - Tables --> */}
            <li className="nav-item" onClick={() => history.push('/categorias')}>
                <a className="nav-link" >
                    <i className="fas fa-fw fa-table"></i>
                    <span>Categorias</span></a>
            </li>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider d-none d-md-block" />
        </ul>
    )
}

export default Sidebar;