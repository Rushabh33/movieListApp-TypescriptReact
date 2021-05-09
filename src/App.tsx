import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Wrapper from "./components/Wrapper";
import FilterInputs from "./components/FilterInputs";
import Nominations from "./components/Nominations";
import ListOfMovies from "./components/ListOfMovies";

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  a:first-child p {
    font-size: 1.2rem;
  }

  @media (min-width: 768px) {
    a:first-child p {
      font-size: 2rem;
    }
  }
`;

const AppHeader = styled.header`
  position: relative;
`;

const AppNav = styled.nav`
  padding: 20px 0 10px;
  height: 60px;
  background: white;
`;

const NavContents = styled(Wrapper)`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  a:last-child {
    font-size: 0.6rem;
  }
`;

const AlertBanner = styled.div<{ notificationTrigger: boolean }>`
  opacity: ${(props) => (props.notificationTrigger ? 1 : 0)};
  height: ${(props) => (props.notificationTrigger ? "40px" : 0)};
  width: 100%;
  overflow: hidden;
  transition: all 2s;
  background: #f8bdbd;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #464646;

  position: absolute;
  top: 60px;
`;

export interface UserInputValues {
  target: {
    name: string;
    value: string;
  };
}

type CurrentUserFilterQueries = {
  searchQuery: string;
  yearQuery: string;
  pageQuery: string;
};

// this includes error because even a successful call carries the error property
type MovieApiResponse = {
  Response: string;
  Error?: string;
  totalResults?: string;
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
  console.log("helelelelooo");
  const url = `https://www.omdbapi.com/?apikey=2b75fdb1`;
  const userSearchQuery = `&s=` + allUserQueries.searchQuery;
  const userYearQuery = `&y=` + allUserQueries.yearQuery;
  const typeOfNomination = `&type=movie`;
  const userPageQuery = `&page=` + allUserQueries.pageQuery;
  const response = await fetch(
    url + userSearchQuery + userYearQuery + userPageQuery + typeOfNomination
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
  const [currListOfMovieResults, setCurrListOfMovieResults] = useState<
    MovieData[]
  >([]);
  const [isMaxNomination, setIsMaxNomination] = useState<boolean>(false);
  const [notificationTrigger, setNotificationTrigger] = useState<boolean>(
    false
  );
  const [totalResults, setTotalResults] = useState<string>("");
  const maxNumberOfNominations = 5;

  useEffect(() => {
    if (currentFilterQuery && currentFilterQuery.searchQuery) {
      getMoviesApi(currentFilterQuery)
        .then((data) => {
          if (data.Response.toLowerCase() === "false") {
            setCurrListOfMovieResults([]);
            return;
          }
          if (currentFilterQuery.pageQuery > "1") {
            data.Search &&
              setCurrListOfMovieResults([
                ...currListOfMovieResults,
                ...data.Search,
              ]);
            return;
          }
          data.Search && setCurrListOfMovieResults([...data.Search]);
          data.totalResults && setTotalResults(data.totalResults);
          console.log("data.totalResults: ", data.totalResults);
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    }
  }, [currentFilterQuery]);

  useEffect(() => {
    if (currNominations.length === maxNumberOfNominations) {
      setIsMaxNomination(true);
      triggerNotificationBanner();
      return;
    }
    setIsMaxNomination(false);
  }, [currNominations]);

  const handleUserFilterInputs = (evt: UserInputValues) => {
    let currentUserQueryState = { ...currentFilterQuery };

    if (evt.target.name === "searchQuery") {
      currentUserQueryState.searchQuery = evt.target.value;
      currentUserQueryState.pageQuery = "1";
    }

    if (evt.target.name === "yearQuery") {
      currentUserQueryState.yearQuery = evt.target.value;
      currentUserQueryState.pageQuery = "1";
    }
    setCurrentFilterQuery(currentUserQueryState);
  };

  const handleAddNomination = (movieId: string) => {
    if (isMaxNomination === true) {
      return;
    }
    const movieToNominate = currListOfMovieResults.filter((movieData) => {
      return movieData.imdbID === movieId;
    });
    setCurrNominations([...currNominations, ...movieToNominate]);
  };

  const handleRemoveNomination = (param: string) => {
    const newNominationList = currNominations.filter((nom) => {
      return nom.imdbID !== param;
    });
    setCurrNominations([...newNominationList]);
  };

  const triggerNotificationBanner = () => {
    setNotificationTrigger(true);
    setTimeout(() => {
      setNotificationTrigger(false);
    }, 8000);
  };

  const loadMoreResults = () => {
    let currentUserQueryState = { ...currentFilterQuery };
    if (+totalResults / +currentUserQueryState.pageQuery <= 10) {
      console.log(
        "+totalResults / +currentUserQueryState.pageQuery >= 10: ",
        +totalResults / +currentUserQueryState.pageQuery >= 10
      );
      console.log("totalResults: ", totalResults);
      console.log(
        "currentUserQueryState.pageQuery: ",
        currentUserQueryState.pageQuery
      );
      return;
    }
    currentUserQueryState.pageQuery = `${+currentUserQueryState.pageQuery + 1}`;
    setCurrentFilterQuery(currentUserQueryState);
  };

  return (
    <AppContainer>
      <AppHeader>
        <AppNav>
          <NavContents>
            <a href="/">
              <p>The Shoppies</p>
            </a>
            <a
              href="https://www.linkedin.com/in/rushabhparekh33/?originalSubdomain=ca"
              target="_blank"
            >
              <p>by Rushabh Parekh</p>
            </a>
          </NavContents>
        </AppNav>

        <Nominations
          currNominations={currNominations}
          handleRemoveNomination={handleRemoveNomination}
        />
        <AlertBanner notificationTrigger={notificationTrigger}>
          <p>You've reached your maximum number of nominations</p>
          <p>Remove to add new nominations</p>
        </AlertBanner>
      </AppHeader>
      <main>
        <FilterInputs handleUserFilterInputs={handleUserFilterInputs} />
        <ListOfMovies
          currListOfMovieResults={currListOfMovieResults}
          currNominations={currNominations}
          handleAddNomination={handleAddNomination}
          loadMoreResults={loadMoreResults}
        />
      </main>
    </AppContainer>
  );
};

export default App;
