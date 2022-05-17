import React, {useState, useEffect} from "react";
//import { professores } from "./data";
import ProfessorTableRow from "./ProfessorTableRow";
import axios from "axios";

const ListProfessor = () => {

    const [professores, setProfessores] = useState([]);

    useEffect(
        ()=> {
            axios.get('http://localhost:3002/professors/list')
            .then(
                (res)=> {setProfessores(res.data)}
            )
            .catch(
                (err)=>{console.log(err)}
            )
        },[]
    );

    function deleteProfessorById(_id){
        let professorsTemp = professores
        for(let i=0;i<professorsTemp.length;i++){
            if(professorsTemp[i]._id === _id){ 
                professorsTemp.splice(i,1)
            }
        }
        setProfessores([...professorsTemp]) 
    }

    const generateTable = () => {
        if (!professores) return;
        return professores.map((professor, i) => {
            return <ProfessorTableRow professor={professor} key={i} deleteProfessorById={deleteProfessorById} />;
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