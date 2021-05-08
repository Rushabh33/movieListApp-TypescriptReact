import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MovieData } from "../App";

interface Props {
  currListOfMovieResults: MovieData[];
  currNominations: MovieData[];
  handleAddNomination: (movieId: string) => void;
}

// const ButtonStyled = styled.input<{ nominated: boolean }>`
//   /* background-color: ${props => (props.selected ? Colors.Hover : Colors.White)}; */
//   background: red;
// `;

// type NominationIds = {
//   movieId: string
// }

const ListOfMovies = (props: Props) => {
  const {
    currListOfMovieResults,
    currNominations,
    handleAddNomination,
  } = props;

  // useEffect(() => {
  //   console.log("currListOfMovieResults: ", currListOfMovieResults);
  // }, []);

  const currNominationIds: string[] =
    currNominations && currNominations.map((movieData) => movieData.imdbID);

  // const currNominationIds: string[] = () => {
  //   return (
  //     currNominations && currNominations.map((movieData) => movieData.imdbID)
  //   );
  // };

  const displayMovies = (data: MovieData[]) => {
    return data.map((movie) => {
      // Before displaying the movies we need to:
      // Filter out all the moves that are a part of the NominationList
      // here! If movie IS IN NOMINATION, say nomination TRUE,
      // and wrap the button in a condition...or styled prop?
      console.log("currNominationIds: ", currNominationIds);
      const isDisabled: boolean = currNominationIds.includes(movie.imdbID);
      return (
        <li key={movie.imdbID + "-nom"}>
          {movie.Poster}
          {movie.Title}
          {movie.Year}
          {movie.Type}
          {movie.imdbID}
          <button
            onClick={() => handleAddNomination(movie.imdbID)}
            disabled={isDisabled}
          >
            add Nom
          </button>
        </li>
      );
    });
  };

  const noResultData = [
    {
      Poster: "poster",
      Title: "string",
      Type: "string",
      Year: "string",
      imdbID: "string",
    },
  ];

  return (
    <div>
      <h1>List of Movies</h1>
      <ul>
        {/* QUESTION: not sure if I need the && validation or just the .length. I put it there because I think I'm worried about the undefined value the state can carrry */}
        {currListOfMovieResults && currListOfMovieResults.length
          ? displayMovies(currListOfMovieResults)
          : displayMovies(noResultData)}
      </ul>
    </div>
  );
};

export default ListOfMovies;
