export default function ResumePage() {
  return (
    <main>
      <h1 className="page-title">resume</h1>
      <a href="/Nithyasri_Palanisamy_Resume.pdf" download>Download Resume</a>

      <div className="resume">
        <section className="section">
          <h2 className="section-title">Education</h2>
          <div className="entry">
            <h3 className="entry-title">Bachelor of Science in Computer Science</h3>
            <p className="entry-info">
              California Polytechnic State University, San Luis Obispo | Expected Graduation May 2028
            </p>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Coursework</h2>
          <ul className="course-list">
            <li>Software Engineering I & II</li>
            <li>Systems Programming</li>
            <li>Data Structures</li>
            <li>Project-Based Object-Oriented Programming</li>
            <li>Discrete Structures</li>
            <li>Computer Organization</li>
          </ul>
        </section>

        <section className="section">
          <h2 className="section-title">Projects</h2>
          <div className="entry">
            <h3 className="entry-title">Personal Portfolio Website</h3>
            <p className="entry-info">Designed and built a personal website using HTML and CSS</p>
            <p className="entry-description">
              Built a multi-page website with navigation, contact form, and portfolio showcase to highlight my academic and personal projects.
            </p>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Experience</h2>
          <div className="entry">
            <h3 className="entry-title">Software Engineer Intern</h3>
            <p className="entry-info">Livin | June 2025 – Present</p>
            <p className="entry-description">
              Built a multi-agent roommate matching system using Google ADK and Gemini LLMs. Designed memory tools and deployed scalable agents to the cloud.
            </p>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Skills</h2>
          <ul className="skill-list">
            <li>Languages: Python, Java, C, C#</li>
            <li>Frameworks: React, Next.js, Node.js, Pandas, NumPy</li>
            <li>Tools & Platforms: GitHub, AWS, GCP, Unity, Cursor</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
