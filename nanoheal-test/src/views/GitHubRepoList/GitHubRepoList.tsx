import React, { useEffect, useState } from 'react';
import RepoList from '../../components/RepoList';
import { Pagination, Spin } from 'antd';

interface Repo {
  id: number;
  name: string;
}

const GitHubRepoList: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchGitHubRepos = async (page: number) => {
    try {
      setLoading(true);

      const today = new Date();
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const thirtyDaysAgoDate = thirtyDaysAgo.toISOString().split('T')[0];

      const response = await fetch(
        `https://api.github.com/search/repositories?q=created:>${thirtyDaysAgoDate}&sort=stars&order=desc&page=${page}`
      );

      const data = await response.json();

      setRepos(data.items);
      setTotal(data.total_count);
    } catch (error) {
      console.error('Error fetching data:', error);
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

  return (
    <div className="App">
      <h1>Most Starred GitHub Repos</h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <RepoList repos={repos} />
          <Pagination
            current={page}
            onChange={onPageChange}
            total={total}
            pageSize={30}
            showSizeChanger={false}
          />
        </>
      )}
    </div>
  );
};

export default GitHubRepoList;
