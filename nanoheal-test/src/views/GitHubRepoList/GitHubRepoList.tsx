import React, { useEffect, useState } from "react";
import RepoList from "../../components/RepoList";
import { Pagination, Spin, Alert } from "antd";

interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  open_issues_count: number;
  created_at: string;
  owner: {
    login: string;
    avatar_url?: string;
  };
}

const GitHubRepoList = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGitHubRepos = async (page: number) => {
    try {
      setLoading(true);
      setError(null);

      const today = new Date();
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const thirtyDaysAgoDate = thirtyDaysAgo.toISOString().split("T")[0];

      const response = await fetch(
        `https://api.github.com/search/repositories?q=created:>${thirtyDaysAgoDate}&sort=stars&order=desc&page=${page}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setRepos(data.items);
      setTotal(data.total_count);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubRepos(page);
  }, [page]);

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const isLoading = loading || error;
  const noReposFound = !isLoading && repos.length === 0;

  return (
    <div className="App">
      <h1>Most Starred GitHub Repos that were created in the last 30 days.</h1>
      {error && <Alert message={error} type="error" />}
      {isLoading && <Spin size="large" />}
      {noReposFound && <div>No GitHub repositories found.</div>}
      {!error && !isLoading && !noReposFound && (
        <>
          <RepoList repos={repos} />
          <Pagination
            current={page}
            onChange={onPageChange}
            total={total}
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
