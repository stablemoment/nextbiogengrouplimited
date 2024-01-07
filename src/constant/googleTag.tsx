const GoogleTag = () => (
  <>
    {/* Google tag (gtag.js) */}
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-65MCQR3LBT"></script>
    <script>
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-65MCQR3LBT');
      `}
    </script>
  </>
);

export default GoogleTag;
