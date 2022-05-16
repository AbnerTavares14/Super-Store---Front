import styled from "styled-components";

const FinalizePurchase = styled.button`
    margin-top: 20px;
    width: 260px;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
    pointer-events: ${(props) => (props.disabled ? "none" : "all")};
    opacity: ${(props) => (props.disabled ? 0.7 : 1)};
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    text-align: center;
    background-color: #4a85c4;
    color: #fff;
    &:hover {
    filter: brightness(120%);
    }
`

const MyCart = styled.div`
    width: 450px;
    height: 190px;
    margin-bottom: 12px;
    border-radius: 5px;
    border: solid 1px #DDD;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    padding: 10px;
    img{
        width: 150px;
        height: 150px;
        margin-right: 5px;
    }
`

const ContainerItem = styled.div`
    display: flex;
    position: relative;

    ion-icon[name="trash-outline"] {
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
    }
`

const Item = styled.div`
    margin-left: 5px;
    position: relative;
    h2 {
        font-family: "Lexend Deca", sans-serif;
        font-size: 18px;
        color: #000;
        font-weight: bold;
        margin-bottom: 5px;
    }
    p {
        font-family: "Lexend Deca", sans-serif;
        font-size: 14px;
        color: #555;
    }
    h4 {
        font-family: "Lexend Deca", sans-serif;
        font-size: 14px;
        color: #555;
        margin-right: 5px;
        position: absolute;
        bottom: 5px;
    }
    .price {
        font-family: "Lexend Deca", sans-serif;
        font-size: 14px;
        color: #555;
        position: absolute;
        bottom: 5px;
        right: 0;
    }
    ion-icon[name="remove-circle-outline"] {
        position: absolute;
        bottom: 3px;
        left: 95px;
        cursor: pointer;
    }
    ion-icon[name="add-circle-outline"] {
        position: absolute;
        bottom: 3px;
        left: 145px;
        cursor: pointer;
    }
    span {
        display: flex;
    }
`

const PurchaseSummary = styled.aside`
    width: 300px;
    height: 400px;
    margin-left: 35px;
    margin-top: 50px;
    h1{
        font-family: "Lexend Deca", sans-serif;
        font-size: 20px;
        margin-bottom: 3px;
        color: #036AA3;
    }
`

const InfoSummary = styled.div`
    width: 290px;
    height: 170px;
    border-radius: 5px;
    border: 1 solid #FFF;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    background-color: #DDDD;
    padding: 15px;
    span {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    h2 {
        font-family: "Lexend Deca", sans-serif;
        font-size: 20px;
        color: #555;
        font-size: 17px;
    }
    h3 {
        font-family: "Lexend Deca", sans-serif;
        font-size: 20px;
        color: #000;
        font-size: 15px;
    }
`

const Body = styled.div`
    display: flex;
    justify-content: center;
`

const Quantity = styled.div`
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    border-radius: 3px;
    border: 1px solid #DDD;
    position: absolute;
    bottom: 0;
    left: 115px;
    .quantity {
        font-family: "Lexend Deca", sans-serif;
        font-size: 12px;
        color: #000;
    }
`

const ContainerCart = styled.section`
    display: flex;
    flex-direction: column;
    width: 480px;
    margin-left: 10px;
    padding-top: 50px;
    h1{
        font-family: "Lexend Deca", sans-serif;
        font-size: 20px;
        color: #036AA3;
        margin-bottom: 5px;
    }
    h3 {
        font-family: "Lexend Deca", sans-serif;
        font-size: 20px;
        color: #666666;
        margin-bottom: 20px;
    }
`
const ContainerCartVoid = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10px;
    padding-top: 50px;
    h1{
        font-family: "Lexend Deca", sans-serif;
        font-size: 20px;
        color: #036AA3;
        margin-bottom: 5px;
    }
    h3 {
        font-family: "Lexend Deca", sans-serif;
        font-size: 20px;
        color: #666666;
        margin-bottom: 20px;
    }
`


const Info = styled.div`
    padding: 10px;
    ion-icon {
        font-size: 180px;
        color: #036AA3;
        text-align: center;
    }
    
    p {
        font-family: "Lexend Deca", sans-serif;
        font-size: 20px;
        color: #036AA3;
    }
`

export {
    Info,
    ContainerCart,
    ContainerCartVoid,
    ContainerItem,
    MyCart,
    Quantity,
    Body,
    InfoSummary,
    PurchaseSummary,
    FinalizePurchase,
    Item
}