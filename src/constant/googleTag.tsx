import Script from 'next/script';

const GoogleTag = () => (
  <>
    <Script src="https://www.googletagmanager.com/gtag/js?id=G-65MCQR3LBT" defer />
    <Script id="gtag-inline-script">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', 'G-65MCQR3LBT');
      `}
    </Script>
  </>
);

export default GoogleTag;
