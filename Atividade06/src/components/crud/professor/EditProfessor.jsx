import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import FirebaseProfessorService from "../../../services/FirebaseProfessorService";
import FirebaseContext from "../../../utils/FirebaseContext";

const EditProfessorPage = () =>
<FirebaseContext.Consumer>
    { firebase => <EditProfessor firebase={firebase}/>}
</FirebaseContext.Consumer>


const EditProfessor = (props) => {
        const [name, setName] = useState("");
        const [university, setUniversity] = useState("");
        const [degree, setDegree] = useState("");
        const navigate = useNavigate();
    
        const handleSubmit = (event) => {
            event.preventDefault()

            const updProf = {name,university,degree};
            /*axios.put('http://localhost:3002/professors/update/'+ params.id, updProf)
            .then(
                (res) => { console.log(res.data.id)
                navigate('/listprofessor')}
            )
            .catch(
                (err)=>{console.log(err)}
            )*/
            FirebaseProfessorService.update(
                props.firebase.getFirestoreDb(),
                (ok)=>{
                    if(ok) navigate("/listProfessor")
                },
                params.id,
                updProf
            )
        }
    
        const params = useParams();

        useEffect (() => {


        /*axios.get('http://localhost:3002/professors/retrieve/'+ params.id)
            .then(
                 (res) => {
                        setName(res.data.name)
                        setUniversity(res.data.university)
                        setDegree(res.data.degree)
                    }
                )
                .catch(
                    (error) => {
                        console.log(error)
                    }
                )*/
                FirebaseProfessorService.retrieve(
                    props.firebase.getFirestoreDb(),
                    (data) => {
                        setName(data.name)
                        setUniversity(data.university)
                        setDegree(data.degree)
                    },
                    params.id
                )
            
    },
    [params._id]
    
    )
    
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
                        value="Editar Professor"
                        className="btn btn-success"/>
                    </div>
                </form>
            </div>
        )
}

export default EditProfessorPage;