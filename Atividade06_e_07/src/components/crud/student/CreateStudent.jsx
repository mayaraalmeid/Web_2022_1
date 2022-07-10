import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import FirebaseStudentService from "../../../services/FirebaseStudentService";
import FirebaseContext from "../../../utils/FirebaseContext";
import RestrictPage from "../../../utils/RestrictPage";

const CreateStudentPage = ({setShowToast,setToast}) =>
    <FirebaseContext.Consumer>
        {firebase => {
            return (
                <RestrictPage isLogged={firebase.getUser() != null}>
                    <CreateStudent  firebase={firebase} setShowToast={setShowToast} setToast={setToast}/>
                </RestrictPage>)
        }
    }
    </FirebaseContext.Consumer>


const CreateStudent = (props) => {
    const [name, setName] = useState("");
    const [course, setCourse] = useState("");
    const [ira, setIra] = useState(0);
    const navigate = useNavigate();
    const [validate,setValidate] = useState({name:'',course:'',ira:''});
    const [loading, setLoading] = useState(false);

    const validateFields = () => {
        let res = true
        setValidate({name:'',course:'',ira:''})

        if(name === '' || course === '' || ira === ''){
            props.setToast({header:'Erro!',body:'Preencha todos os campos.'})
            props.setShowToast(true)
            setLoading(false)
            res = false
            let validateCad = {name:'',course:'',ira:''}
            if(name === '') validateCad.name = 'is-invalid'
            if(course === '') validateCad.course = 'is-invalid'
            if(ira === '') validateCad.ira = 'is-invalid'
            setValidate(validateCad)
        }

        if(ira !== '' && (ira < 0 || ira > 10)){
            props.setToast({header:'Erro!',body:'O IRA deve ser um valor entre 0 e 10!'})
            props.setShowToast(true)
            setLoading(false)
            res = false
            let validateIra = {name:'',course:'',ira:''}
            validateIra.ira = 'is-invalid'
            setValidate(validateIra)
        }

         
        return res
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        if(!validateFields())  return 
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
                    <input type="submit" value="Criar Estudante" className="btn btn-primary" />
                </div>
            </>
        )
    }


    return (
        <div>
            <h2>Criar estudante</h2>
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
                    <label>Curso:</label>
                    <input className={`form-control ${validate.course}`}
                        type="text"
                        name="course"
                        value={course ?? ""}
                        onChange={(event) => setCourse(event.target.value)} />
                </div>
                <div className="form-group">
                    <label>IRA:</label>
                    <input className={`form-control ${validate.ira}`}
                        type="number"
                        name="ira"
                        value={ira ?? 0}
                        onChange={(event) => setIra(event.target.value)} />
                </div>
                {renderSubmitBtn()}
            </form>
        </div>
    )
}

export default CreateStudentPage;