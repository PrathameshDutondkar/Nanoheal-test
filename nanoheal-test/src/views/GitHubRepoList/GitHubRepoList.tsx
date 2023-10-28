import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import RepoList from "../../components/RepoList";
import { Pagination, Spin, Alert } from "antd";
import { fetchGitHubRepos } from "../../store/GithubRepoSlice";
import "./githubrepoList.scss";
import { AppDispatch } from "../../store/store";

interface RootState {
  githubRepos: {
    repos: Repo[];
    loading: boolean;
    error: string | null;
  };
}

interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  open_issues_count: number;
  created_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const GitHubRepoList = () => {
  const { repos, loading, error } = useSelector(
    (state: RootState) => state.githubRepos
  );
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch<AppDispatch>();
  const page: number = 1;

  useEffect(() => {
    dispatch(fetchGitHubRepos(page));
  }, [dispatch, page]);

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    dispatch(fetchGitHubRepos(pageNumber));
  };

  const isLoading: boolean = loading || error !== null;
  const noReposFound: boolean = !isLoading && repos.length === 0;

  return (
    <div className="App">
      <div className="repo-title">Trending Repos</div>

      {error && <Alert message={error} type="error" />}
      {isLoading && <Spin size="large" />}
      {noReposFound && <div>No GitHub repositories found</div>}
      {!error && !isLoading && !noReposFound && (
        <>
          <RepoList />
          <Pagination
            current={currentPage}
            onChange={onPageChange}
            total={1000}
            pageSize={30}
            showSizeChanger={false}
            className="pagination"
          />
        </>
      )}
    </div>
  );
};

export default GitHubRepoList;
