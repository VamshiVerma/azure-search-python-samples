import React from "react";
import { useHistory } from "react-router-dom";

import SearchBar from '../../components/SearchBar/SearchBar';

import "./Home.css";
import "../../pages/Search/Search.css";

export default function Home() {
  const history = useHistory();
  const navigateToSearchPage = (q) => {
    if (!q || q === '') {
      q = '*'
    }
    history.push('/search?q=' + q);
  }

  return (
    <main className="main main--home">
      <div className="row home-search">
        <img className="logo" src="https://www.medicaldesignandoutsourcing.com/wp-content/uploads/2018/08/hologic-MDO.jpg" alt="Hologic"></img>
        <p className="poweredby lead">Automation Hall of Fame</p>
        <SearchBar postSearchHandler={navigateToSearchPage}></SearchBar>
      </div>
    </main>
  );
};
