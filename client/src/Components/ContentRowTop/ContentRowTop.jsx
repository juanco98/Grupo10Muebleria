import React from "react";
import CategoriesInDb from "../CategoriesInDB/CategoriesInDB";
import LastProductInDB from "../LastProductInDB/LastProductInDB";
import TopInfo from "../TopInfo/TopInfo";


function ContentRowTop() {

	const moviesData = [
		{
			title: "Usuarios registrados",
			borderColor: "border-left-primary",
			value: 21,
			icon: "fa-film"
		},
		{
			title: "Cantidad de productos",
			borderColor: "border-left-success",
			value: 49,
			icon: "fa-award"
		},
		{
			title: "Cantidad de categorias",
			borderColor: "border-left-warning",
			value: 79,
			icon: "fa-user"
		}
	]

	return (
		<div className="container-fluid">
			<div className="d-sm-flex align-items-center justify-content-between mb-4">
				<h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
			</div>
			<div className="row">
				{
					moviesData.map(function (element, i) {
						return <TopInfo key={element.title + i} data={element} />
					})
				}
			</div>
			<div className="row">
				<LastProductInDB />
				<CategoriesInDb />
			</div>
		</div>
	)
}

export default ContentRowTop;