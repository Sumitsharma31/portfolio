import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "my-portfolio",
  description: "My Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link href="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css" rel="stylesheet" />
      </head>
      <body>
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-G9EBNDGC8V" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-G9EBNDGC8V');
          `}
        </Script>

        {children}

        {/* n8n Chat */}
        <Script id="n8n-chat" strategy="lazyOnload" type="module">
          {`
            import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
            createChat({
              webhookUrl: 'https://csumitsharma31.app.n8n.cloud/webhook/2acc401e-00f2-46e7-abab-3ef95ae802f6/chat'
            });
          `}
        </Script>
      </body>
    </html>
  );
}
