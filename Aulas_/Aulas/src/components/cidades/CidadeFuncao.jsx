import React, {useState} from "react";

const Cidade = () => {
    const [fortal, setFotal] = useState(0);
    const [quixa, setQuixa] = useState(0);
    const [banabas, setBanabas] = useState(0);
    return (
        <div>
            <h2>Fortaleza: {fortal} </h2>
            <h2>Quixadá: {quixa}</h2>
            <h2>Banabuiú: {banabas}</h2>
            <button onClick={() => setFotal(fortal+1)}>Votar em Fortaleza</button>
            <button onClick={() => setQuixa(quixa+1)}>Votar em Quixadá</button>
            <button onClick={() => setBanabas(banabas+1)}>Votar em Banabuiú</button>
        </div>
    )
}

export default Cidade;