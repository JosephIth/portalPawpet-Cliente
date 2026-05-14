import logo from './logo.svg';
import './App.css';
import { Button, Input, SearchInput } from 'pets-ui-lib';
import 'pets-ui-lib/dist/styles/pets-ui-lib.css';
import { Plus } from 'lucide-react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
        </a>

      </header>
        <Button variant="accent" icon={<Plus />} >Click me</Button>
    </div>
  );
}

export default App;
