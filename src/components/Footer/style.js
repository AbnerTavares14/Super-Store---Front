import styled from "styled-components";

const Container = styled.footer`
    width: 100vw;
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFF;
    background-color: #005AA3;
`;

const LogoContainer = styled.div`
    cursor: pointer;
    img{
        width: 210px;
        height: 115px;
    }
`

export {
    Container,
    LogoContainer
}