import React, {useState, useEffect} from "react";
//import { students } from "./data";
import StudentTableRow from "./StudentTableRow";
import axios from "axios";


const ListStudent = () => {

    const [students, setStudents] = useState([]);

    useEffect (
        ()=> {
            axios.get('http://192.168.1.9:3001/students')
            .then(
                (res) => {
                    setStudents(res.data)
                }
            )
            .catch(
                (error) => {
                    console.log(error)
                }
            )
        },
        []
    );

    function deleteStudentById(id){
        let studentsTemp = students
        for(let i=0;i<studentsTemp.length;i++){
            if(studentsTemp[i].id === id){
                studentsTemp.splice(i,1)
            }
        }
        setStudents([...studentsTemp]) 
    }


    const generateTable = () => {
        if (!students) return;
        return students.map((student, i) => {
            return <StudentTableRow student={student} key={i} deleteStudentById={deleteStudentById}/>;
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

export default ListStudent;