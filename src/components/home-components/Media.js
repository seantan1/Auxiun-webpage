import React from "react";
import "./css/Media.css";

import TwitterImage from "../../assets/twitter.png";
import TelegramImage from "../../assets/telegram.png";
import MediumImage from "../../assets/medium.png";
import LinkedinImage from "../../assets/linkedin.png";
import SocialMedia from "../../assets/social-media.svg";
import LinkedinTeam from "../../assets/linkedin-team.svg";
import ArticleImage from "../../assets/article.svg";
import ChatImage from "../../assets/chat.svg";


const Media = () => {
  return (
    <div>
      <div className="media-banner media-banner-text">
        <h5 className="image-title">A Global Community</h5>
        <h5 className="media-text">
          Learn more about our project, chat with the team and others in the
          community, have your say in shaping the future of the project
        </h5>

        <ul class="cards">
          <li>
            <a href="https://twitter.com/auxiun" class="card">
              <img
                src={SocialMedia}
                class="card__image"
                alt=""
              />
              <div class="card__overlay">
                <div class="card__header">
                  <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                    <path />
                  </svg>
                  <img
                    class="card__thumb"
                    src={TwitterImage}
                    alt=""
                  />
                  <div class="card__header-text">
                    <h3 class="card__title">Twitter</h3>
                  </div>
                </div>
                <p class="card__description">
                  Follow @Auxiun for updates and news
                </p>
              </div>
            </a>
          </li>


          <li>
            <a href="https://telegram.org/" class="card">
              <img
                src={ChatImage}
                class="card__image"
                alt=""
              />
              <div class="card__overlay">
                <div class="card__header">
                  <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                    <path />
                  </svg>
                  <img
                    class="card__thumb"
                    src={TelegramImage}
                    alt=""
                  />
                  <div class="card__header-text">
                    <h3 class="card__title">Telegram</h3>
                    {/* <span class="card__status">3 hours ago</span> */}
                  </div>
                </div>
                <p class="card__description">
                  Chat in real time with the Auxiun community!
                </p>
              </div>
            </a>
          </li>


          <li>
            <a href="https://www.businessbecause.com/news/entrepreneurs/7655/mba-nft-startup?sponsored" class="card">
              <img
                src={ArticleImage}
                class="card__image"
                alt=""
              />
              <div class="card__overlay">
                <div class="card__header">
                  <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                    <path />
                  </svg>
                  <img
                    class="card__thumb"
                    src={MediumImage}
                    alt=""
                  />
                  <div class="card__header-text">
                    <h3 class="card__title">Medium</h3>
                    {/* <span class="card__status">3 hours ago</span> */}
                  </div>
                </div>
                <p class="card__description">
                  Checkout our articles for information and updates!
                </p>
              </div>
            </a>
          </li>


          <li>
            <a href="https://www.linkedin.com/company/auxiun/" class="card">
              <img
                src={LinkedinTeam}
                class="card__image"
                alt=""
              />
              <div class="card__overlay">
                <div class="card__header">
                  <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                    <path />
                  </svg>
                  <img
                    class="card__thumb"
                    src={LinkedinImage}
                    alt=""
                  />
                  <div class="card__header-text">
                    <h3 class="card__title">Linkedin</h3>
                    {/* <span class="card__status">3 hours ago</span> */}
                  </div>
                </div>
                <p class="card__description">
                  Checkout our team and company!
                </p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Media;
