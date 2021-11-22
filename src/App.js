import logo from './images/bitcoin.png';
import './App.css';
import Crypto from './components/Crypto';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Bitcoin Rate</h1>
      </header>
      <Crypto />
    </div>
  );
}

export default App;
