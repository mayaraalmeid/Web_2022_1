import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import FirebaseStudentService from "../../../services/FirebaseStudentService";
import FirebaseContext from "../../../utils/FirebaseContext";

const CreateStudentPage = () =>
    <FirebaseContext.Consumer>
        {firebase => <CreateStudent firebase={firebase} />}
    </FirebaseContext.Consumer>


const CreateStudent = (props) => {
    const [name, setName] = useState("");
    const [course, setCourse] = useState("");
    const [ira, setIra] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()

        const newStud = { name, course, ira };

        /* axios.post('http://localhost:3002/students/create', newStud)
         .then(
             (res) => { console.log(res.data._id)
             navigate('/liststudent')}
         )
         .catch(
             (err)=>{console.log(err)}
         )*/
        FirebaseStudentService.create(
            props.firebase.getFirestoreDb(),
            (_id) => {
                alert(`Aluno ${name} criado com sucesso com id ${_id}.`)
                navigate("/listStudent")
            },
            newStud
        )
    }


    return (
        <div>
            <h2>Criar estudante</h2>
            <form onSubmit={handleSubmit} >
                <div className="form-group">
                    <label>Nome:</label>
                    <input className="form-control"
                        type="text"
                        name="name"
                        value={name ?? ""}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Curso:</label>
                    <input className="form-control"
                        type="text"
                        name="course"
                        value={course ?? ""}
                        onChange={(event) => setCourse(event.target.value)} />
                </div>
                <div className="form-group">
                    <label>IRA:</label>
                    <input className="form-control"
                        type="number"
                        name="ira"
                        value={ira ?? 0}
                        onChange={(event) => setIra(event.target.value)} />
                </div>
                <div className="form-group" style={{ paddingTop: 8 }} >
                    <input type="submit"
                        value="Criar Estudante"
                        className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default CreateStudentPage;