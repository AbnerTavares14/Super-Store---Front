import styled from "styled-components";

const SubContainer = styled.div`
    max-width: 968px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0;
    & > span:first-of-type {
        font-size: 40px;
        font-weight: 600;
        color: red;
        padding-bottom: 50px;
    }
    & > span:last-of-type {
        font-size: 24px;
        padding-bottom: 200px;
    }
`;
const BackToMainButton = styled.button`
  width: 300px;
  height: 50px;
  margin: 70px 0;
  border-radius: 5px;
  color: #fff;
  background-color: #1976d2;
  cursor: pointer;
  &:hover {
    filter: brightness(120%);
  }
`;

export {
    SubContainer, BackToMainButton
}