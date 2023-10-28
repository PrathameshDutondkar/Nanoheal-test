import React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector
import RepoCard from './RepoCard';

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
interface RootState {
  githubRepos: {
    repos: Repo[];
    
  };
}



const RepoList = () => {
  const repos = useSelector((state: RootState) => state.githubRepos.repos); 

  return (
    <div className="repo-list">
      {repos?.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
};

export default RepoList;


