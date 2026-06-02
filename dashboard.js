// --- Theme Toggle Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');

if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    lightIcon.classList.remove('hidden');
} else {
    document.documentElement.classList.remove('dark');
    darkIcon.classList.remove('hidden');
}

themeToggleBtn.addEventListener('click', function() {
    darkIcon.classList.toggle('hidden');
    lightIcon.classList.toggle('hidden');
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
    }
});

// --- Search Logic & Dynamic Layout Generation ---

const searchForm = document.getElementById('search-form');
const topicInput = document.getElementById('topic-input');
const loadingState = document.getElementById('loading-state');
const resultsHeader = document.getElementById('results-header');
const topicDisplay = document.getElementById('topic-display');
const dynamicResultsContainer = document.getElementById('dynamic-results-container');

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const topic = topicInput.value.trim();
    if (!topic) return;

    // Reset UI
    dynamicResultsContainer.innerHTML = '';
    dynamicResultsContainer.classList.remove('animate-fade-in-up');
    dynamicResultsContainer.classList.add('opacity-0');
    
    resultsHeader.classList.add('hidden', 'opacity-0');
    resultsHeader.classList.remove('opacity-100');
    
    // Show Loading
    loadingState.classList.remove('hidden');
    loadingState.classList.add('flex');
    
    loadingState.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // SIMULATED API CALL
    setTimeout(() => {
        // Detect Intent: Is it an AI Project?
        const isAi = isAiProject(topic);
        const mockData = generateMockData(topic, isAi);
        
        // Build the layout dynamically
        populateResults(topic, mockData, isAi);

        loadingState.classList.add('hidden');
        loadingState.classList.remove('flex');
        
        resultsHeader.classList.remove('hidden');
        // small delay to let display block apply
        setTimeout(() => {
            resultsHeader.classList.add('opacity-100');
            dynamicResultsContainer.classList.add('animate-fade-in-up');
            resultsHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
        
    }, 2000); 
});

function isAiProject(topic) {
    const keywords = ['ai', 'model', 'ml', 'chatbot', 'llm', 'neural', 'predictive', 'generative', 'gpt', 'machine learning', 'artificial intelligence', 'data'];
    const lowerTopic = topic.toLowerCase();
    return keywords.some(kw => lowerTopic.includes(kw));
}

function generateMockData(topic, isAi) {
    if (isAi) {
        return {
            title: `Blueprint: ${topic}`,
            feasibility: "85%",
            timeToMvp: "8-12 Weeks",
            budget: "$5,000 - $10,000",
            pipeline: ["Data Ingestion & Cleaning", "Model Training / Fine-tuning", "FastAPI Backend Integration", "React/Next.js User Interface"],
            techStack: [
                { category: "Frontend & UI", tools: ["React.js", "Tailwind CSS", "Framer Motion"] },
                { category: "AI & Machine Learning", tools: ["PyTorch / TensorFlow", "HuggingFace", "OpenAI / Anthropic APIs"] },
                { category: "Infrastructure & DB", tools: ["PostgreSQL", "Pinecone (Vector DB)", "AWS / Docker"] }
            ],
            steps: [
                "Define the specific use case, target audience, and required dataset.",
                "Set up the data ingestion pipeline and clean the training data.",
                "Develop and fine-tune the core AI model or integrate APIs.",
                "Build scalable backend microservices to handle inference requests.",
                "Design and deploy the user interface with real-time feedback."
            ]
        };
    } else {
        return {
            summary: `The domain of ${topic} is rapidly evolving, driven by modern technological advancements and shifting global demands. It offers immense long-term value and transformative potential.`,
            insights: [
                { title: "Market Growth", desc: "Projected 25% YoY increase, opening new global revenue streams." },
                { title: "High Efficiency", desc: "Saves up to 40+ hours per week through intelligent automation." },
                { title: "Future Proof", desc: "Builds a resilient foundation adaptable to changing market trends." }
            ],
            score: 88
        };
    }
}

function populateResults(topic, data, isAi) {
    topicDisplay.textContent = topic;
    
    if (isAi) {
        // ----------------------------------------------------
        // AI PROJECT DYNAMIC TEMPLATE
        // ----------------------------------------------------
        dynamicResultsContainer.innerHTML = `
            <div class="flex flex-col gap-8">
                <!-- Top Metrics Row -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                        <div class="absolute -right-4 -top-4 opacity-20"><svg class="w-32 h-32" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path></svg></div>
                        <h4 class="text-blue-100 font-bold uppercase tracking-wider text-sm mb-2">Feasibility Score</h4>
                        <div class="text-5xl font-black">\${data.feasibility}</div>
                    </div>
                    <div class="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                        <div class="absolute -right-4 -top-4 opacity-20"><svg class="w-32 h-32" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg></div>
                        <h4 class="text-emerald-100 font-bold uppercase tracking-wider text-sm mb-2">Time to MVP</h4>
                        <div class="text-5xl font-black">\${data.timeToMvp}</div>
                    </div>
                    <div class="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                        <div class="absolute -right-4 -top-4 opacity-20"><svg class="w-32 h-32" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path><path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd"></path></svg></div>
                        <h4 class="text-amber-100 font-bold uppercase tracking-wider text-sm mb-2">Estimated Budget</h4>
                        <div class="text-5xl font-black">\${data.budget}</div>
                    </div>
                </div>

                <!-- Development Pipeline -->
                <div class="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm mt-4">
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                        <div class="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl text-indigo-600 dark:text-indigo-400">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        Development Pipeline
                    </h3>
                    <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                        \${data.pipeline.map((step, idx) => \`
                            <div class="flex-1 w-full bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 text-center relative group hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors shadow-sm hover:shadow-md">
                                <div class="w-10 h-10 mx-auto bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mb-4 shadow-lg">\${idx+1}</div>
                                <p class="text-slate-800 dark:text-slate-200 font-semibold text-sm leading-relaxed">\${step}</p>
                            </div>
                            \${idx < data.pipeline.length - 1 ? \`<div class="hidden md:block text-slate-300 dark:text-slate-600 px-2"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"></path></svg></div>\` : ''}
                        \`).join('')}
                    </div>
                </div>

                <!-- Tech Stack Matrix -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    \${data.techStack.map(stack => \`
                        <div class="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all">
                            <h4 class="text-xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-slate-700/50 flex items-center gap-2">
                                <span class="text-indigo-500">❖</span> \${stack.category}
                            </h4>
                            <ul class="space-y-4">
                                \${stack.tools.map(tool => \`
                                    <li class="flex items-center gap-4 text-slate-700 dark:text-slate-300 font-medium text-lg">
                                        <div class="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                        </div>
                                        \${tool}
                                    </li>
                                \`).join('')}
                            </ul>
                        </div>
                    \`).join('')}
                </div>

                <!-- Execution Steps -->
                <div class="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm mt-4">
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                        <div class="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl text-emerald-600 dark:text-emerald-400">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
                        </div>
                        Execution Strategy
                    </h3>
                    <div class="space-y-4">
                        \${data.steps.map((step, idx) => \`
                            <div class="flex items-start gap-6 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all">
                                <div class="flex-shrink-0 w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-xl shadow-inner">\${idx+1}</div>
                                <p class="text-slate-700 dark:text-slate-300 pt-2.5 text-lg font-medium leading-relaxed">\${step}</p>
                            </div>
                        \`).join('')}
                    </div>
                </div>

            </div>
        `;
    } else {
        // ----------------------------------------------------
        // PREMIUM LATEST TEMPLATE
        // ----------------------------------------------------
        dynamicResultsContainer.innerHTML = `
            <div class="flex flex-col gap-6">
                <!-- Top Summary Card (Gradient + Glassmorphism) -->
                <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 md:p-10 text-white shadow-2xl">
                    <div class="absolute top-0 right-0 w-72 h-72 bg-white opacity-20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                    <div class="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
                    
                    <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div class="flex-1">
                            <div class="inline-block px-5 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-bold tracking-widest mb-6 shadow-sm">EXECUTIVE OVERVIEW</div>
                            <p class="text-2xl md:text-4xl font-bold leading-snug mb-2">\${data.summary}</p>
                        </div>
                        
                        <!-- Impact Score Widget -->
                        <div class="flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] w-full lg:w-auto">
                            <div class="relative flex items-center justify-center">
                                <svg class="w-36 h-36 transform -rotate-90 drop-shadow-lg">
                                    <circle cx="72" cy="72" r="60" fill="transparent" stroke="rgba(255,255,255,0.15)" stroke-width="12"></circle>
                                    <circle cx="72" cy="72" r="60" fill="transparent" stroke="#ffffff" stroke-width="12" stroke-dasharray="377" stroke-dashoffset="\${377 - (377 * data.score / 100)}" stroke-linecap="round"></circle>
                                </svg>
                                <span class="absolute text-5xl font-black drop-shadow-md">\${data.score}</span>
                            </div>
                            <span class="text-sm uppercase tracking-widest mt-6 font-bold text-indigo-50 opacity-90">Impact Score</span>
                        </div>
                    </div>
                </div>

                <!-- Premium Insights Grid -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    \${data.insights.map((insight, index) => {
                        const colors = [
                            { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800/50', iconBg: 'bg-blue-100 dark:bg-blue-900/50', iconColor: 'text-blue-600 dark:text-blue-400', iconPath: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
                            { bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800/50', iconBg: 'bg-emerald-100 dark:bg-emerald-900/50', iconColor: 'text-emerald-600 dark:text-emerald-400', iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                            { bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800/50', iconBg: 'bg-amber-100 dark:bg-amber-900/50', iconColor: 'text-amber-600 dark:text-amber-400', iconPath: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' }
                        ];
                        const theme = colors[index % colors.length];
                        return \`
                        <div class="group \${theme.bg} rounded-3xl p-8 border \${theme.border} hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                            <div class="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center \${theme.iconBg} \${theme.iconColor} shadow-sm border border-white/50 dark:border-slate-700/50 transition-transform group-hover:scale-110">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="\${theme.iconPath}"></path></svg>
                            </div>
                            <h4 class="text-2xl font-bold text-slate-900 dark:text-white mb-3">\${insight.title}</h4>
                            <p class="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">\${insight.desc}</p>
                        </div>
                        \`;
                    }).join('')}
                </div>
            </div>
        `;
    }
}
