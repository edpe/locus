import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import ReactGA from 'react-ga';
import Tone from 'tone';

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

// the minimum distance to a secondary location before the distance is reported
const MIN_DISTANCE_SECONDARY = 100; // meters

// converts numeric degrees to radians
if (typeof(Number.prototype.toRad) === 'undefined') {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  };
}

// https://stackoverflow.com/a/13841047
const getDistance = (lng1, lat1, lng2, lat2) => {
  const R = 6371; // radius of the earth in km
  const dLat = (lat2-lat1).toRad(); // Javascript functions in radians
  const dLng = (lng2-lng1).toRad(); 
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
    Math.sin(dLng/2) * Math.sin(dLng/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // distance in km
  const d2 = d * 1000; // distance in m

  return d2;
}

// report [A-D][1-5] e.g. "B3"
const destinationPosition = {
  lat: 52.631920,
  lng: 1.301181,
};

const directionMap = {
  A: 'top left',
  B: 'top right',
  C: 'bottom left',
  D: 'bottom right',
};

// Todo:
// primary -> "locus"
// secondary -> "sites"

const MapPage = () => {
  const [currentPosition, setCurrentPosition] = useState();
  const [debugOutput, setDebugOutput] = useState({});
  const [locationKey, setLocationKey] = useState();

  // report current distance from location
  // -1 distanceTo means the location is out of range
  const [secondaryLocations, setSecondaryLocations] = useState([
    {
      id: 'location-a',
      location: {
        lat: 52.634091698088575,
        lng: 1.3045236883519131,
      },
      distanceTo: -1,
    },
    {
      id: 'location-b',
      location: {
        lat: 52.6340265844073,
        lng: 1.2918815680726061,
      },
      distanceTo: -1,
    },
  ]);

  const withDebug = typeof window !== 'undefined' && location.search.includes('debug=1');
  const withMockLocation = typeof window !== 'undefined' && location.search.includes('mock=1');

  // meters
  const distances = [200, 300, 400, 500, 600, 1300];

  useEffect(() => {
    ReactGA.event({
      category: 'Location',
      action: locationKey,
    });
  }, [locationKey]);

  useEffect(() => {
    ReactGA.pageview('/map');

    if (typeof window !== 'undefined') {
      // play audio on user interaction, due to Chrome policy not allowing autoplay
      document.addEventListener('click', playAudio);
  
      const playAudio = () => {
        document.getElementById('audio').play();
        document.removeEventListener('click', playAudio);
      };

      if (!withMockLocation) {
        const watchId = window.navigator.geolocation.watchPosition(({ coords }) => {
          setCurrentPosition({
            lng: coords.longitude,
            lat: coords.latitude,
          });
        });

        return () => {
          window.navigator.geolocation.clearWatch(watchId);
        };
      }
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

      const outOfBounds = distanceTo > distances[distances.length - 1];

      let debug = {
        lng: currentPosition.lng,
        lat: currentPosition.lat,
        distance: distanceTo.toFixed(2) + 'm',
      };

      const nextSecondaryLocations = secondaryLocations.map(destination => {
        const distance = getDistance(
          currentPosition.lng,
          currentPosition.lat,
          destination.location.lng,
          destination.location.lat
        );

        debug[destination.id] = (distance <= MIN_DISTANCE_SECONDARY)
          ? distance.toFixed(2) + 'm'
          : -1;

        return {
          ...destination,
          distanceTo: (distance <= MIN_DISTANCE_SECONDARY)
            ? distance.toFixed(2)
            : -1,
        };
      });
      
      console.group();
      console.log('current position', currentPosition);
      console.log('distance away', debug.distance);
      console.log('secondary locations', nextSecondaryLocations.map(({ id, distanceTo }) => ({
        id,
        distanceTo,
      })));

      const directionKey = (() => {
        if (outOfBounds) {
          return;
        }

        if (
          currentPosition.lng <= destinationPosition.lng &&
          currentPosition.lat <= destinationPosition.lat
        ) {
          return 'C'; // bottom left
        } else if (
          currentPosition.lng >= destinationPosition.lng &&
          currentPosition.lat <= destinationPosition.lat
        ) {
          return 'D'; // bottom right
        } else if (
          currentPosition.lng <= destinationPosition.lng &&
          currentPosition.lat >= destinationPosition.lat
        ) {
          return 'A'; // top left
        }

        return 'B'; // top right
      })();

      let distanceKey;
      if (!outOfBounds) {
        distances.some((distance, index) => {
          if (distanceTo <= distance) {
            distanceKey = index + 1;
            return true;
          }
        });
      }
      
      if (directionKey) {
        debug.direction = directionMap[directionKey];
        debug.key = directionKey + distanceKey;

        console.log('direction', debug.direction);
        console.log('key', debug.key);

        setLocationKey(debug.key);
      }

      console.groupEnd();

      setSecondaryLocations(nextSecondaryLocations);
      setDebugOutput(debug);
    }
  }, [
    currentPosition,
    destinationPosition,
  ]);

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
          onClick={event => {
            if (withMockLocation) {
              setCurrentPosition(event.latlng);
            }

            if (typeof window !== 'undefined') {
              // create a synth and connect it to the master output (your speakers)
              const synth = (new Tone.Synth()).toMaster();

              // play a middle 'C' for the duration of an 8th note
              synth.triggerAttackRelease('C4', '8n');
            }}
          }
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />

          {currentPosition && (
            <Marker
              position={currentPosition}
            />
          )}

          <Marker
            position={destinationPosition}
          />

          {secondaryLocations.map(({ id, location }) => (
            <React.Fragment key={id}>
              <Marker
                position={location}
              />
              <Circle
                center={location}
                radius={MIN_DISTANCE_SECONDARY}
              />
            </React.Fragment>
          ))}

          {distances.map(radius => (
            <Circle
              key={radius}
              center={destinationPosition}
              radius={radius}
            />
          ))}
        </Map>

        {(withDebug && Object.keys(debugOutput).length) && (
          <div className="debug">
            {Object.entries(debugOutput).map((x, i) => (
              <div key={i}>
                <b>{x[0]}</b>: {x[1]}
              </div>
            ))}
          </div>
        )}
      </main>

      <style jsx>{`
        .debug {
          position: fixed;
          top: 0;
          right: 0;
          z-index: 9999;
          padding: 20px;
          text-align: right;
          background: #fff;
        }
      `}</style>

      <style jsx global>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
      
        body {
          scroll-behavior: smooth;
          text-rendering: optimizeSpeed;
          line-height: 1.5;
          font-family: Arial;
          margin: 0;
        }

        .leaflet-container {
          height: 100vh;
        }
      `}</style>
    </div>
  )
}

export default MapPage;