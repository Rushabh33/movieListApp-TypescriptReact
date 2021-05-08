import React, { useState, useEffect } from "react";
import FilterInputs from "./components/FilterInputs";
import Nominations from "./components/Nominations";
import ListOfMovies from "./components/ListOfMovies";

export interface User2FilterQueries {
  // this is to make sure that OF the incoming event variables, we are/can only use target, name and value
  target: {
    name: string;
    value: string;
  };
}

// this is the data type STATE is using, and how the evt variables should be interpreted
type CurrentUserFilterQueries = {
  searchQuery: string;
  yearQuery: string;
  pageQuery: string;
};

// this includes error because even a successful call carries the error property
type MovieApiResponse = {
  Response: boolean;
  Error?: string;
  totalResults?: string;
  // I"M CONFUSED, shouldn't this be 'Search?'?!?!!?!
  Search: Array<MovieData>;
};

export interface MovieData {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

const getMoviesApi = async (
  allUserQueries: CurrentUserFilterQueries
): Promise<MovieApiResponse> => {
  const url = `http://www.omdbapi.com/?apikey=2b75fdb1`;
  const userSearchQuery = `&s=` + allUserQueries.searchQuery;
  const userYearQuery = `&y=` + allUserQueries.yearQuery;
  const userPageQuery = `&page=` + allUserQueries.pageQuery;
  const response = await fetch(
    url + userSearchQuery + userYearQuery + userPageQuery
  );
  const data: MovieApiResponse = await response.json();
  return data;
};

const App = () => {
  const [
    currentFilterQuery,
    setCurrentFilterQuery,
  ] = useState<CurrentUserFilterQueries>({
    searchQuery: "",
    yearQuery: "",
    pageQuery: "1",
  });

  const [currNominations, setCurrNominations] = useState<MovieData[]>([]);
  const [currListOfMovieResults, setcurrListOfMovieResults] = useState<
    MovieData[]
  >([]);
  const [isMaxNomination, setIsMaxNomination] = useState<boolean>(false);

  useEffect(() => {
    //turn on loading here
    if (currentFilterQuery && currentFilterQuery.searchQuery) {
      console.log("currentFilterQuery: ", currentFilterQuery);
      getMoviesApi(currentFilterQuery).then((data) => {
        console.log("data.Response: ", data.Response);
        if (data.Response === false) return;
        setcurrListOfMovieResults(data.Search);
      });
    }
  }, [currentFilterQuery]);

  useEffect(() => {
    if ((currNominations.length = 5)) {
      setIsMaxNomination(true);
      // AND SHOW BANNER THAT DISSAPEARS AFTER A FEW MINS: MAY 8
    }
  }, [currNominations]);

  const handleUserFilterInputs = (evt: User2FilterQueries) => {
    let currentUserQueryState = { ...currentFilterQuery };
    if (evt.target.name === "searchQuery") {
      currentUserQueryState.searchQuery = evt.target.value;
    }
    if (evt.target.name === "yearQuery") {
      currentUserQueryState.searchQuery = evt.target.value;
    }
    setCurrentFilterQuery(currentUserQueryState);
  };

  const handleAddNomination = (movieId: string) => {
    // if IsMaxNomination IS TRUE, then we can't do ANY OF THIS: MAY 8

    console.log("movieId: ", movieId);
    const movieToNominate = currListOfMovieResults.filter((movieData) => {
      return movieData.imdbID === movieId;
    });
    console.log("movieToNominate: ", movieToNominate);
    setCurrNominations([...currNominations, ...movieToNominate]);
    // take this string, compare it to the current nominations, and remove it
  };

  const handleRemoveNomination = (param: string) => {
    const newNominationList = currNominations.filter((nom) => {
      return nom.imdbID !== param;
    });
    setCurrNominations([...newNominationList]);
  };

  return (
    <>
      <header>
        <nav>{/* <a href="#">hello</a>
          <a href="#">2ello</a> */}</nav>
        <Nominations
          currNominations={currNominations}
          handleRemoveNomination={handleRemoveNomination}
        />
      </header>
      <main>
        <section>
          <p>T3his is the top body</p>
        </section>
        <FilterInputs handleUserFilterInputs={handleUserFilterInputs} />
        <ListOfMovies
          currListOfMovieResults={currListOfMovieResults}
          currNominations={currNominations}
          handleAddNomination={handleAddNomination}
        />
      </main>
      <footer>
        <p>Footers</p>
      </footer>
    </>
  );
};

export default App;
