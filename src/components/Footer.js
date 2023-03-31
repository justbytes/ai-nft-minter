import React from "react";

//Import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faTwitter,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

export function Footer() {
  return (
    <footer>
      <a href="discord.com">
        <FontAwesomeIcon
          icon={faDiscord}
          size="lg"
          style={{ color: "#e7eaee" }}
        />
      </a>
      <a href="twitter.com">
        <FontAwesomeIcon
          icon={faTwitter}
          size="lg"
          style={{ color: "#e7eaee" }}
        />
      </a>
      <a href="https://github.com/justbytes/ai-nft-minter">
        <FontAwesomeIcon
          icon={faGithub}
          size="lg"
          style={{ color: "#e7eaee" }}
        />
      </a>
    </footer>
  );
}
