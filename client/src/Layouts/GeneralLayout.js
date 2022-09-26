import { React } from "react";
import Footer from "../Components/Footer/Footer";
import Sidebar from "../Components/Sidebar/Sidebar";
import Topbar from "../Components/Topbar/Topbar";

export default function GeneralLayout({ children, ...props }) {

    const Children = children;

    return (
        <main>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="wrapper">
                    <Sidebar />
                    <div id="content">
                        <Topbar />
                        <Children />
                    </div>
                </div>
                <Footer />
            </div>
        </main>
    )
}