import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

import "./Details.css";

export default function Details() {

  let { id } = useParams();
  const [document, setDocument] = useState({});
  const [selectedTab, setTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // console.log(id);
    axios.get('/api/lookup?id=' + id)
      .then(response => {
        console.log(JSON.stringify(response.data))
        const doc = response.data.document;
        setDocument(doc);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });

  }, [id]);

  // View default is loading with no active tab
  let detailsBody = (<CircularProgress />),
      resultStyle = "nav-link",
      rawStyle    = "nav-link";

  if (!isLoading && document) {
    // View result
    if (selectedTab === 0) {
      resultStyle += " active";
      detailsBody = (
        <div className="card-body">
          <h5 className="card-title">{document.original_title}</h5>
          <img className="image" src={document.image_url} alt="Book cover" width="80" height="80"></img>
          <p className="card-text"> Region: {document.authors?.join('; ')}  </p>
          <p className="card-text"> Project Status: {document.original_publication_year}</p>
          <p className="card-text"> Digital Employee: {document.isbn}</p>
          <p className="card-text"> Business Owner: {document.title}</p>
          <p className="card-text">Functional Area: {document.language_code} </p>
        </div>
      );

    }

    // View raw data
    else {
      rawStyle += " active";
      detailsBody = (
        <div className="card-body text-left">
          <pre><code>
            {JSON.stringify(document, null, 2)}
          </code></pre>
        </div>
      );
    }
  }

  return (
    <main className="main main--details container fluid">
      <div className="card text-center result-container">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item"><button className={resultStyle} onClick={() => setTab(0)}>Result</button></li>
              <li className="nav-item"><button className={rawStyle} onClick={() => setTab(1)}>Raw Data</button></li>
          </ul>
        </div>
        {detailsBody}
      </div>
    </main>
  );
}