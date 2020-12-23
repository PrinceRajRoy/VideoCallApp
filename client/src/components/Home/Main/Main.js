import React, {useState } from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import shortid from 'shortid';
import { generateMedia } from 'styled-media-query';

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
        </MainContainer>
    )
}

export default Main;

const customBreakpoint = generateMedia({
    xl: '1350px',
    lg: '1150px',
    md: '960px',
    sm: '800px',
    xs: '600px',
    xxs: '400px'
})

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    padding: 0px 50px;
    align-items: flex-start;
    background: #3282b8;
    height: 100%;
    position: relative;
    form {
        background: #0f4c75;
        box-shadow: 0px 0px 80px -30px #000000;
        width: 50%;
        height: fit-content;
        min-height: 250px;
        border-radius: 15px;
        padding: 20px 0;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
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
    .main__join {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    #main__banner {
        height: 400px;
        margin: auto;
        ${customBreakpoint.lessThan('lg')`
            height: 350px;
        `}
        ${customBreakpoint.lessThan('md')`
            height: 300px;
        `}
    }
    .main__heading {
        font-size: 3em;
        font-weight: bold;
    }
    .main__subheading {
        padding: 20px 0px;
    }

    ${customBreakpoint.lessThan('lg')`
        .main__heading {
            font-size: 2.7em;
        }
    `}

    ${customBreakpoint.lessThan('sm')`
        flex-direction: column-reverse;
        height: auto;
        padding: 0px 10px;
        #main__banner {
            width: 100%;
            object-fit: cover;
        }
        form {
            width: 100%;
        }
    `}

    ${customBreakpoint.lessThan('xs')`
        padding: 0px 10px;
    `}

    ${customBreakpoint.lessThan('xxs')`
        padding: 0px;
    `}
`;
