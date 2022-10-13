/* eslint-disable no-undef */
import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { blockSite, clearStorage } from "./main";
import axios from "axios";

function App() {
  const [domain, setDomain] = useState("");
  const [blockedDomains, setBlockedDomains] = useState([]);
  const [effectSwitch, setEffectSwitch] = useState(true);
  const [blockCurrentPage, setBlockCurrentPage] = useState(false);
  const [todaySubmission, setTodaySubmission] = useState();
  useEffect(() => {
    chrome.storage.sync.get(["blockedDomains"], (result) => {
      const blockedDomains = result.blockedDomains;
      chrome.storage.sync.get(["currentTabDomain"], (result) => {
        const currentDomain = result.currentTabDomain;
        for (let d of blockedDomains) {
          if (d.includes(currentDomain)) {
            setBlockCurrentPage(true);
            break;
          }
        }
        setDomain(currentDomain);
      });
      setBlockedDomains(blockedDomains);
    });

    async function getLeetCodeStat() {
      const response = await axios.get(
        "https://leetcode-stats-api.herokuapp.com/Mark_Zhangccc"
      );
      const submissionCalendar = response.data.submissionCalendar;
      console.log(submissionCalendar);
      const latestTimestamp = Object.keys(submissionCalendar).pop();
      console.log("submission is:", submissionCalendar[latestTimestamp]);
      setTodaySubmission(submissionCalendar[latestTimestamp]);
    }

    getLeetCodeStat();
  }, [effectSwitch]);
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
        <p>today leetcode submission: {todaySubmission}</p>
        {blockCurrentPage ? (
          <p>page blocked</p>
        ) : (
          <div>
            <p id="domain">{domain}</p>
            <button
              onClick={() => {
                blockSite(domain);
                setEffectSwitch(!effectSwitch);
                setBlockCurrentPage(true);
              }}
            >
              Block current site
            </button>
            <ul>
              {blockedDomains &&
                blockedDomains.map((domain) => {
                  return <li>{domain}</li>;
                })}
            </ul>
          </div>
        )}
        <button
          onClick={() => {
            clearStorage();
            setBlockCurrentPage(false);
          }}
        >
          Clear
        </button>
      </header>
    </div>
  );
}

export default App;
