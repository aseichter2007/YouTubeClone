import logo from './logo.svg';
import './App.css';
import ApiLayer from './Components/ApiLayer.js'

function App() {
  return (
    <div className="">
      <header className="">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <ApiLayer></ApiLayer>
      </header>
    </div>
  );
}

export default App;
