import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Allow({ pending, answerCall }) {

    return (
        <AllowContainer pending={pending}>
            {Object.entries(pending).map(([peerId, name]) => <div key={peerId} className='allow__user'><span>{name}</span><button onClick={() => answerCall(peerId, name)}>Allow</button></div>)}
        </AllowContainer>
    )
}

export default Allow

const AllowContainer = styled.div`
    display: ${({ pending }) => Object.entries(pending).length ? 'block' : 'none'};
    background: black;
    color: #fff;
    height: 100px;
    z-index: 999;
    width: 60%;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);

    .allow__user {
        text-align: center;
    }
`;
