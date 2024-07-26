import React, { useEffect, useState } from 'react'

const LiveTracker: React.FC = () => {
    const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (err) => {
            setError('Failed to retrieve location. Please enable location services and refresh the page.');
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    }, []);
    if (error) {
      return <div>{error}</div>;
    }
    if (!location) {
      return <div>Loading...</div>;
    }
  
    const src = `https://www.rainviewer.com/map.html?loc=${location.lat},${location.lon},5&oFa=0&oC=0&oU=0&oCS=1&oF=0&oAP=0&c=3&o=83&lm=1&layer=radar&mlayer=0&sm=1&sn=1&hu=false`;


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
