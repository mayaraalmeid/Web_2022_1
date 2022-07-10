import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FirebaseUserService from "../services/FirebaseUserService";
import FirebaseContext from "../utils/FirebaseContext";

const AboutPage = ({setLogged,setShowToast,setToast}) =>
    <FirebaseContext.Consumer>
        {(firebase) => <About firebase={firebase} setLogged={setLogged} setShowToast={setShowToast} setToast={setToast}/>}
    </FirebaseContext.Consumer>

const About = (props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordR, setPasswordR] = useState('');
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [validate,setValidate] = useState({login:'',password:'',passwordR:''})

    const validateFields = () => {
        let res = true
        setValidate({login:'',password:'',passwordR:''})
        
        if(password!==passwordR){
            props.setToast({header:'Erro!',body:'Senhas diferentes!'})
            props.setShowToast(true)
            setLoading(false)
            setValidate({login:'',password:'is-invalid',passwordR:'is-invalid'})
            res = false
        }
        if(login === '' || password === '' || passwordR === ''){
            props.setToast({header:'Erro!',body:'Preencha todos os campos.'})
            props.setShowToast(true)
            setLoading(false)
            res = false
            let validateCad = {login:'',password:'',passwordR:''}
            if(login === '') validateCad.login = 'is-invalid'
            if(password === '') validateCad.password = 'is-invalid'
            if(passwordR === '') validateCad.passwordR = 'is-invalid'
            setValidate(validateCad)
        }

         
        return res
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        if(!validateFields()) return
        FirebaseUserService.signUp(
            props.firebase.getAuthentication(),
            login,
            password,
            (res,content) => {
                if (res) {
                    setLoading(false)
                    props.firebase.setUser(content)
                    props.setLogged(true)
                    navigate('/listStudent')
                } else {
                    props.setToast({header:'Erro!',body:content})
                    props.setShowToast(true)
                    setLoading(false)
                }
            }
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
                    <input type="submit" value="cadastrar" className="btn btn-primary" />
                </div>
            </>
        )
    }

    return (
    <div className="container-login" style={{ marginTop: 40 }}>
            <main style={{ width: '40%' }}>
                <h2>Cadastrar usuário</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Digite seu email: </label>
                        <input type="text"
                            className={`form-control ${validate.login}`}
                            value={(login == null || login === undefined) ? "" : login}
                            name="login"
                            onChange={(event) => { setLogin(event.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>Digite uma senha: </label>
                        <input type="password"
                            className={`form-control ${validate.password}`}
                            value={password ?? ""}
                            name="password"
                            onChange={(event) => { setPassword(event.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>Confirme a senha: </label>
                        <input type="password"
                            className={`form-control ${validate.passwordR}`}
                            value={passwordR ?? ""}
                            name="password"
                            onChange={(event) => { setPasswordR(event.target.value) }} />
                    </div>
                    {renderSubmitBtn()}
                </form>
            </main>
        </div>
    )

}

export default AboutPage;