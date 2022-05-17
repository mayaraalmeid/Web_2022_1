import React from "react";
import { Link, resolvePath } from "react-router-dom";
import axios from "axios";

const ProfessorTableRow = (props) => {
  const { _id, name, university, degree } = props.professor;
 
  function deleteProfessor () {
    if (window.confirm(`Deseja excluir o Professor de ID: ${_id}?`)) {
      axios.delete(`http://localhost:3002/professors/delete/${_id}`)
      .then(res => props.deleteProfessorById(_id))
      .catch(error=>console.log(error))
  }
}
 
  return (
    <tr>
      <td>{_id}</td>
      <td>{name}</td>
      <td>{university}</td>
      <td>{degree}</td>
      <td>
        <Link to={`/editProfessor/${_id}`} className="btn btn-warning">
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
