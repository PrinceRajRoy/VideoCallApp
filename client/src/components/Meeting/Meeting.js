import React from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
// import peer from 'peer';
import Video from '../Video/Video';
import { withRouter } from 'react-router-dom';

const HOST =  "http://localhost:5000";
var id = 1;

class Meeting extends React.Component {

    constructor() {
        super();
        this.state = {
            name: 'John Doe',
            peers: {},
            videos: {},
            ROOM_ID: null,
            myId: null,
            myPeer: new window.Peer(undefined, {
                host: '/',
                port: 5001
            }),
            socket: io(HOST)
        };
    }

    addVideoStream = (userVideo, stream) => {
        if(!this.state.videos[stream.id]) {
            this.setState({
                ...this.state, videos: {...this.state.videos, [stream.id]: userVideo}
            });
        } else 
            return;
    }

    connectToNewUser = (userId, stream, name) => {
        const call = this.state.myPeer.call(userId, stream);
        call.on('stream', userVideoStream => {
            let uid = 'user' + this.state.ROOM_ID + id++;
            const video = <Video key={uid} id={uid} srcObj={userVideoStream}/>;
            this.addVideoStream(video, userVideoStream)
            
            call.on('close', () => {
                if(this.state.videos[userVideoStream.id]) {
                    var videos = this.state.videos;
                    delete videos[userVideoStream.id];
                    this.setState({
                        ...this.state, videos: videos
                    })
                }
            })
        })
        this.setState({
            ...this.state, peers: {...this.state.peers, [userId]: call}
        });
    }

    sendUserName = (conn, peerId, id) => {
        let userName = '';
        if(!conn) {
            conn = this.state.myPeer.connect(peerId);
        }
        conn.on('open', () => {
            conn.on('data', (name) => {console.log(name, document.querySelector(`#user${this.state.ROOM_ID + id} + .video__name`))
                document.querySelector(`#user${this.state.ROOM_ID + id} + .video__name`).innerHTML = name;
            })
            conn.send(this.state.name);
        })
    }

    componentDidMount() {

        let name = this.props.location.name;
        
        this.setState({
            ...this.state,
            ROOM_ID: this.props.match.params.roomId,
            name: name ? name : this.state.name
        });
        
        this.state.myPeer.on('open', id => {
            this.state.socket.emit('join', this.state.ROOM_ID, id, this.state.name);
            this.setState({
                ...this.state, myId: id
            })
        })
    
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(stream => {
            let uid = 'user' + this.state.ROOM_ID + id++;
            const myVideo = <Video key={uid} name={this.state.name} id={uid} muted={true} srcObj={stream}/>;
            this.addVideoStream(myVideo, stream);
            
            this.state.myPeer.on('connection', (conn) => {
                this.sendUserName(conn, null, id);
            })
            
            this.state.myPeer.on('call', call => {
                this.sendUserName(null, call.peer, id);
                call.answer(stream);
                call.on('stream', userVideoStream => {
                    let uid = 'user' + this.state.ROOM_ID + id++;
                    const video = <Video key={uid} id={uid} srcObj={userVideoStream} />;
                    this.addVideoStream(video, userVideoStream);
                })

            })
            
            this.state.socket.on('user-connected', ({ userId, name }) => {console.log(userId)
                this.connectToNewUser(userId, stream, name);
            })
        });

        this.state.socket.on('user-disconnected', userId => {
            if(this.state.peers[userId]) {
                this.state.peers[userId].close();
                var peers = this.state.peers;
                delete peers[userId];
                this.setState({
                    ...this.state,
                    peers: peers
                })
            }
        })
    }
    
    // UNSAFE_componentWillMount() {
    //     navigator.mediaDevices.getUserMedia({
    //         video: true,
    //         audio: true
    //     }).then(stream => {
    //         stream.getTracks()
    //             .forEach((track) => track.stop())
    //     })
    // }

    render() {
        return (
            <MeetingContainer>
                {Object.values(this.state.videos).map(el => el)}
            </MeetingContainer>
        );
    }
}

export default withRouter(Meeting);

const MeetingContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    grid-template-rows: 300px;
`;