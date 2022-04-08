import './App.css';
import Meusdados from'./components/aula1/MeusDados';
import Usoprops from './components/aula1/Usoprops'
import IMC from './components/IMC/IMC.jsx';
import Casa from './components/hardcoder/Casa';
import Personagem from './components/hardcoder/Personagem';
import Pai from './components/pai_filho/Pai';
//import Cidade from './components/cidades/CidadesClasse';
import Cidade from './components/cidades/CidadeFuncao';


function App (){
  return (
    <div className="App">
    <Cidade />
    </div>
  );
}

export default App;
