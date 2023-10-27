import { Card } from "antd";
import React from "react";
import "./repocard.scss";
import { AiFillStar, AiOutlineIssuesClose } from "react-icons/ai";

const RepoCard = ({ repo }) => {
  console.log("data", repo);

  const starIconStyle = {
    color: "gold",
    width: "28px",
    height: "28px",
  };

  const issueIconStyle = {
    color: "red",
    width: "28px",
    height: "28px",
  };

  return (
    <div className="repo-container">
      <Card className="repo-card">
        <div className="image-container">
          <img
            src={repo.owner.avatar_url}
            alt={repo.owner.login}
            className="repo-image"
          />
        </div>
        <div className="repo-name">{repo.name}</div>
        <div className="repo-description">{repo.description}</div>
        <div className="repo-star">
        <span className="repo-star-icon"><AiFillStar style={starIconStyle} /></span>
          <span className="repo-star-count">{repo.stargazers_count}</span>
          
        </div>
        <div className="repo-issue">
        <span ><AiOutlineIssuesClose style={issueIconStyle} /></span>

          
         <span className="repo-issue-count">{repo.open_issues_count}</span> 
        </div>
        <div className="repo-username">
          Username of Owner: {repo.owner.login}
        </div>
      </Card>
    </div>
  );
};

export default RepoCard;
