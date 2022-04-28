import React from "react";

const IMC = (props) => {
    function calcularImc(altura, peso) {
        return peso/(altura*altura)
        
    }
    function resultadoImc (imc) {
        if (imc < 17) {
            return (
                <h2>Seu IMC está muito abaixo do peso</h2>
            )
        }if (imc >= 17 && imc < 18.50) {
            return (
                <h2>Seu IMC está abaixo do peso.</h2>
            )
        }if (imc >= 18.50 && imc < 25) {
            return (
                <h2>Seu IMC está ideial.</h2>
            )
        }if (imc >= 17 && imc < 18,50) {
            return (
                <h2>Seu IMC está abaixo do peso.</h2>
            )
        }
            
        
    }

    const {altura, peso} = props
    const imc = calcularImc(altura, peso)
    return (
        <div>
            <h2>Minha altura é {altura} e meu peso é {peso} </h2>
            <h2>Meu IMC é {imc}</h2>
            {resultadoImc(imc)}
        </div>
       
    )
}

export default IMC;