import React, { useEffect, useState } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rate_limitUrl = "https://api.github.com/rate_limit";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  //request loading
  const [requests, setRequest] = useState(0);
  const [loading, setIsLoading] = useState(false);
  //error
  const [error, setError] = useState({ show: false, msg: "" });

  //check rate
  const checkRequest = () => {
    axios
      .get(rate_limitUrl)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequest(remaining);
        if (remaining === 0) {
          toggleError(true, "Sorry, You have exceeded your hourly search limit!");
        }
      })
      .catch((err) => console.log(err));
  };

  let toggleError = (show = false, msg = "") => {
    setError({ show, msg });
  };
  //error
  useEffect(checkRequest, []);

  return (
    <GithubContext.Provider value={{ githubUser, repos, followers, requests,error }}>
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
