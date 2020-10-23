import React from 'react'
import styled from 'styled-components';

function Header() {
    return (
        <HeaderContainer>
            <img id="header__logo" src={require('../../../imgs/Cam_On.svg')} alt="Logo" />
            <ul id="header__nav">
                <li className="header__navItem">Home</li>
                <li className="header__navItem">How To Use</li>
                <li className="header__navItem">About</li>
            </ul>
            <ul id="header__navRight">
                <li className="header__login">Login</li>
                <li className="header__signup active">Sign Up</li>
            </ul>
        </HeaderContainer>
    )
}

export default Header;

const HeaderContainer = styled.div`
    display: flex;
    padding: 0px 50px;
    #header__logo {
        height: 50px;
    }
    #header__nav {
        display: flex;
        flex-direction: row;
        list-style-type: none;
    }
    .header__navItem {
        padding: 0 15px;
    }
    #header__navRight {
        display: flex;
        flex-direction: row;
        list-style-type: none;
        justify-content: flex-end;
        flex: 1;
        align-items: flex-end;
        & > li {
            margin: 0 10px;
            padding: 10px 15px;
            border-radius: 12px;
        }
    }
    .active {
        color: #ffffff;
        background: #4b4444;
    }
`;