import React, { useEffect, useState } from 'react'

const LiveTracker: React.FC = () => {



    const src = `https://www.rainviewer.com/map.html`;


    return (
        <div className='h-screen w-screen pt-[80px] flex items-center justify-center'>
            <section
                className='w-[98vw] h-[90vh] overflow-hidden rounded-lg'
            >
                <iframe
                    src={src}
                    width="100%"
                    frameBorder="0"
                    style={{ border: 0, height: '100%', width: '100%' }}
                    allowFullScreen
                />
            </section>
        </div>
    )
}

export default LiveTracker
