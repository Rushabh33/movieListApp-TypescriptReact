import * as React from "react";
import { MovieData } from "../App";

type Props = {
  currNominations: MovieData[];
};

const Nominations = (props: Props) => {
  const { currNominations } = props;

  const displayMovies = (data: MovieData[]) => {
    return data.map((movie) => {
      return (
        <li key={movie.imdbID}>
          {movie.Poster}
          {movie.Title}
          {movie.Year}
          {movie.Type}
          {movie.imdbID}
          <button>remove Nom</button>
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
      <h1>Nominations</h1>
      <ul>
        {currNominations && currNominations.length
          ? displayMovies(currNominations)
          : displayMovies(noResultData)}
      </ul>
    </div>
  );
};

export default Nominations;
