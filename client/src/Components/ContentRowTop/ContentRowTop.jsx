import React from "react";
import TopInfo from "../TopInfo/TopInfo";


function ContentRowTop({ ...props }) {

	let lastProduct = props.products.pop(); // ultimo producto bbto

	const topData = [
		{
			title: "Usuarios registrados",
			borderColor: "border-left-primary",
			value: props.usersQuant ? props.usersQuant : 0,
			icon: "fa-film"
		},
		{
			title: "Cantidad de productos",
			borderColor: "border-left-success",
			value: props.productsQuant ? props.productsQuant : 0,
			icon: "fa-award"
		},
		{
			title: "Cantidad de categorias",
			borderColor: "border-left-warning",
			value: props.categoriesQuant ? props.categoriesQuant : 0,
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
					topData.map(function (element, i) {
						return <TopInfo key={element.title + i} data={element} />
					})
				}
			</div>

			{/* COPMONENTNE MEDIO PELO PARA ULTIMO PRODUCT BABY  ---> lastProduct */}
		</div>
	)
}

export default ContentRowTop;