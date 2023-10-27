import React from 'react';
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
  // Include any other properties that 'RepoCard' expects
}

interface RepoListProps {
  repos: Repo[];
}

const RepoList: React.FC<RepoListProps> = ({ repos }) => {
  return (
    <div className="repo-list">
      {repos?.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
};

export default RepoList;
