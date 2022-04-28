import React, { Component } from 'react';

// States com classe;
class Cidade extends Component {
    constructor () {
        super ()
        this.state = {fortal: 0, quixa: 0, banabas: 0}

    }
    
    //let fortal = 0, quixa = 0, banabas = 0;
    render () {
    return (
        <div>
            <h2>Fortaleza: {this.state.fortal} </h2>
            <h2>Quixadá: {this.state.quixa}</h2>
            <h2>Banabuiú: {this.state.banabas}</h2>
            <button onClick={() => this.setState({fortal:this.state.fortal+1})}>Votar em Fortaleza</button>
            <button onClick={() => this.setState({quixa:this.state.quixa+1})}>Votar em Quixadá</button>
            <button onClick={() => this.setState({banabas:this.state.banabas+1})}>Votar em Banabuiú</button>
        </div>
    )
    }
}

export default Cidade;