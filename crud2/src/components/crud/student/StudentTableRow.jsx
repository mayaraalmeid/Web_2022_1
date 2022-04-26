import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const StudentTableRow = (props) => {
  const { id, name, course, ira } = props.student;
  
  function deleteStudent () {
    if (window.confirm(`Deseja excluir o Professor de ID: ${id}?`)) {
      axios.delete(`http://192.168.1.9:3001/students/${id}`)
      .then(res => props.deleteStudentById(id))
      .catch(error=>console.log(error))
    }
    
  }


  
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{course}</td>
      <td>{ira}</td>
      <td>
        <Link to={`/editStudent/${id}`} className="btn btn-warning">
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
