import './App.css';
import Arena from './components/Arena';
import World from './components/World';
import Hero from './components/Hero';
import Enemy from './components/Enemy';

function App() {
  return (
    <div className="App">

      <World>
        <Arena arena='Castelão'>
          <Hero name='Sicrano de Tal' />
          <Enemy name='Fulano de Tal' />
        </Arena>
        <Arena arena='Castelão'>
          <Hero name='Sicrano de Tal' />
          <Enemy name='Fulano de Tal' />
        </Arena>
        <Arena arena='Castelão'>
          <Hero name='Sicrano de Tal' />
          <Enemy name='Fulano de Tal' />
        </Arena>
      </World>
    </div>
  );
}

export default App;
