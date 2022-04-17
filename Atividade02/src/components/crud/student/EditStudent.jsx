import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { students } from "./data";


const EditStudent = () => {
    const [name, setName] = useState("");
    const [course, setCourse] = useState("");
    const [ira, setIra] = useState(0);

    const handleSubmit = (event) => {
        alert(`Nome: ${name} \nCurso: ${course}\nIRA: ${ira}`);
    }

    const params = useParams();

    useEffect (() => {
        const student = students[params.id];
        setName(student.name);
        setCourse(student.course);
        setIra(student.ira);
    }
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
                <div className="form-group" style={{ paddingTop:8 }} >
                    <input type="submit" 
                    value="Editar Estudante"
                    className="btn btn-success"/>
                </div>
            </form>
        </div>
    )
}


export default EditStudent;