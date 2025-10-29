export interface Blog { // type also works
    title: string;
	  date: string;
    description: string;
    image: string;
    imageAlt: string;
    slug: string;
    content: string;
}

const blogs: Blog[] = [
	{
        title: "Tixor",
        date: "2025-06-15",
        description: "Built a smart ticket advisor that analyzes live price & inventory to guide when to buy/sell, with an analytics engine, time-series DB, and agents for scraping and trend detection.",
        image: "/images/tixor.png",
        imageAlt: "Tixor website preview",
        slug: "blog-1",
        content: "Tixor is a smart ticket advisor that predicts the best time to buy or sell event tickets. I built it with Python, Node.js, and React, combining live data scraping, a time-series database, and trend detection. It's like a stock market for tickets-analyzing real-time price changes to help fans make smarter decisions."
      },
      {
        title: "PowerPlay",
        date: "2025-06-25",
        description: "AI-driven trading system that arbitrages energy vs. inference marketplace prices, using a BTC price model and a decision workflow to route compute to the most profitable option.",
        image: "/images/power_play.png",
        imageAlt: "PowerPlay website preview",
        slug: "blog-2",
        content: "PowerPlay was built during the MARA Hackathon. It's an AI-driven system that arbitrages between energy and inference markets to optimize compute usage. I developed the trading logic and integrated a Bitcoin price model to route resources for maximum efficiency and profit."
      },
      {
        title: "RipFinder",
        date: "2025-08-01",
        description: "Unity-based AR application using YOLOv8 ONNX models to visualize rip current detections in real-time.",
        image: "/images/ripfinder.png",
        imageAlt: "RipFinder preview",
        slug: "blog-3",
        content: "RipFinder is a Unity-based AR app that detects rip currents in real time using YOLOv8 models. It highlights dangerous water zones through live camera feed overlays, helping improve beach safety. The model achieved around 91% precision in detecting hazardous areas."
      }
];

export default blogs; // This will allow us to access this data anywhere!