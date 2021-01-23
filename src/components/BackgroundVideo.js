import React from 'react';

export default function BackgroundVideo({...props}) {
    return (
        <video key={props.vKey} className='background' autoPlay loop muted>
            <source src={props.source} type='video/mp4' />
        </video>
    );
}