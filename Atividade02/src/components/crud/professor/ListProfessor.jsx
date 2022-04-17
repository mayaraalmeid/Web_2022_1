import React from "react";
import { professores } from "./data";
import ProfessorTableRow from "./ProfessorTableRow";

const ListProfessor = () => {
    const generateTable = () => {
        if (!professores) return;
        return professores.map((professor, i) => {
            return <ProfessorTableRow professor={professor} key={i} />;
    });
    } 

    return (
        <div>
            <h2>Listar Professor</h2>
            <table className="table table-success table-striped">
                <thead>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Universidade</th>
                    <th>Titulação</th>
                    <th colSpan="2"></th>
                </thead>
                <tbody>
                    {generateTable()}
                </tbody>
            </table>
        </div>
    )
}

export default ListProfessor;