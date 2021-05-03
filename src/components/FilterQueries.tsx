import * as React from "react";
import styled from "styled-components";
import { FilterQueryProps } from "../App";

type AppProps = {
  setCurrentFilterQuery: (query: FilterQueryProps) => void;
};

const InputStyled = styled.input`
  background: red;
`;

const FilterQueries = (props: AppProps) => {
  const { setCurrentFilterQuery } = props;

  // onChange, set off the setCurrentFilterQuery function
  const onFilterChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log("evt.target.name: ", evt.target.name);
    console.log("evt.target.value: ", evt.target.value);
    setCurrentFilterQuery({ searchQuery: evt.target.value });
  };

  return (
    <div>
      <h1>FilterQueries</h1>
      <InputStyled type="text" name="searchQuery" onChange={onFilterChange} />
    </div>
  );
};

export default FilterQueries;
