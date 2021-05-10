import * as React from "react";
import styled from "styled-components";
import { MovieData } from "../App";
import PlaceHolderImage from "../assets/poster-placeholder.png";

type ComponentProps = {
  currNominations: MovieData[];
  handleRemoveNomination?: (param: string) => void;
  handleAddNomination?: (param: string) => void;
  isNomineeList: boolean;
  currListOfMovieResults?: MovieData[];
};

const MovieCardsUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const MovieCardsLi = styled.li`
  width: 46%;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 auto 20px;
  border-radius: 20px;
  background: lightblue;

  @media (min-width: 768px) {
    width: 25%;
  }
`;

const MoviePoster = styled.img`
  height: 240px;
  display: block;
  object-fit: fill;
  margin-bottom: 5px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const MovieCardContent = styled.div`
  text-align: center;
  margin-bottom: 5px;
  padding: 0 10px;

  p:first-child {
    height: 35px;
    padding-top: 5px;
    margin-bottom: 10px;
  }
`;

const StyledButton = styled.button`
  width: 75%;
  max-width: 120px;
  margin: 0 auto;
  margin-bottom: 10px;
`;

const noResultData = [
  {
    Poster: "poster",
    Title: "Sorry there are no titles that match your search, try again",
    Type: "try choosing seach for a new name or year",
    Year: "",
    imdbID: "placeholder",
  },
];

const placeHolderData = [
  {
    Poster: "poster",
    Title: "Head to 'Choose your Nominees' to nominate",
    Type: "",
    Year: "",
    imdbID: "placeholder",
  },
];

const MovieCard = (props: ComponentProps) => {
  const {
    currNominations,
    isNomineeList,
    handleRemoveNomination,
    handleAddNomination,
    currListOfMovieResults,
  } = props;

  const addDefaultSrc = (e: any) => {
    e.target.src = PlaceHolderImage;
  };

  const currNominationIds: string[] =
    currNominations && currNominations.map((movieData) => movieData.imdbID);

  const displayMovies = (data: MovieData[]) => {
    const dataToDisplay = data.length
      ? data
      : isNomineeList
      ? placeHolderData
      : noResultData;

    let isDisabled: boolean = false;
    if (data.length) {
    }

    return dataToDisplay.map((individualMovieData, index) => {
      if (!isNomineeList) {
        isDisabled = currNominationIds.includes(individualMovieData.imdbID)
          ? true
          : false;
      }

      if (individualMovieData.imdbID === "placeholder") {
        isDisabled = true;
      }

      return (
        <MovieCardsLi key={index + `${isNomineeList}`}>
          <MoviePoster
            src={individualMovieData.Poster}
            onError={addDefaultSrc}
            alt={individualMovieData.Title + " poster"}
          />
          <MovieCardContent>
            <p>{individualMovieData.Title}</p>
            <p>{individualMovieData.Year}</p>
          </MovieCardContent>
          {isNomineeList ? (
            <StyledButton
              disabled={isDisabled}
              onClick={() =>
                handleRemoveNomination &&
                handleRemoveNomination(individualMovieData.imdbID)
              }
            >
              Remove Nomination
            </StyledButton>
          ) : (
            <StyledButton
              disabled={isDisabled}
              onClick={() =>
                handleAddNomination &&
                handleAddNomination(individualMovieData.imdbID)
              }
            >
              Nominate
            </StyledButton>
          )}
        </MovieCardsLi>
      );
    });
  };

  return (
    <MovieCardsUl>
      {isNomineeList
        ? displayMovies(currNominations)
        : currListOfMovieResults && displayMovies(currListOfMovieResults)}
    </MovieCardsUl>
  );
};

export default MovieCard;
