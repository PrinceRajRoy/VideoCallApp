import React from 'react'
import styled from 'styled-components';
import Main from './Main/Main'

function Home() {
    return (
        <HomeContainer>
            <Main />
        </HomeContainer>
    )
}

export default Home;

const HomeContainer = styled.div`
    background: #ffffff;
    height: 100%;
`;
