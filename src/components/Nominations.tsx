import * as React from "react";
import { MovieData } from "../App";

type Props = {
  currNominations: MovieData[];
  handleRemoveNomination: (param: string) => void;
};

const Nominations = (props: Props) => {
  const { currNominations, handleRemoveNomination } = props;

  const displayMovies = (data: MovieData[]) => {
    console.log("data: ", data);
    return data.map((movie) => {
      return (
        <li key={movie.imdbID}>
          {movie.Poster}
          {movie.Title}
          {movie.Year}
          {movie.Type}
          {movie.imdbID}
          <button onClick={() => handleRemoveNomination(movie.imdbID)}>
            remove Nom
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
