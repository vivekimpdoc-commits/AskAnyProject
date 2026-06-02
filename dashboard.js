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
            architecture: ["Python & FastAPI", "PyTorch / TensorFlow", "React.js Frontend", "PostgreSQL + Vector DB"],
            features: ["Natural Language Processing", "Real-time inference", "Scalable cloud deployment"],
            compute: ["NVIDIA A100 / H100 GPUs", "Large annotated datasets", "High memory capacity (RAM)"],
            pros: ["High accuracy and task automation.", "Scales effortlessly with big data."],
            cons: ["Requires extremely high compute cost.", "Prone to hallucination or bias."]
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
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Architecture -->
                <div class="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800/50 hover:shadow-lg transition-all">
                    <div class="flex items-center gap-3 mb-4 text-indigo-600 dark:text-indigo-400">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                        <h3 class="text-xl font-bold text-slate-900 dark:text-white">Architecture & Stack</h3>
                    </div>
                    <ul class="space-y-3">
                        ${data.architecture.map(item => `<li class="flex items-start gap-2 text-slate-700 dark:text-slate-300"><span class="text-indigo-500">•</span> ${item}</li>`).join('')}
                    </ul>
                </div>

                <!-- Features -->
                <div class="bg-sky-50 dark:bg-sky-900/20 rounded-2xl p-6 border border-sky-200 dark:border-sky-800/50 hover:shadow-lg transition-all">
                    <div class="flex items-center gap-3 mb-4 text-sky-600 dark:text-sky-400">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        <h3 class="text-xl font-bold text-slate-900 dark:text-white">Core Features</h3>
                    </div>
                    <ul class="space-y-3">
                        ${data.features.map(item => `<li class="flex items-start gap-2 text-slate-700 dark:text-slate-300"><span class="text-sky-500">•</span> ${item}</li>`).join('')}
                    </ul>
                </div>

                <!-- Compute Needs -->
                <div class="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800/50 hover:shadow-lg transition-all">
                    <div class="flex items-center gap-3 mb-4 text-amber-600 dark:text-amber-400">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
                        <h3 class="text-xl font-bold text-slate-900 dark:text-white">Data & Compute</h3>
                    </div>
                    <ul class="space-y-3">
                        ${data.compute.map(item => `<li class="flex items-start gap-2 text-slate-700 dark:text-slate-300"><span class="text-amber-500">•</span> ${item}</li>`).join('')}
                    </ul>
                </div>
            </div>

            <!-- Balanced Analysis for AI -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <!-- Positive -->
                <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-800/50 hover:shadow-lg transition-all relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2"><span class="text-emerald-500">➕</span> AI Benefits</h3>
                    <ul class="space-y-3">
                        ${data.pros.map(item => `<li class="flex items-start gap-2 text-slate-700 dark:text-slate-300"><span class="text-emerald-500">✓</span> ${item}</li>`).join('')}
                    </ul>
                </div>
                <!-- Negative -->
                <div class="bg-rose-50 dark:bg-rose-900/20 rounded-2xl p-6 border border-rose-200 dark:border-rose-800/50 hover:shadow-lg transition-all relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2"><span class="text-rose-500">➖</span> AI Challenges</h3>
                    <ul class="space-y-3">
                        ${data.cons.map(item => `<li class="flex items-start gap-2 text-slate-700 dark:text-slate-300"><span class="text-rose-500">✕</span> ${item}</li>`).join('')}
                    </ul>
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
