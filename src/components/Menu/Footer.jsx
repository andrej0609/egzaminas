const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="footer__content">
              <div className="footer__logo">
                <a href="/">
                  <img src="https://dt2sdf0db8zob.cloudfront.net/wp-content/themes/websiteplanet/img/wsp-logo-schema.png" alt="logo" />
                </a>
              </div>
              <div className="footer__social">
                <a href="/">
                  <i className="fas fa-rss"></i>
                </a>
                <a href="/">
                  <i className="fas fa-envelope"></i>
                </a>
                <a href="/">
                  <i className="fas fa-phone"></i>
                </a>
                <a href="/">
                  <i className="fas fa-map-marker-alt"></i>
                </a>
              </div>
              <div className="footer__menu">
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/">About</a>
                  </li>
                  <li>
                    <a href="/">Contact</a>
                  </li>
                </ul>
              </div>
              <div className="footer__copy">
                <p>
                  &copy; 2023 <a href="/">Egzaminas</a>. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;