import React from 'react'
import styled from 'styled-components';
import Header from './Header/Header';
import Main from './Main/Main'

function Home() {
    return (
        <HomeContainer>
            <Header />
            <Main />
        </HomeContainer>
    )
}

export default Home;

const HomeContainer = styled.div`
    background: #ffffff;
    padding: 20px;
`;
