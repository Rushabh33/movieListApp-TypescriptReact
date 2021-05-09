import React from "react";
import styled from "styled-components";
import { MovieData } from "../App";
import MovieCard from "./MovieCards";
import Wrapper from "./Wrapper";

const SectionTitle = styled.h2`
  margin: 20px 0 0;
`;

const LoadMoreButton = styled.button`
  display: block;
  background: lightgreen;
  margin: 0 auto;
  width: 100px;
`;

interface Props {
  currListOfMovieResults: MovieData[];
  currNominations: MovieData[];
  handleAddNomination: (movieId: string) => void;
  loadMoreResults: () => void;
}

const ListOfMovies = (props: Props) => {
  const {
    currListOfMovieResults,
    currNominations,
    handleAddNomination,
    loadMoreResults,
  } = props;

  return (
    <Wrapper>
      <SectionTitle>List of Movies</SectionTitle>
      <MovieCard
        currNominations={currNominations}
        handleAddNomination={handleAddNomination}
        isNomineeList={false}
        currListOfMovieResults={currListOfMovieResults}
      />
      <LoadMoreButton onClick={loadMoreResults}>
        Load More Results
      </LoadMoreButton>
    </Wrapper>
  );
};

export default ListOfMovies;
