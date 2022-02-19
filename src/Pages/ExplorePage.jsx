import React from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import "./Explore.css";

function CategoryCard(props) {
  return (
    <div className="category-card">
      <a href="#category" className="category-link">
        <div className="category-icon">
          <img src={props.icon} alt="" />
        </div>
        <div className="category-label">
          <p>{props.label}</p>
        </div>
      </a>
    </div>
  );
}
function ExplorePage() {
  const [dark, setDark] = React.useState(false);
  return (
    <div className="explore-page">
      <Header setDark={setDark} dark={dark} />
      <div
        className={`ripple ${dark ? "ripple_enable" : "ripple_disable"}`}
      ></div>

      <div className="layout">
        <Sidebar />
        <div className="explore-body">
          <div className="video-categories">
            <CategoryCard
              icon="https://www.youtube.com/img/explore/destinations/icons/trending_color_32.png"
              label="Trending"
            />
            <CategoryCard
              icon="https://youtube.com/img/explore/destinations/icons/music_color_32.png"
              label="Music"
            />
            <CategoryCard
              icon="https://youtube.com/img/explore/destinations/icons/movies_color_32.png"
              label="Movies"
            />
            <CategoryCard
              icon="https://youtube.com/img/explore/destinations/icons/live_color_32.png"
              label="Live"
            />
            <CategoryCard
              icon="https://youtube.com/img/explore/destinations/icons/gaming_color_32.png"
              label="Gaming"
            />
            <CategoryCard
              icon="https://youtube.com/img/explore/destinations/icons/news_color_32.png"
              label="News"
            />
            <CategoryCard
              icon="https://youtube.com/img/explore/destinations/icons/sports_color_32.png"
              label="Sports"
            />
            <CategoryCard
              icon="https://youtube.com/img/explore/destinations/icons/learning_color_32_v1.png"
              label="Learning"
            />
            <CategoryCard
              icon="https://youtube.com/img/explore/destinations/icons/fashion_and_beauty_color_32.png"
              label="Fashion &amp; Beauty"
            />
          </div>

          <section className="trending-videos-section">
            <h2>Trending Videos</h2>
            <div className="trending-videos"></div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;
