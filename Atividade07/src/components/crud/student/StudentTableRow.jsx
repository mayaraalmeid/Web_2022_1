import React , { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import FirebaseStudentService from "../../../services/FirebaseStudentService";

const StudentTableRow = (props) => {
  const { _id, name, course, ira } = props.student;
  const [loading, setLoading] = useState(false);
  
  function deleteStudent () {
    setLoading(true)
    if (window.confirm(`Deseja excluir o Professor de ID: ${_id}?`)) {
     /* axios.delete(`http://localhost:3002/students/delete/${_id}`)
      .then(res => props.deleteStudentById(_id))
      .catch(error=>console.log(error))*/
      FirebaseStudentService.delete(
        props.firestore,
        ()=>{
          setLoading(false)
          props.setToast({ header: 'Atenção!', body: 'Estudante ' + _id + ' apagado com sucesso!' })
          props.setShowToast(true)
        },
        _id
    )
    }
  }

  const renderSubmitBtn = () => {
    if (loading) {
        return (
            <div >
                <button className="btn btn-danger" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span>Carregando...</span>
                </button>
            </div>
        )
    }
    return (
        <>
            <button className="btn btn-danger"  onClick={() => deleteStudent()}>Apagar</button>
        </>
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
       {renderSubmitBtn()}
        
      </td>

    </tr>
  );
};
export default StudentTableRow;
