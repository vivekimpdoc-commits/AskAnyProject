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
            pros: [`Accelerates growth in ${topic}.`, `Reduces manual effort significantly.`, `Provides high ROI over time.`],
            cons: [`Requires high initial setup costs.`, `Vulnerable to regulatory changes.`, `Demands a steep learning curve.`]
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
        // STANDARD PROS/CONS TEMPLATE
        // ----------------------------------------------------
        dynamicResultsContainer.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <!-- ➕ Positive Points -->
                <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 relative overflow-hidden hover:shadow-xl transition-all">
                    <div class="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
                    <div class="flex items-center gap-4 mb-6 text-emerald-600 dark:text-emerald-400">
                        <div class="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4"></path></svg>
                        </div>
                        <h3 class="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Positive Points</h3>
                    </div>
                    <ul class="space-y-5 text-slate-700 dark:text-slate-300 mt-8">
                        ${data.pros.map(item => `
                            <li class="flex items-start gap-4">
                                <svg class="w-6 h-6 text-emerald-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                <span class="font-medium text-lg leading-relaxed">${item}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <!-- ➖ Negative Points -->
                <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 relative overflow-hidden hover:shadow-xl transition-all">
                    <div class="absolute top-0 left-0 w-1.5 h-full bg-rose-500"></div>
                    <div class="flex items-center gap-4 mb-6 text-rose-600 dark:text-rose-400">
                        <div class="p-3 bg-rose-50 dark:bg-rose-900/30 rounded-xl">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M20 12H4"></path></svg>
                        </div>
                        <h3 class="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Negative Points</h3>
                    </div>
                    <ul class="space-y-5 text-slate-700 dark:text-slate-300 mt-8">
                        ${data.cons.map(item => `
                            <li class="flex items-start gap-4">
                                <svg class="w-6 h-6 text-rose-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
                                <span class="font-medium text-lg leading-relaxed">${item}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
    }
}
