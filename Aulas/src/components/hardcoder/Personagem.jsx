import React from "react";

const Personagem = (props) => {
    return (
        <div>
            <h2>O personagem {props.nome} pertence a casa {props.casa}</h2>
        </div>
    )

}

export default Personagem;