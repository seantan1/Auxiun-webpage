import React from "react";
import "./css/Announcement.css";
import darkThemeContext from "../darkThemeContext";
import { useContext } from "react";

const Announcement = () => {
  const { darkTheme } = useContext(darkThemeContext);
  return (
    <div>
      <div className="announcement-banner">
        <h5 className="announcement-banner-text">Recent Announcements</h5>
        <div class="container-announcement">
          <div class="card">
            <div class="card-header">
              <img
                src="https://www.businessbecause.com/uploads/default/news/images/1621927997.webp"
                alt="rover"
              />
            </div>
            <div class="card-body" style={{ backgroundColor: darkTheme ? '#2c2c2c' : '#fff' }}>
              <h4>
                Fornite Inspired This MBA To Launch An Award-Winning NFT Startup
              </h4>
              <p>
                Aws Al-Hasani’s love of video games like Fortnite inspired him
                to launch an NFT startup, Auxiun, with the help of an MBA degree
                from John Molson School of Business
              </p>
              <a href="https://www.businessbecause.com/news/entrepreneurs/7655/mba-nft-startup?sponsored">
                {" "}
                <button style={{
                  backgroundColor: darkTheme ? '#4b4b4b' : '',
                  color: darkTheme ? 'white' : ''
                }}>Read More</button>
              </a>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <img
                src="https://compote.slate.com/images/18a43828-7b91-49c6-8055-f6cdd499f599.jpeg?width=840&rect=1560x1040&offset=0x0"
                alt="ballons"
              />
            </div>
            <div class="card-body" style={{ backgroundColor: darkTheme ? '#2c2c2c' : '#fff' }}>
              {/* <span class="tag tag-purple">Popular</span> */}
              <h4>
                Can an NFT Artist Sell Virtually the Same Work More Than Once?
              </h4>
              <p>
                This is interesting for artists that are looking to publish via
                NFTs
              </p>

              <a href="https://slate.com/technology/2021/06/nft-legal-questions-ali-sabet-quarantine-magic-in-motion.html">
                <button style={{
                  backgroundColor: darkTheme ? '#4b4b4b' : '',
                  color: darkTheme ? 'white' : ''
                }}>Read More</button>
              </a>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <img
                src="https://images6.alphacoders.com/312/thumb-1920-312773.jpg"
                alt="city"
              />
            </div>
            <div class="card-body" style={{ backgroundColor: darkTheme ? '#2c2c2c' : '#fff' }}>
              <h4>
                Vine’s creator is now working on NFT blockchain video games
              </h4>
              <p>
                Dom Hofmann, one of Vine’s founders and the creator of Byte and
                Peach, has a new project called Supdrive.
              </p>
              <a href="https://www.theverge.com/2021/8/19/22632765/vine-creator-dom-hofmann-blockchain-video-game-nft-supdrive">
                <button style={{
                  backgroundColor: darkTheme ? '#4b4b4b' : '',
                  color: darkTheme ? 'white' : ''
                }}>Read More</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
