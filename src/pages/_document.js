import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>AI Domain Finder</title>
        <meta name="description" content="Find the perfect startup name and domain with AI." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="AI Domain Finder" />
        <meta property="og:description" content="Find the perfect startup name and domain with AI." />
        <meta property="og:image" content="https://uploads-ssl.webflow.com/65d92278c643d1d4d3f5a32d/666b7bf287a3ea798ec9d436_Meta-SeekingDomain.png" />
        <meta property="og:url" content="http://seeking.domains/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Domain Finder" />
        <meta name="twitter:description" content="Find the perfect startup name and domain with AI." />
        <meta name="twitter:image" content="https://uploads-ssl.webflow.com/65d92278c643d1d4d3f5a32d/666b7bf287a3ea798ec9d436_Meta-SeekingDomain.png" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
