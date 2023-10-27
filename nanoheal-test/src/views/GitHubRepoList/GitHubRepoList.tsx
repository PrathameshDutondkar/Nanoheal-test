import React, { useEffect, useState } from 'react';
import RepoList from '../../components/RepoList';
import { Pagination } from 'antd';

interface Repo {
  id: number;
  name: string;
  // Add other properties you want to display
}

const GitHubRepoList: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const pageSize = 30; 

  const fetchGitHubRepos = async (page: number) => {
    try {
      const today = new Date();
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const todayISOString = today.toISOString().split('T')[0];
      const thirtyDaysAgoISOString = thirtyDaysAgo.toISOString().split('T')[0];

      const response = await fetch(
        `https://api.github.com/search/repositories?q=created:${thirtyDaysAgoISOString}..${todayISOString}&sort=stars&order=desc&page=${page}`
      );

      const data = await response.json();

      setRepos(data.items);
      setTotal(data.total_count);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchGitHubRepos(page);
  }, [page]);

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const totalPageCount = Math.ceil(total / pageSize);

  return (
    <div className="App">
      <h1>Most Starred GitHub Repos</h1>
      <RepoList repos={repos} />
      <Pagination
        current={page}
        onChange={onPageChange}
        total={totalPageCount * pageSize} 
        pageSize={pageSize}
        showSizeChanger={false}
      />
    </div>
  );
};

export default GitHubRepoList;
