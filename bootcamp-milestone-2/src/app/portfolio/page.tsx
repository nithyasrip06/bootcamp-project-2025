export default function PortfolioPage() {
  return (
    <main>
      <h1 className="page-title">portfolio</h1>

      <div className="project">
        <a href="/" className="item-link">
          <img
            src="/images/portfolio_img.png"
            alt="Screenshot of my personal website"
            className="project-image"
            width={400}
            height={250}
          />
        </a>

        <div className="project-details">
          <p className="project-name"><strong>Personal Portfolio Website</strong></p>
          <p className="project-description">
            My first personal website project built with HTML and CSS. It includes a blog, resume,
            and contact page, and serves as the foundation of my online portfolio.
          </p>
          <a href="/">Learn More</a>
        </div>
      </div>
    </main>
  );
}
