import React, { Component } from "react";

/*function MeusDados(props) {
    const {nome, cidade, curso} = props;
    return (
        <div>
            <h3>Nome: {nome}</h3>
            <h3>Curso: {curso}</h3>
            <h3>Cidade: {cidade}</h3>
        </div>
    )
    
}*/


/*const MeusDados = () => {
    return (
        <div>
            <h3>Nome: Mayara Almeida</h3>
            <h3>Curso: Redes De Computadores</h3>
            <h3>Cidade: Banabuiú</h3>
        </div>
    )
}

*/

class MeusDados extends Component {
    constructor (props){
        super (props)
    }
     
    render (){
            const {nome, curso, cidade} = this.props
        return (
            <div>
            <h3>Nome: {nome}</h3>
            <h3>Curso: {curso}</h3>
            <h3>Cidade: {cidade}</h3>
        </div>
        )
    }
}

export default MeusDados;