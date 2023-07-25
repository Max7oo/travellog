import { Link } from "react-router-dom";

import "./searchbar.css";

function SearchResult({ result }) {
  return (
    <>
      <Link className="result" to={`/user/${result.userName}`}>
        {result.firstName} {result.lastName}
      </Link>
    </>
  );
}

export default SearchResult;
