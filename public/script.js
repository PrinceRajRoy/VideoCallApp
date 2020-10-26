const socket = io('/');
const videoGrid = document.getElementById('video-grid');
const myPeer = new Peer(undefined, {
    host: '/',
    port: 5002
})
const peers = {};

const myVideo = document.createElement('video');
myVideo.muted = true;

myPeer.on('open', id => {
    socket.emit('join', ROOM_ID, id);
})

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream);

    myPeer.on('call', call => {
        call.answer(stream);

        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream);
        })
    })
    
    socket.on('user-connected', ({ peerId, name }) => {
        connectToNewUser(peerId, stream);
    })
});

socket.on('user-disconnected', peerId => {
    if(peers[peerId]) {
        peers[peerId].close();
        delete peers[peerId];
    }
})

function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video);
}

function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
        video.remove();
    })
    peers[userId] = call;
}