import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import FirebaseStudentService from "../../../services/FirebaseStudentService";

const StudentTableRow = (props) => {
  const { _id, name, course, ira } = props.student;
  
  function deleteStudent () {
    /*if (window.confirm(`Deseja excluir o Professor de ID: ${_id}?`)) {
      axios.delete(`http://localhost:3002/students/delete/${_id}`)
      .then(res => props.deleteStudentById(_id))
      .catch(error=>console.log(error))*/
      FirebaseStudentService.delete(
        props.firestore,
        (ok)=>{
            if (ok) console.log('Apagado com sucesso!')
        },
        _id
    )
    }
  
  return (
    <tr>
      <td>{_id}</td>
      <td>{name}</td>
      <td>{course}</td>
      <td>{ira}</td>
      <td>
        <Link to={`/editStudent/${_id}`} className="btn btn-warning">
          Editar
        </Link>
      </td>
      <td>
        <button className="btn btn-danger" onClick={()=>deleteStudent()}>Apagar</button>
        
      </td>

    </tr>
  );
};
export default StudentTableRow;
