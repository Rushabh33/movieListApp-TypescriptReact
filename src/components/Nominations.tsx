import * as React from "react";
import styled from "styled-components";
import { MovieData } from "../App";
import MovieCard from "./MovieCards";

const Title = styled.h1`
  text-align: center;
  margin-top: 50px;
`;

const StyledP = styled.p`
  text-align: center;
  margin-bottom: 10px;
`;

type ComponentProps = {
  currNominations: MovieData[];
  handleRemoveNomination: (param: string) => void;
};

const Nominations = (props: ComponentProps) => {
  const { currNominations, handleRemoveNomination } = props;

  return (
    <div>
      <Title>Your 5 Nominations</Title>
      <StyledP>
        pick your next nomination in the 'Choose your Nominees' section below
      </StyledP>
      <MovieCard
        currNominations={currNominations}
        handleRemoveNomination={handleRemoveNomination}
        isNomineeList={true}
      />
    </div>
  );
};

export default Nominations;
