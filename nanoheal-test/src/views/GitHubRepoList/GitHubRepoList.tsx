import React, { useEffect, useState } from 'react';
import RepoList from '../../components/RepoList';
import { Pagination } from 'antd';

interface Repo {
  
  id: number;
  name: string;

}

const GitHubRepoList: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${page}`
        );
        const data = await response.json();

        setRepos(data.items);
        setTotal(data.total_count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [page]);

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div className="App">
      <h1>Most Starred GitHub Repos</h1>
      <RepoList repos={repos} />
      <Pagination
        current={page}
        onChange={onPageChange}
        total={total}
        pageSize={30}
        showSizeChanger={false}
      />
    </div>
  );
};

export default GitHubRepoList;
