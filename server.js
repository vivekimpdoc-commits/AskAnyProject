const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Determine if a topic is AI related
function isAiProject(topic) {
    const aiKeywords = [
        "ai", "artificial intelligence", "ml", "machine learning",
        "deep learning", "neural network", "nlp", "llm", "chatbot",
        "generative", "gpt", "model", "bot", "algorithm"
    ];
    const lowerTopic = topic.toLowerCase();
    return aiKeywords.some(kw => lowerTopic.includes(kw));
}

// Generate the response data
function generateData(topic, isAi) {
    if (isAi) {
        return {
            title: `Blueprint: ${topic}`,
            useCases: [
                "Automating customer support and user onboarding.",
                "Internal enterprise search and document retrieval.",
                "Personalized recommendation engines."
            ],
            process: [
                { title: "Define Goal & Scope", desc: "Identify the problem your AI tool will solve." },
                { title: "Data Collection", desc: "Gather and clean the dataset required for training." },
                { title: "Model Selection", desc: "Choose an open-source model (Llama) or API (OpenAI)." },
                { title: "Development", desc: "Write backend APIs and build a fast frontend." },
                { title: "Testing & QA", desc: "Ensure safety, reduce hallucinations, and optimize." }
            ],
            techStack: [
                { category: "Frontend & UI", tools: ["React.js", "Next.js", "Tailwind CSS"] },
                { category: "Backend & Frameworks", tools: ["Python FastAPI", "Node.js", "LangChain"] },
                { category: "AI Models & DB", tools: ["HuggingFace", "OpenAI API", "Pinecone"] }
            ],
            deployment: [
                "Containerize your backend application using Docker.",
                "Deploy backend APIs on AWS EC2 or Google Cloud Run.",
                "Host the frontend globally via Vercel or Netlify.",
                "Set up CI/CD pipelines using GitHub Actions for automatic updates."
            ],
            related: [`Advanced ${topic}`, `Building ${topic}`, `Future of ${topic}`]
        };
    } else {
        return {
            summary: `The domain of ${topic} is rapidly evolving, driven by modern technological advancements and shifting global demands. It offers immense long-term value and transformative potential.`,
            insights: [
                { title: "Market Growth", desc: "Projected 25% YoY increase, opening new global revenue streams." },
                { title: "High Efficiency", desc: "Saves up to 40+ hours per week through intelligent automation." },
                { title: "Future Proof", desc: "Builds a resilient foundation adaptable to changing market trends." }
            ],
            score: 88,
            related: [`${topic} Trends`, `Top ${topic} Tools`, `Automating ${topic}`]
        };
    }
}

// Search Endpoint
app.get('/api/search', (req, res) => {
    const topic = req.query.topic;
    
    if (!topic) {
        return res.status(400).json({ error: "Topic is required" });
    }

    // TODO: In the future, this is where we will call Google Gemini API / OpenAI 
    // to generate REAL data instead of using this local function!
    const isAi = isAiProject(topic);
    const data = generateData(topic, isAi);
    
    // Simulate slight network delay for realism
    setTimeout(() => {
        res.json({
            success: true,
            topic: topic,
            isAi: isAi,
            data: data
        });
    }, 500);
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`Test URL: http://localhost:${PORT}/api/search?topic=AI%20Chatbot`);
});
