import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import shortid from 'shortid';

function Main() {

    const history = useHistory();
    const [name, setName] = useState('');
    const [roomId, setRoomId] = useState('');
    const [mode, setMode] = useState(null);
    // const [roomId, setRoomId] = useState(null);

    const handleSubmit = e => {console.log(roomId)
        e.preventDefault();
        const room = roomId ? roomId : shortid.generate();
        history.push({
            pathname: '/' + room,
            name: name
        });
    }

    return (
        <MainContainer>
            <form onSubmit={handleSubmit}>
                <div className="main__heading">Calling A Friend Just Became Easier!</div>
                <div className="main__subheading">Host Or Join A Video Lobby! Hop In.</div>
                <div className="main__options">
                    <button className="main__joinB btn" type="button" onClick={() => setMode(0)}>Join Lobby</button>
                    <button className="main__createB btn" type="button" onClick={() => setMode(1)}>Create Lobby</button>
                </div>
                {
                    mode === 0 ? 
                    <div className="main__join">
                        <input type='text' placeholder='Room Id' onChange={(e) => setRoomId(e.target.value)}/>
                        {/* <input type='text' placeholder='Room Id' onChange={(e) => setRoomId(e.target.value)}/> */}
                        <button type="submit">Join</button>
                    </div> : mode === 1 ?
                    <div className="main__create">
                        <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)}/>
                        {/* <input type='text' placeholder='Room Id' onChange={(e) => setRoomId(e.target.value)}/> */}
                        <button type="submit">Create</button>
                    </div> : <div></div>
                }
            </form>
            <img id="main__icon" src={require('../../../imgs/conference.jpeg')} />
        </MainContainer>
    )
}

export default Main;

const MainContainer = styled.div`
    display: flex;
    height: 400px;
    padding: 0px 50px;
    align-items: flex-start;
    form {
        width: 50%;
        margin: 20px auto;
        display: flex;
        flex-direction: column;
    }
    input {
        margin: auto;
        display: block;
        height: 2em;
        border-radius: 10px;
        border-width: 1px;
        margin: 25px 0px;
    }
    button {
        width: 100px;
        height: 50px;
        border-radius: 10px;
        border-width: 1px;
        background: #28a745;
        color: #ffffff;
        cursor: pointer;
    }
    .btn {
        font-weight: bold;
        color: #ffffff;
        box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.75);
        padding: 10px 15px;
        border-radius: 12px;
    }
    .main__joinB {
        border: 1px solid rgb(186, 186, 204);
        background: #ffffff;
        color: #000000;
        &:hover {
            background: #dddcdc;
        }
    }
    .main__options {
        display: flex;
        gap: 10px;
    }
    #main__icon {
        height: 400px;
        margin: auto;
    }
    .main__heading {
        font-size: 3em;
        font-weight: bold;
    }
    .main__subheading {
        padding: 20px 0px;
    }
`;
