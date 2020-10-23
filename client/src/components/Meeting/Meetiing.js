import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
// import peer from 'peer';
import Video from '../Video/Video';
import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import Allow from '../Allow/Allow';
import { useCallback } from 'react';

const HOST =  "http://localhost:5000";
const socket = io(HOST);

function Meetiing() {
    
    let location = useLocation();
    let params = useParams();

    /* videos used For updating DOM if peers connect or disconnect (in call.on('close') and update the value using latest state version from refVideos.current values) */
    const [videos, setVideos] = useState({});
    const [pending, setPending] = useState({});
    const [roomId, setRoomId] = useState(null);
    const [myId, setMyId] = useState(null);

    /* refVideos used For Getting Latest Video State Value In call.on('close') which being an event handler uses initial state values */
    const refVideos = useRef({});
    const peers = useRef();
    const myName = useRef('John Doe');
    const myStream = useRef();
    const myPeer = useRef();
    const STACK_NO = useRef(0);

    // const sendUserName = (conn, peerId) => {
    //     if(!conn) {
    //         conn = myPeer.current.connect(peerId);
    //     }
    //     conn.on('open', () => {
    //         conn.on('data', (name) => {
    //             // setUserNames([...userNames, name])
    //         })
    //         conn.send(myName);
    //     })
    // }

    const addVideoStream = (userVideo, stream) => {
        if(!videos[stream.id]) {
            setVideos(videos => {
                refVideos.current = {
                    ...videos, [stream.id]: userVideo
                }
                return {
                    ...videos, [stream.id]: userVideo
                }
            })
            STACK_NO.current++;
        } else 
            return;
    }

    /* Call The User Trying To Connect Using Their PeerId and your stream */
    const answerCall = useCallback((peerId, name) => {
        delete pending[peerId];
        const call = myPeer.current.call(peerId, myStream.current);
        call.on('stream', userStream => {
            socket.emit('myName', myName.current);
            let uid = 'user' + roomId + STACK_NO.current;
            const video = <Video key={uid} name={name} id={uid} srcObj={userStream}/>;
            addVideoStream(video, userStream)
            
            call.on('close', () => {
                if(refVideos.current[userStream.id]) {
                    setVideos(videos => {
                        delete refVideos.current[userStream.id]
                        return refVideos.current;
                    })
                }
            })

            peers.current = {
                ...peers.current, [peerId]: call
            }
        })
    }, [pending])

    /* Answer Admin User Trying To Call You By Sending Your Stream */
    const callAdminUser = (call) => {
        call.answer(myStream.current);
        call.on('stream', userStream => {
            socket.emit('myName', myName.current);
            let uid = 'user' + params.roomId + STACK_NO.current;
            const video = <Video key={uid} id={uid} srcObj={userStream} />;
            addVideoStream(video, userStream);
        })
    }

    useEffect(() => {
        myPeer.current = new window.Peer(undefined, {
            host: '/',
            port: 5001
        });
    }, [])

    useEffect(() => {
        let name = location.name;
        myName.current = name ? name : myName.current;
        setRoomId(params.roomId);

        /* Run on second render when state is set */
        if(roomId) {
            
            /* Get Your PeerId And Send Admin A Request To Join */
            myPeer.current.on('open', peerId => {
                socket.emit('join', roomId, peerId, myName.current);
                setMyId(peerId)
            })

            // navigator.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia|| navigator.mediaDevices.mozGetUserMedia;
            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            }).then(stream => {

                myStream.current = stream;
                let uid = 'user' + params.roomId + STACK_NO.current;
                const myVideo = <Video key={uid} name={myName.current} id={uid} muted={true} srcObj={stream}/>;
                addVideoStream(myVideo, stream);
                
                myPeer.current.on('call', call => {
                    callAdminUser(call)
                })
                
                /* Send Admin User Notification For A New User Trying To Connect */
                socket.on('user-connected', ({ peerId, name }) => {
                    setPending(pending => {
                        return {
                            ...pending, [peerId]: name
                        }
                    })
                })
            });

            
            socket.on('userName', name => {
                console.log(name)
            });

            socket.on('user-disconnected', peerId => {
                if(peers.current[peerId]) {
                    peers.current[peerId].close();
                    delete peers.current[peerId];
                }
            })

            return () => {
                navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                })
                .then(stream => {
                    stream.getTracks().forEach((track) => track.stop())
                })
                myPeer.current.destroy();
            }
        }
    }, [roomId])

    return (
        <MeetingContainer>
            <Allow pending={pending} answerCall={answerCall}/>
            {Object.values(videos).map(el => el)}
        </MeetingContainer>
    )
}

export default Meetiing;

const MeetingContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    grid-template-rows: 300px;
`;

/*
const connectToNewUser = (userId, stream) => {
        const call = myPeer.current.call(userId, stream);
        call.on('stream', userVideoStream => {
            let uid = 'user' + roomId + STACK_NO.current;
            const video = <Video key={uid} id={uid} srcObj={userVideoStream}/>;
            addVideoStream(video, userVideoStream)
            
            call.on('close', () => {
                if(videos[userVideoStream.id]) {
                    delete videos[userVideoStream.id];
                }
            })
        })

        setPeers({
            ...peers, [userId]: call
        })
    }
*/