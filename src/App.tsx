import React, { useState, useEffect, Fragment } from "react";
import FilterQueries from "./components/FilterQueries";
import Nominations from "./components/Nominations";
import QueryResults from "./components/QueryResults";

export type FilterQueryProps = {
  searchQuery: string;
};

const App = () => {
  const [
    currentFilterQuery,
    setCurrentFilterQuery,
  ] = useState<FilterQueryProps | null>(null);

  useEffect(() => {
    console.log("currentFilterQuery: ", currentFilterQuery);
    // Call the API - reference the wealthsimple api then rossintel
    // Push the results to a new List-Of-Movies State
    // Pass List-Of-Movies down to results
    // THEN create a nomination list state on this component and pass that list down to the Nominations component
    // create a function on this component which adds/removes movies from the nomination list based on button name?
    // Pass that function down to the Results component that should trigger on a buttons (add & remove)
    // then verify
  }, [currentFilterQuery]);

  return (
    <Fragment>
      <header>
        <nav>{/* <a href="#">hello</a>
          <a href="#">2ello</a> */}</nav>
        <Nominations />
      </header>
      <main>
        <section>
          <p>T3his is the top body</p>
        </section>
        <FilterQueries setCurrentFilterQuery={setCurrentFilterQuery} />
        <QueryResults />
      </main>
      <footer>
        <p>Footers</p>
      </footer>
    </Fragment>
  );
};

export default App;
