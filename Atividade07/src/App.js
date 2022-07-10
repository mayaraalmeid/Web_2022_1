import './App.css';
import Home from './components/Home';
import About from './components/About';

import CreateStudent from './components/crud/student/CreateStudent';
import ListStudent from './components/crud/student/ListStudent';
import EditStudent from './components/crud/student/EditStudent';

import CreateProfessor from './components/crud/professor/CreateProfessor';
import ListProfessor from './components/crud/professor/ListProfessor';
import EditProfessor from './components/crud/professor/EditProfessor';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { NavDropdown } from 'react-bootstrap';

import FirebaseContext from './utils/FirebaseContext';
import FirebaseUserService from './services/FirebaseUserService';
import ToastCheck from './utils/ToastCheck';


const AppPage = () => 
<FirebaseContext.Consumer>
  {(firebase) => <App firebase={firebase} />}
</FirebaseContext.Consumer>


function App(props) {
  const [logged,setLogged] = useState(false);
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false); 
  const [toast, setToast] = useState({ header: '', body: '' }) 


  const renderUserLogoutButton = () => {
    if (props.firebase.getUser() != null)
      return (
        <div className='text-light' style={{ marginRight: 20 }}>
          Olá, {props.firebase.getUser().email}
          <button className='btn btn-secondary' style={{ marginLeft: 10 }} onClick={()=>logout()} >Logout</button>
        </div>
      )
    return
  }

  const logout = () => {
    if (props.firebase.getUser() != null){
      FirebaseUserService.logout(
        props.firebase.getAuthentication(),
        (res)=>{
          if(res){
            props.firebase.setUser(null)
            setLogged(false)
            navigate('/')
          }
        }
      )
    }
  }
  const renderToast = () => {
    return <ToastCheck
      show={showToast}
      header={toast.header}
      body={toast.body}
      setShowToast={setShowToast}
      bg='dark'
    />
  }

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          UFC
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="navitem">
              <Link to="/" className="nav-link">Home</Link>
            </li>

            <li className="navitem">
              <Link to="cadastro" className="nav-link">About</Link>
            </li>

            <NavDropdown title="Student" id="basic-nav-dropdown">
              <NavDropdown.Item >
              <Link to="createStudent" className="dropdown-item">Create Student</Link>
                </NavDropdown.Item>
              <NavDropdown.Item >
              <Link to="listStudent" className="dropdown-item">List Student</Link>
                </NavDropdown.Item>
            </NavDropdown>

            
            <NavDropdown title="Professor" id="basic-nav-dropdown">
              <NavDropdown.Item >
              <Link to="createProfessor" className="dropdown-item">Create Professor</Link>
                </NavDropdown.Item>
              <NavDropdown.Item >
              <Link to="listProfessor" className="dropdown-item">List Professor</Link>
                </NavDropdown.Item>
            </NavDropdown>

          </ul>
        </div>
        {renderToast()}
        {renderUserLogoutButton()}
      </nav>
      <Routes>
        <Route path='/' element={<Home setLogged={setLogged} setShowToast={setShowToast} setToast={setToast} />} />
        <Route path='cadastro' element={<About setLogged={setLogged} setShowToast={setShowToast} setToast={setToast} />} />

        <Route path='createStudent' element={<CreateStudent  setShowToast={setShowToast} setToast={setToast}/>} />
        <Route path='listStudent' element={<ListStudent  setShowToast={setShowToast} setToast={setToast} />} />
        <Route path='editStudent/:id' element={<EditStudent  setShowToast={setShowToast} setToast={setToast} />} />

        <Route path='createProfessor' element={<CreateProfessor  setShowToast={setShowToast} setToast={setToast} />} />
        <Route path='editProfessor/:id' element={<EditProfessor  setShowToast={setShowToast} setToast={setToast} />} />
        <Route path='listProfessor' element={<ListProfessor  setShowToast={setShowToast} setToast={setToast} />} />
      </Routes>
    </div>
  );
}

export default AppPage;
