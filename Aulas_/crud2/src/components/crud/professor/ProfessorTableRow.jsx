import React from "react";
import { Link, resolvePath } from "react-router-dom";
import axios from "axios";

const ProfessorTableRow = (props) => {
  const { id, name, university, degree } = props.professor;
 
  function deleteProfessor () {
    if (window.confirm(`Deseja excluir o Professor de ID: ${id}?`)) {
      axios.delete(`http://192.168.1.9:3001/professors/${id}`)
      .then(res => props.deleteProfessorById(id))
      .catch(error=>console.log(error))
  }
}
 
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{university}</td>
      <td>{degree}</td>
      <td>
        <Link to={`/editProfessor/${id}`} className="btn btn-warning">
          Editar
        </Link>
      </td>
      <td>
        <button className="btn btn-danger" onClick={()=>deleteProfessor()}>Apagar</button>
        
      </td>

    </tr>
  );
};
export default ProfessorTableRow;
