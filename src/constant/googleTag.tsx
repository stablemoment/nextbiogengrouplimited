import Script from 'next/script';

const GoogleTag = () => (
  <>
    <Script src="https://www.googletagmanager.com/gtag/js?id=G-2322RG52NQ" defer />
    <Script id="gtag-inline-script">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag("js", new Date());

        gtag("config", "G-2322RG52NQ");
      `}
    </Script>
  </>
);

export default GoogleTag;
