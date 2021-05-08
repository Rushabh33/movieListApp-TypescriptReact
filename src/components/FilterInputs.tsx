import * as React from "react";
import styled from "styled-components";
import { User2FilterQueries } from "../App";

type ComponentProps = {
  handleUserFilterInputs: (event: User2FilterQueries) => void;
  // handleUserFilterInputs: (React.ChangeEvent<HTMLInputElement>);
};

const InputStyled = styled.input`
  background: red;
`;

const FilterInputs = (props: ComponentProps) => {
  const { handleUserFilterInputs } = props;

  // const handleFilterChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
  //   handleUserFilterInputs(evt.target.name, evt.target.value);
  // };

  return (
    <div>
      <h1>FilterQueries</h1>
      <InputStyled
        type="text"
        name="searchQuery"
        onChange={handleUserFilterInputs}
      />
      {/* Add in an input for year that also uses HANDLE FILTER CHANGE */}
      {/* Add in an input for page Number (might need additional code to manage this) that also uses HANDLE FILTER CHANGE */}
    </div>
  );
};

export default FilterInputs;
