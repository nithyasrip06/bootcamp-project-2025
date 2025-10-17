// Type for a single blog entry
type Blog = {
    title: string;
    date: string;
    description: string;
    image: string;
    imageAlt: string;
    slug: string;
  };
  
  // Array of blog entries
  const blogs: Blog[] = [
    {
      title: "Tixor",
      date: "2025-06-15",
      description: "Built a smart ticket advisor that analyzes live price & inventory to guide when to buy/sell, with an analytics engine, time-series DB, and agents for scraping and trend detection.",
      image: "images/tixor.png",
      imageAlt: "Tixor website preview",
      slug: "blog-1",
    },
    {
      title: "PowerPlay",
      date: "2025-06-25",
      description: "AI-driven trading system that arbitrages energy vs. inference marketplace prices, using a BTC price model and a decision workflow to route compute to the most profitable option.",
      image: "images/power_play.png",
      imageAlt: "PowerPlay website preview",
      slug: "blog-2",
    },
    {
      title: "RipFinder",
      date: "2025-08-01",
      description: "Unity-based AR application using YOLOv8 ONNX models to visualize rip current detections in real-time.",
      image: "images/ripfinder.png",
      imageAlt: "RipFinder preview",
      slug: "blog-3",
    },
  ];

  // Function to render the blogs
  function renderBlogs() {
    const blogContainer = document.getElementById("blog-container");
    if (!blogContainer) return;

    // Loop through the blogs and create a div for each blog
    blogs.forEach((blog) => {
      const blogDiv = document.createElement("div");
      blogDiv.classList.add("blog-item");

      // Create an image element for the blog
      const img = document.createElement("img");
      img.src = blog.image;
      img.alt = blog.imageAlt; 

      // Create a title element for the blog
      const title = document.createElement("h2");
      title.textContent = blog.title;

      // Create a date element for the blog
      const date = document.createElement("p");
      date.textContent = blog.date;

      // Create a description element for the blog
      const desc = document.createElement("p");
      desc.textContent = blog.description;

      // Create a link element for the blog
      const link = document.createElement("a");
      link.href = `blogs/${blog.slug}.html`;
      link.textContent = "Read more";  

      // Append the elements to the blog div
      blogDiv.append(img, title, date, desc, link);
      
      // Append the blog div to the container
      blogContainer.appendChild(blogDiv);
    });
  }
  
  document.addEventListener("DOMContentLoaded", renderBlogs);
  
