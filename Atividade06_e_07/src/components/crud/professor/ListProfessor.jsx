import React, { useState, useEffect } from "react";
//import { professores } from "./data";
import ProfessorTableRow from "./ProfessorTableRow";
import axios from "axios";

import FirebaseProfessorService from "../../../services/FirebaseProfessorService";
import FirebaseContext from "../../../utils/FirebaseContext";
import RestrictPage from "../../../utils/RestrictPage";

const ListProfessorPage = ({ setShowToast, setToast }) =>
    <FirebaseContext.Consumer>
        {(firebase) => {
            return (
                <RestrictPage isLogged={firebase.getUser() != null}>
                    <ListProfessor firebase={firebase} setShowToast={setShowToast} setToast={setToast}/>
                </RestrictPage>
            )
        }}
    </FirebaseContext.Consumer>

const ListProfessor = (props) => {

    const [professores, setProfessores] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(
        () => {
            /* axios.get('http://localhost:3002/professors/list')
             .then(
                 (res)=> {setProfessores(res.data)}
             )
             .catch(
                 (err)=>{console.log(err)}
             )*/
            setLoading(true)
            FirebaseProfessorService.list_onSnapshot(
                props.firebase.getFirestoreDb(),
                (professores) => {
                    setProfessores(professores)
                    setLoading(false)
                }
            )
        }, []
    );

    function deleteProfessorById(_id) {
        let professorsTemp = professores
        for (let i = 0; i < professorsTemp.length; i++) {
            if (professorsTemp[i]._id === _id) {
                professorsTemp.splice(i, 1)
            }
        }
        setProfessores([...professorsTemp])
    }

    const generateTable = () => {
        if (loading) {
            return (
                <tr>
                    <td colSpan={5}>
                        <div class="text-center">
                            <div className="spinner-border text-dark" role="status"/>
                        </div>
                    </td>
                </tr>
            )
        }
        if (!professores) return;
        return professores.map((professor, i) => {
            return <ProfessorTableRow professor={professor} key={i} deleteProfessorById={deleteProfessorById}
                firestore={props.firebase.getFirestoreDb()} />;
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

export default ListProfessorPage;