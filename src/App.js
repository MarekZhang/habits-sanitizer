/* eslint-disable no-undef */
import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { blockSite } from "./main";

function App() {
  const [domain, setDomain] = useState("");
  useEffect(() => {
    chrome.storage.sync.get(["currentTabDomain"], (result) => {
      setDomain(result.currentTabDomain);
    });
  });
  return (
    <div className="App w-96">
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
        <button
          onClick={() => {
            blockSite(domain);
          }}
        >
          Change Color
        </button>
        <p id="domain">{domain}</p>
      </header>
    </div>
  );
}

export default App;
