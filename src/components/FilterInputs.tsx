import * as React from "react";
import styled from "styled-components";
import { UserInputValues } from "../App";
import Wrapper from "./Wrapper";

type ComponentProps = {
  handleUserFilterInputs: (event: UserInputValues) => void;
};

const FilterInputsContainer = styled.section`
  background: white;
  padding: 20px 0;
  border-radius: 10px;
`;

const StyledH2 = styled.h2`
  margin: 0;
`;

const InputStyled = styled.input`
  background: #d7d7d7;
  width: 100%;
`;

const YearInput = styled(InputStyled)`
  width: 30%;
  margin-left: 5px;
  margin-top: 15px;
`;

const FilterInputs = (props: ComponentProps) => {
  const { handleUserFilterInputs } = props;

  return (
    <FilterInputsContainer>
      <Wrapper>
        <StyledH2>Choose your Nominees</StyledH2>
        <div>
          <label htmlFor="searchQuery">Search by name</label>
          <InputStyled
            type="text"
            name="searchQuery"
            placeholder="search by name"
            onChange={handleUserFilterInputs}
          />
        </div>
        <div>
          <label htmlFor="yearQuery">Choose Year:</label>
          <YearInput
            type="text"
            name="yearQuery"
            placeholder="choose year"
            onChange={handleUserFilterInputs}
          />
        </div>
      </Wrapper>
    </FilterInputsContainer>
  );
};

export default FilterInputs;
