import React, { useContext } from "react";
import { Navbar, Search, Info, User, Repos } from "../components";
import { GithubContext } from "../context/context";
import loadingImage from "../images/ford_loading.gif";

const Dashboard = () => {
  const { isLoading } = useContext(GithubContext);
  if (isLoading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img src={loadingImage} className="loading-img" alt="loading" />
      </main>
    );
  }
  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
