import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toast, ToastContainer } from "react-bootstrap";

import FirebaseContext from "../utils/FirebaseContext";
import FirebaseUserService from "../services/FirebaseUserService";

const HomePage = ({setLogged,setShowToast,setToast}) =>
    <FirebaseContext.Consumer>
        {(firebase) => <Home firebase={firebase} setLogged={setLogged} setShowToast={setShowToast} setToast={setToast} />}
    </FirebaseContext.Consumer>

const Home = (props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [validate,setValidate] = useState({login:'',password:''});

    const validateFields = () => {
        let res = true
        setValidate({login:'',password:''})
        
        if(login === '' || password === ''){
            props.setToast({header:'Erro!',body:'Preencha todos os campos.'})
            props.setShowToast(true)
            setLoading(false)
            res = false
            let validateLog = {login:'',password:''}
            if(login === '') validateLog.login = 'is-invalid'
            if(password === '') validateLog.password = 'is-invalid'
            setValidate(validateLog)
        }
        return res
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        if(!validateFields()) return
        FirebaseUserService.login(
            props.firebase.getAuthentication(),
            login,
            password,
            (user) => {
                if (user != null) {
                    setLoading(false)
                    props.firebase.setUser(user)
                    props.setLogged(true)
                    navigate('/listStudent')
                } else {
                    setLoading(false)
                    props.setToast({header:'Erro!',body:'Login e/ou Senha incorreto(s).'})
                    props.setShowToast(true)
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
                    <input type="submit" value="Efetuar Login" className="btn btn-primary" />
                </div>
            </>
        )
    }
   
    return (
        <div className="container-login" style={{ marginTop: 40 }}>
            <main style={{ width: '40%' }}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Login: </label>
                        <input type="text"
                            className={`form-control ${validate.login}`}
                            value={(login == null || login === undefined) ? "" : login}
                            name="login"
                            onChange={(event) => { setLogin(event.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>Senha: </label>
                        <input type="password"
                            className={`form-control ${validate.password}`}
                            value={password ?? ""}
                            name="password"
                            onChange={(event) => { setPassword(event.target.value) }} />
                    </div>
                    {renderSubmitBtn()}
                </form>
            </main>
            <nav style={{padding:"8px 0 "}
            }>
                <Link to="/cadastro">Ainda não tem cadastro?</Link>
            </nav>
        </div>
    )
}

export default HomePage;