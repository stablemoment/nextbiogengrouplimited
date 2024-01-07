const GoogleTag = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-65MCQR3LBT');
      `,
    }}
  />
);

export default GoogleTag;
