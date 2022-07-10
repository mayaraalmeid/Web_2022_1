import React, { useState } from "react";
import { Link, resolvePath } from "react-router-dom";
import axios from "axios";

import FirebaseProfessorService from "../../../services/FirebaseProfessorService";

const ProfessorTableRow = (props) => {
  const { _id, name, university, degree } = props.professor;
  const [loading, setLoading] = useState(false);
 
  function deleteProfessor () {
    setLoading(true)
    if (window.confirm(`Deseja excluir o Professor de ID: ${_id}?`)) {
     /* axios.delete(`http://localhost:3002/professors/delete/${_id}`)
      .then(res => props.deleteProfessorById(_id))
      .catch(error=>console.log(error))*/
      FirebaseProfessorService.delete(
        props.firestore,
        ()=>{
          setLoading(false)
          props.setToast({ header: 'Atenção!', body: 'Professor ' + _id + ' apagado com sucesso!' })
          props.setShowToast(true)
        },
        _id
      )
      }
}
const renderSubmitBtn = () => {
  if (loading) {
      return (
          <div>
              <button className="btn btn-danger" type="button" disabled>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span>Carregando...</span>
              </button>
          </div>
      )
  }
  return (
      <>
          <button className="btn btn-danger"  onClick={() => deleteProfessor()}>Apagar</button>
      </>
  )
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
       {renderSubmitBtn()}   
      </td>

    </tr>
  );
};
export default ProfessorTableRow;
