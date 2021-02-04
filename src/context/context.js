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
  const [isLoading, setIsLoading] = useState(false);
  //error
  const [error, setError] = useState({ show: false, msg: "" });

  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);
    let userUrl = "https://api.github.com/users/" + user;
    let reposUrl =
      "https://api.github.com/users/" + user + "/repos?per_page=100";
    let followersURL = "https://api.github.com/users/" + user + "/followers";
    const response = await axios.get(userUrl).catch((err) => console.log(err));
    console.log(response);
    if (response) {
      setGithubUser(response.data);
      const {} = response.data;
      axios.get(reposUrl).then((response) => setRepos(response.data));
      axios.get(followersURL).then((response) => setFollowers(response.data));

      //morelogic
    } else {
      toggleError(true, "There is no user with provided username");
    }
    checkRequest();
    setIsLoading(false);
  };

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
          toggleError(
            true,
            "Sorry, You have exceeded your hourly search limit!"
          );
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
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
