import Head from 'next/head';
import Link from 'next/link';

const getCircumference = radius => {
  return 2 * Math.PI * radius;
};

const getDashOffset = (value, radius) => {
  const circumference = getCircumference(radius);
  const progress = value / 100;
  const dashoffset = circumference * (1 - progress);
  return dashoffset;
};

const Circle = ({ radius, percentage, scale = 1, rotate = 0, ...props }) => (
  <>
    <circle
      className="c--value"
      cx="60"
      cy="60"
      r={radius}
      strokeWidth="12"
      style={{
        strokeDasharray: getCircumference(radius),
        strokeDashoffset: getDashOffset(percentage, radius),
      }}
      {...props}
    />

    <style jsx>{`
      .c--value {
        fill: none;
        stroke: #eeece8;
        transform-origin: 50% 50%;
        transform: scale(${scale}) rotate(${rotate}deg);
      }
    `}</style>
  </>
);

const Home = () => {
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

        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-169611539-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-169611539-1');
        </script>
      </Head>

      <main>
        <svg className="c" width="120" height="120" viewBox="0 0 120 120">
          <Circle radius={54} percentage={60} rotate={-15} />
          <Circle radius={54} percentage={40} scale={0.82} rotate={45} strokeWidth={8} />
          <Circle radius={54} percentage={30} scale={0.72} rotate={20} strokeWidth={5} />
          <Circle radius={54} percentage={20} scale={0.72} rotate={160} strokeWidth={5} />
        </svg>

        <div className="content">
          <h1>Locus</h1>
          <strong className="slogan">Soundtrack your journey</strong>
          <p>Locus plays a personalised soundtrack that develops as you move closer to your destination. Different routes have their own unique and repeatable musical journeys, press play to begin.</p>
          <Link href="/map">
            <a className="button">Play</a>
          </Link>
        </div>
      </main>

      <style jsx>{`
        .c {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 50%;
          min-height: 100vh;
          width: auto;
          transform: rotate(-90deg) translateY(-50%) scale(1.5);
        }

        @media (min-width: 768px) {
          .c {
            transform: rotate(-90deg) translateY(-50%) scale(1.25);
          }
        }

        @media (min-width: 992px) {
          .c {
            transform: rotate(-90deg) translateY(-50%) scale(1.5);
          }
        }

        .content {
          position: fixed !important;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          min-width: 320px;
          padding: 1rem;
          overflow-y: auto;
        }

        .content > * {
          position: relative;
          background-color: #131013;
        }

        .slogan {
          margin-top: .5em;
          font-size: 0.75rem;
        }

        .content p {
          margin-top: 1em;
        }

        .button {
          display: inline-flex;
          margin-top: 1.5em;
          padding: .5rem 0;
          font-weight: bold;
          justify-content: center;
          align-items: center;
          border-bottom: 4px solid #d04642;
          letter-spacing: 1rem;
          text-transform: uppercase;
          transition: all .5s;
        }

        .button:hover,
        .button:focus {
          border-color: #fff;
        }
      `}</style>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css?family=Darker+Grotesque&display=swap');

        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        :root {
          /* font-size: calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width]))); */
          font-size: calc(25px + (30 - 20) * ((100vw - 300px) / (1600 - 300)));
        }
      
        body {
          scroll-behavior: smooth;
          text-rendering: optimizeSpeed;
          line-height: 1.5;
          font-family: 'Darker Grotesque', sans-serif;
          font-size: 1rem;
          margin: 0;
          color: #eeece8;
          background-color: #131013;
        }

        p {
          max-width: 30ch;
        }

        h1, h2, p {
          margin: 0;
          font-size: inherit;
          line-height: 1;
        }

        h1 {
          font-size: 1.5rem;
        }

        p {
          line-height: 1.25;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button {
          all: unset;
        }
      `}</style>
    </div>
  )
}

export default Home;