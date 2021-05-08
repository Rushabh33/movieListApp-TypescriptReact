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

const ListOfMovies = (props: Props) => {
  const {
    currListOfMovieResults,
    currNominations,
    handleAddNomination,
  } = props;

  const currNominationIds: string[] =
    currNominations && currNominations.map((movieData) => movieData.imdbID);

  const displayMovies = (data: MovieData[]) => {
    return data.map((movie) => {
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
