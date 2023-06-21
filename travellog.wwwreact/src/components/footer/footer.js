import instagram from "../../images/instagram.png";
import linkedin from "../../images/linkedin.png";

import "./footer.css";

function Footer() {
  return (
    <>
      <footer>
        <p>
          Created by{" "}
          <a href="https://maxderuiter.com/" target="_blank" rel="noreferrer">
            Max de Ruiter
          </a>
        </p>
        <div>
          <a
            href="https://www.instagram.com/feedofmax/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={instagram} alt="instagram link" />
          </a>
          <a
            href="https://www.linkedin.com/in/max-de-ruiter-2a8871181/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={linkedin} alt="linkedin link" />
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
