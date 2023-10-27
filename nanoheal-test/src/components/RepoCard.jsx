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

  const createdDate = new Date(repo.created_at);
  const currentDate = new Date();
  const timeDifference = currentDate - createdDate;
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return (
    <div className="repo-container">
      <div className="repo-card">
        <span className="image-container">
          <img
            src={repo.owner.avatar_url}
            alt={repo.owner.login}
            className="repo-image"
          />
        </span>
        <span className="repo-details-container">
          {" "}
          <div className="repo-name">{repo.name}</div>
          <div className="repo-description">{repo.description}</div>
          <span className="repo-details">
            <span className="repo-star">
              <span className="repo-star-icon">
                <AiFillStar style={starIconStyle} />
              </span>
              <span className="repo-star-count">{repo.stargazers_count}</span>
            </span>
            <span className="repo-issue">
              <span>
                <AiOutlineIssuesClose style={issueIconStyle} />
              </span>
              <span className="repo-issue-count">{repo.open_issues_count}</span>
            </span>
            <span className="repo-username">
              Submitted &nbsp;<span className="no-of-days">{daysAgo}  days </span>&nbsp; ago by &nbsp;<span className="no-of-days"> {repo.owner.login}</span>
            </span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default RepoCard;
