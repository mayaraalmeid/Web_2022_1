import React, { useState, useEffect } from "react";
//import { students } from "./data";
import StudentTableRow from "./StudentTableRow";
import axios from "axios";

import FirebaseContext from "../../../utils/FirebaseContext";
import FirebaseStudentService from "../../../services/FirebaseStudentService";
import RestrictPage from "../../../utils/RestrictPage";

const ListStudentPage = ({ setShowToast, setToast }) =>
    <FirebaseContext.Consumer>
        {(firebase) => {
            return (
                <RestrictPage isLogged={firebase.getUser() != null}
                isEmailVerified={(firebase.getUser() != null)?firebase.getUser().emailVerified:false}
                auth={firebase.getAuthentication()}
                >
                <ListStudent firebase={firebase} />
                </RestrictPage>
            )
        }
        }
    </FirebaseContext.Consumer>

const ListStudent = (props) => {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(
        () => {
            /* axios.get('http://localhost:3002/students/list')
             .then(
                 (res) => {
                     setStudents(res.data)
                 }
             )
             .catch(
                 (error) => {
                     console.log(error)
                 }
             )*/
             setLoading(true)
            FirebaseStudentService.list_onSnapshot(
                props.firebase.getFirestoreDb(),
                (students) => {
                    setStudents(students)
                    setLoading(false)
                }
            )
        }, []
    );

    function deleteStudentById(_id) {
        let studentsTemp = students
        for (let i = 0; i < studentsTemp.length; i++) {
            if (studentsTemp[i]._id === _id) {
                studentsTemp.splice(i, 1)
            }
        }
        setStudents([...studentsTemp])
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
        if (!students) return;
        return students.map((student, i) => {
            return <StudentTableRow student={student} key={i} deleteStudentById={deleteStudentById}
                firestore={props.firebase.getFirestoreDb()} />;
        });
    }

    return (
        <div>
            <h2>Listar estudante</h2>
            <table className="table table-success table-striped">
                <thead>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Curso</th>
                    <th>IRA</th>
                    <th colSpan="2"></th>
                </thead>
                <tbody>
                    {generateTable()}
                </tbody>
            </table>
        </div>
    )
}

export default ListStudentPage;