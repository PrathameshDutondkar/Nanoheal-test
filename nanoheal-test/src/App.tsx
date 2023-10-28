import React from "react";
import ErrorBoundary from "./errorboundary/ErrorBoundary";
import { Route, Routes } from "react-router-dom";

import GitHubRepoList from "./views/GitHubRepoList/GitHubRepoList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<GitHubRepoList></GitHubRepoList>} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
