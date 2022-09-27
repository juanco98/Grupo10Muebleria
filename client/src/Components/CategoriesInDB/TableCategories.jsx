import React, { useState } from "react";

function TableCategories({ ...props }) {

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col"># ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Sub-Categoria</th>
                </tr>
            </thead>
            <tbody>
            {props.categories.map((row, i) => {
                return (
                    <tr key={i}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>
                            {row.subCategories.map((sub, i) => 
                                <ul key={i}>
                                    <li>{sub.name}</li>
                                </ul>
                            )}
                        </td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
    )
}

export default TableCategories;