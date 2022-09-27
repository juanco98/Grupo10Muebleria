import { useState } from "react";

function ListProduct({...props}) {
    const [items, setItems] = useState(props.datas)
    return items.map((item) => <li key={item}>{item}</li>);
}

export default ListProduct;