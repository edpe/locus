import Head from 'next/head';

export default function Home() {
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
      </Head>

      <main>
        <h1>Locus</h1>

        <audio autoplay loop controls>
          <source src="./audio/file_example_OOG_1MG.ogg" type="audio/ogg; codecs=vorbis" />
          <source src="./audio/file_example_MP3_700KB.mp3" type="audio/mpeg" />
        </audio>
      </main>

      <style jsx>{`
        
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
