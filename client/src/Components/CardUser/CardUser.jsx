import React, { useState } from "react";
import './card-user.css'

function CardUser({...props}) {
    const [user, setUser] = useState(props.user)
    const urlImage = 'http://localhost:4000/images/users/';
    return (
        <div className="col-lg-12 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800"> {user.name} {user.last_name} </h5>
                </div>
                <div className="card-body-juancho">
                    <div className="left-side">
                        <img src={urlImage + user.avatar} alt={user.name} className='img-avatar' />
                    </div>
                    <div className="right-side">
                        <h3>Fecha de nacimiento</h3>
                        {user.born_date}
                        <hr />
                        <h3>Email</h3>
                        {user.email}
                        <hr />
                        <h3>Nombre de Usuario</h3>
                        {user.user}
                    </div>
                </div>
            </div>
        </div>
    )
};
export default CardUser;