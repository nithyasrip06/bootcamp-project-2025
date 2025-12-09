import connectDB from "@/database/db";
import Project from "@/database/projectSchema";
import Comment, { type IComment } from "@/components/Comment";
import CommentForm from "@/components/CommentForm";

// Force dynamic rendering to prevent build-time database connection
export const dynamic = 'force-dynamic';

async function getProjects() {
  await connectDB(); // function from db.ts

  try {
    // query for all projects and sort by date
    const projects = await Project.find().sort({ date: -1 }).orFail();
    // send a response as the projects as the message
    return projects;
  } catch (err) {
    return null;
  }
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <main>
      <h1 className="page-title">portfolio</h1>

      {projects && projects.length > 0 ? (
        projects.map((project) => (
          <div key={project._id.toString()} className="project">
            <div className="project-content">
              <a href={project.link} className="item-link">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="project-image"
                  width={400}
                  height={250}
                />
              </a>

              <div className="project-details">
                <p className="project-name">
                  <strong>{project.name}</strong>
                </p>
                <p className="project-description">{project.description}</p>
                <a href={project.link}>Learn More</a>
              </div>
            </div>

            {/* Comments Section for each project */}
            <div className="comments-section">
              <h3>Comments</h3>
              {project.comments && project.comments.length > 0 ? (
                project.comments.map((comment: IComment, index: number) => (
                  <Comment key={index} comment={comment} />
                ))
              ) : (
                <p>No comments yet. Be the first to comment!</p>
              )}
              
              {/* Comment Form */}
              <CommentForm projectId={project._id.toString()} />
            </div>
          </div>
        ))
      ) : (
        <p>No projects found.</p>
      )}
    </main>
  );
}
