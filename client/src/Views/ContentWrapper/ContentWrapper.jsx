import React, { useEffect, useState } from "react";
import MuebleriaEndpoints from "../../Utils/Helper";
import Topbar from "../../Components/Topbar/Topbar";
import Footer from "../../Components/Footer/Footer";
import ContentRowTop from "../../Components/ContentRowTop/ContentRowTop";
import Table from "../../Components/Table/Table";

function ContentWrapper() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {

    // getData();
  }, []);

  // const getData = async () => {
  //   await MuebleriaEndpoints.Productos.getProductos().then(response => {
  //     console.log('test', response.data);
  //     setMovies(response.data)
  //   });
  // }

  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <ContentRowTop />
    </div>
  )
}
export default ContentWrapper;