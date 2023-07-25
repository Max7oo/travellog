import "./searchbar.css";
import SearchResult from "./searchresult";

function SearchResults({ results }) {
  return (
    <>
      <div className="results-list">
        {results.map((result, index) => {
          return <SearchResult result={result} key={index} />;
        })}
      </div>
    </>
  );
}

export default SearchResults;
