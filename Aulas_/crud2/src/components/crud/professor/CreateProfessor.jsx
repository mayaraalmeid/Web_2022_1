import React, {useState} from "react";
import axios from 'axios';
import {useNavigate } from "react-router-dom";

const CreateProfessor = () => {
    const [name, setName] = useState("");
    const [university, setUniversity] = useState("");
    const [degree, setDegree] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()

        const newProf = {name,university,degree};
        axios.post('http://192.168.1.9:3001/professors', newProf)
        .then(
            (res) => { console.log(res.data.id)
            navigate("/listProfessor")}
        )
        .catch(
            (err)=>{console.log(err)}
        )
        
        }


    return (
        <div>
            <h2>Criar Professor</h2>
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
                    <label>Universidade:</label>
                    <input className="form-control"
                    type="text"
                    name="university"
                    value={university ?? ""}
                    onChange={(event) => setUniversity(event.target.value)} />
                </div>
                <div className="form-group">
                    <label>Titulação:</label>
                    <input className="form-control"
                    type="text"
                    name="degree" 
                    value={degree ?? ""}
                    onChange={(event) => setDegree(event.target.value)} />
                </div>
                <div className="form-group" style={{ paddingTop:8 }} >
                    <input type="submit" 
                    value="Criar Professor"
                    className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
}



export default CreateProfessor;