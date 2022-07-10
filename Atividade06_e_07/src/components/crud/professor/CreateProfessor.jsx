import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import FirebaseProfessorService from "../../../services/FirebaseProfessorService";
import FirebaseContext from "../../../utils/FirebaseContext";
import RestrictPage from "../../../utils/RestrictPage";

const CreateProfessorPage = ({setShowToast,setToast}) =>
    <FirebaseContext.Consumer>
        {firebase => {
            return (
                <RestrictPage isLogged={firebase.getUser() != null}>
                    <CreateProfessor firebase={firebase} setShowToast={setShowToast} setToast={setToast} />
                </RestrictPage>
            )
        }
        }
    </FirebaseContext.Consumer>

const CreateProfessor = (props) => {
    const [name, setName] = useState("");
    const [university, setUniversity] = useState("");
    const [degree, setDegree] = useState("");
    const navigate = useNavigate();
    const [validate,setValidate] = useState({name:'',university:'',degree:''})
    const [loading, setLoading] = useState(false)



    const validateFields = () => {
        let res = true
        setValidate({name:'',university:'',degree:''})

        if(name === '' || university === '' || degree === ''){
            props.setToast({header:'Erro!',body:'Preencha todos os campos.'})
            props.setShowToast(true)
            setLoading(false)
            res = false
            let validateCad = {name:'',university:'',degree:''}
            if(name === '') validateCad.name = 'is-invalid'
            if(university === '') validateCad.university = 'is-invalid'
            if(degree === '') validateCad.degree = 'is-invalid'
            setValidate(validateCad)
        }

    
         
        return res
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(!validateFields())  return 
        const newProf = { name, university, degree };
        /*axios.post('http://localhost:3002/professors/create', newProf)
        .then(
            (res) => { console.log(res.data._id)
            navigate("/listProfessor")}
        )
        .catch(
            (err)=>{console.log(err)}
        )*/
        FirebaseProfessorService.create(
            props.firebase.getFirestoreDb(),
            (_id) => {
                alert(`Professor ${name} criado com sucesso com id ${_id}.`)
                navigate("/listProfessor")
            },
            newProf
        )
    }

    const renderSubmitBtn = () => {
        if (loading) {
            return (
                <div style={{ paddingTop: 10 }}>
                    <button className="btn btn-primary" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span style={{ marginLeft: 10 }}>Carregando...</span>
                    </button>
                </div>
            )
        }
        return (
            <>
                <div className="form-group" style={{ paddingTop: 10 }}>
                    <input type="submit" value="Criar Professor" className="btn btn-primary" />
                </div>
            </>
        )
    }


    return (
        <div>
            <h2>Criar Professor</h2>
            <form onSubmit={handleSubmit} >
                <div className="form-group">
                    <label>Nome:</label>
                    <input className={`form-control ${validate.name}`}
                        type="text"
                        name="name"
                        value={name ?? ""}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Universidade:</label>
                    <input className={`form-control ${validate.university}`}
                        type="text"
                        name="university"
                        value={university ?? ""}
                        onChange={(event) => setUniversity(event.target.value)} />
                </div>
                <div className="form-group">
                    <label>Titulação:</label>
                    <input className={`form-control ${validate.degree}`}
                        type="text"
                        name="degree"
                        value={degree ?? ""}
                        onChange={(event) => setDegree(event.target.value)} />
                </div>
            {renderSubmitBtn()}
            </form>
        </div>
    )
}

export default CreateProfessorPage;