import React, { useEffect } from 'react'
import styled from 'styled-components';

function Video({ muted, srcObj, id, name }) {

    useEffect(() => {
        const video = document.getElementById(id);
        video.srcObject = srcObj;
        video.muted = muted;
        video.addEventListener('loadedmetadata', () => {
            video.play();
        })
        return () => {
            video.removeEventListener('loadedmetadata', () => {
                video.play();
            });
            video.pause();
            video.srcObject = null;
        }
    })
    
    return (
        <VideoContainer>
            <video className='video__stream' id={id} />
            <span className='video__name'>{name ? name : ''}</span>
        </VideoContainer>
    )
}

export default Video;

const VideoContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;

    .video__stream {
        width: inherit;
        height: inherit;
        object-fit: cover;
    }

    .video__name {
        position: absolute;
        color: #ffffff;
        bottom: 5px;
        right: 5px;
    }
`;
