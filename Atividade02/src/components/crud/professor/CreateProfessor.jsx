import React, {useState} from "react";

const CreateProfessor = () => {
    const [name, setName] = useState("");
    const [university, setUniversity] = useState("");
    const [degree, setDegree] = useState("");

    const handleSubmit = (event) => {
        alert(`Nome: ${name} \nUniversidade: ${university}\nTitulacao: ${degree}`);
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