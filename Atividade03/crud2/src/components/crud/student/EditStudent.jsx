import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


const EditStudent = () => {

    const [name, setName] = useState("");
    const [course, setCourse] = useState("");
    const [ira, setIra] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()

        const updStud = {name,course,ira};
        axios.put('http://localhost:3002/students/update/'+ params.id, updStud)
        .then(
            (res) => { console.log(res.data._id)
            navigate('/liststudent')}
        )
        .catch(
            (err)=>{console.log(err)}
        )
        
        }
    

    const params = useParams();

    useEffect(() => {

        axios.get('http://localhost:3002/students/retrieve/'+ params.id)
            .then(
                 (res) => {
                        setName(res.data.name)
                        setCourse(res.data.course)
                        setIra(res.data.ira)
                    }
                )
                .catch(
                    (error) => {
                        console.log(error)
                    }
                )
    },
    [params._id]
    )


    return (
        <div>
            <h2>Editar estudante</h2>
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
                        value="Editar Estudante"
                        className="btn btn-success" />
                </div>
            </form>
        </div>
    )
}


export default EditStudent;