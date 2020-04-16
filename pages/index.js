import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Map = dynamic(
  () => import('react-leaflet').then(module => module.Map),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then(module => module.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then(module => module.Marker),
  { ssr: false }
);

const Circle = dynamic(
  () => import('react-leaflet').then(module => module.Circle),
  { ssr: false }
);

const CircleMarker = dynamic(
  () => import('react-leaflet').then(module => module.CircleMarker),
  { ssr: false }
);

// https://stackoverflow.com/a/13841047
const getDistance = (lon1, lat1, lon2, lat2) => {
  const R = 6371; // radius of the earth in km
  const dLat = (lat2-lat1).toRad(); // Javascript functions in radians
  const dLon = (lon2-lon1).toRad(); 
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
          Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // distance in km
  const d2 = d * 1000; // distance in m

  return d2;
}

// converts numeric degrees to radians
if (typeof(Number.prototype.toRad) === 'undefined') {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  };
}

const destinationPosition = {
  lat: 52.631920,
  lng: 1.301181,
};

const Home = () => {
  const [currentPosition, setCurrentPosition] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // play audio on user interaction, due to Chrome policy not allowing autoplay
      document.addEventListener('click', playAudio);
  
      const playAudio = () => {
        document.getElementById('audio').play();
        document.removeEventListener('click', playAudio);
      };
    }
  }, []);

  useEffect(() => {
    if (currentPosition) {
      const distanceTo = getDistance(
        currentPosition.lng,
        currentPosition.lat,
        destinationPosition.lng,
        destinationPosition.lat
      );
      
      console.log('distanceTo', distanceTo + 'm');
    }
  }, [currentPosition, destinationPosition]);

  return (
    <div>
      <Head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Locus</title>

        <link rel="manifest" href="/manifest.json" />
        <link href="/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />

        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossOrigin="" />
      </Head>

      <main>
        <audio id="audio" autoPlay loop>
          <source src="./audio/file_example_OOG_1MG.ogg" type="audio/ogg; codecs=vorbis" />
          <source src="./audio/file_example_MP3_700KB.mp3" type="audio/mpeg" />
        </audio>

        <Map
          center={destinationPosition}
          zoom={16}
          onClick={event => setCurrentPosition(event.latlng)}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />

          {currentPosition && (
            <Marker
              position={currentPosition}
            />
          )}

          {[200, 300, 400, 500, 600].map(radius => (
            <Circle
              key={radius}
              center={destinationPosition}
              radius={radius}
            />
          ))}
        </Map>
      </main>

      <style jsx>{`
        :global(.leaflet-container) {
          height: 100vh;
        }
      `}</style>

      <style jsx global>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        /* Remove default padding */
        ul[class],
        ol[class] {
          padding: 0;
        }

        /* Remove default margin */
        body,
        h1,
        h2,
        h3,
        h4,
        p,
        ul[class],
        ol[class],
        li,
        figure,
        figcaption,
        blockquote,
        dl,
        dd {
          margin: 0;
        }

        :root {
          min-height: 100%;
        }

        /* Set core body defaults */
        body {
          min-height: 100%;
          scroll-behavior: smooth;
          text-rendering: optimizeSpeed;
          line-height: 1.5;
        }

        /* Remove list styles on ul, ol elements with a class attribute */
        ul[class],
        ol[class] {
          list-style: none;
        }

        /* Have link and buttons be indistinguishable */
        a,
        button {
          all: unset;
          cursor: pointer;
        }

        /* Make images easier to work with */
        img {
          max-width: 100%;
          display: block;
        }

        /* Natural flow and rhythm in articles by default */
        article > * + * {
          margin-top: 1em;
        }

        /* Inherit fonts for inputs and buttons */
        input,
        button,
        textarea,
        select {
          font: inherit;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font: inherit;
        }

        [hidden] {
          display: none;
        }

        [inert] {
          opacity: 0.25;
        }

        /* Remove all animations and transitions for people that prefer not to see them */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </div>
  )
}

export default Home;