import { useState } from "react";

function auth() {
    let formData = new FormData();
    formData.append("user", 'max');
    formData.append("password", "5ae3412b7f5b51797dd68acafa720272")
    fetch(
        "http://localhost:5000/api/auth",
        {
            body: formData,
            method: "post",
            origin: "localhost:3000",
            mode: "no-cors",
        })
}

function getMatprakPlusnikData() {
    auth();
    const [x, setX] = useState({});
    fetch("http://localhost:5000/api/marks/plusnik").then(res => {return res.json();}).then(data => {
        setX(data)
    });
    return x;
    
}

export { getMatprakPlusnikData, auth };