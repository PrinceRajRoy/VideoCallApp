import React from 'react'
import styled from 'styled-components';
import { generateMedia } from 'styled-media-query';

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

const customBreakpoint = generateMedia({
    xl: '1350px',
    lg: '1150px',
    md: '960px',
    sm: '800px',
    xs: '600px',
    xxs: '400px'
})

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 50px;
    #header__logo {
        height: 50px;
    }
    #header__nav {
        display: flex;
        flex-direction: row;
        list-style-type: none;
        ${customBreakpoint.lessThan('sm')`
            display: none;
        `}
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

    ${customBreakpoint.lessThan('xs')`
        padding: 0px 10px;
    `}

    ${customBreakpoint.lessThan('xxs')`
        padding: 0px;
    `}
`;