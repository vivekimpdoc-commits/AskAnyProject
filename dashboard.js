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

    // REAL API CALL TO BACKEND
    fetch(`http://localhost:3000/api/search?topic=${encodeURIComponent(topic)}`)
        .then(response => response.json())
        .then(res => {
            if (!res.success) {
                console.error("API Error", res);
                return;
            }
            
            // Build the layout dynamically
            populateResults(res.topic, res.data, res.isAi);

            loadingState.classList.add('hidden');
            loadingState.classList.remove('flex');
            
            resultsHeader.classList.remove('hidden');
            // small delay to let display block apply
            setTimeout(() => {
                resultsHeader.classList.add('opacity-100');
                dynamicResultsContainer.classList.add('animate-fade-in-up');
                resultsHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
        })
        .catch(err => {
            console.error("Failed to fetch data", err);
            loadingState.classList.add('hidden');
            loadingState.classList.remove('flex');
            alert("Backend server is not running. Please run 'node server.js' in the terminal.");
        });
});

function populateResults(topic, data, isAi) {
    topicDisplay.textContent = topic;
    
    // Helper for clickable items
    window.searchRelated = function(newTopic) {
        document.getElementById('topic-input').value = newTopic;
        const form = document.getElementById('search-form');
        if (form.requestSubmit) {
            form.requestSubmit();
        } else {
            form.dispatchEvent(new Event('submit', {cancelable: true, bubbles: true}));
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    if (isAi) {
        // ----------------------------------------------------
        // AI PROJECT DYNAMIC TEMPLATE
        // ----------------------------------------------------
        dynamicResultsContainer.innerHTML = `
            <div class="flex flex-col gap-8">
                
                <!-- 1. IDEAS & USE CASES -->
                <div class="bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                    <div class="absolute -right-10 -top-10 opacity-10"><svg class="w-64 h-64" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" clip-rule="evenodd"></path></svg></div>
                    <h3 class="text-2xl font-bold mb-6 flex items-center gap-3 relative z-10">
                        <span class="bg-white/20 p-2 rounded-xl backdrop-blur-sm">💡</span> 
                        Ideas & Use Cases
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                        ${data.useCases.map(uc => `
                            <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/20 transition-colors">
                                <p class="font-medium leading-relaxed">${uc}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- 2. STEP-BY-STEP PROCESS -->
                <div class="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm mt-2">
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                        <div class="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-xl text-blue-600 dark:text-blue-400">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        Step-by-Step AI Development Process
                    </h3>
                    <div class="flex flex-col md:flex-row items-start justify-between gap-4">
                        ${data.process.map((step, idx) => `
                            <button type="button" onclick="searchRelated('${step.title}')" class="flex-1 w-full bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 text-left relative group hover:border-blue-400 dark:hover:border-blue-600 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer focus:outline-none h-full">
                                <div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-4 shadow-md transition-transform group-hover:scale-110">${idx+1}</div>
                                <h4 class="text-slate-900 dark:text-white font-bold text-lg mb-2">${step.title}</h4>
                                <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">${step.desc}</p>
                            </button>
                            ${idx < data.process.length - 1 ? `<div class="hidden md:flex items-center justify-center self-center text-slate-300 dark:text-slate-600 px-1"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"></path></svg></div>` : ''}
                        `).join('')}
                    </div>
                </div>

                <!-- 3. CODING & TECH STACK -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
                    ${data.techStack.map((stack, idx) => `
                        <div class="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
                            <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
                            <h4 class="text-xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-slate-700/50 flex items-center gap-2 relative z-10">
                                <span class="text-indigo-500">💻</span> ${stack.category}
                            </h4>
                            <ul class="space-y-4 relative z-10">
                                ${stack.tools.map(tool => `
                                    <li class="flex items-center gap-4 text-slate-700 dark:text-slate-300 font-medium text-lg cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" onclick="searchRelated('${tool}')">
                                        <div class="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                        </div>
                                        ${tool}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>

                <!-- 4. HOW TO LAUNCH (DEPLOYMENT) -->
                <div class="bg-emerald-50 dark:bg-emerald-900/10 rounded-3xl p-8 border border-emerald-200 dark:border-emerald-800/50 shadow-sm mt-2">
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                        <div class="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl text-emerald-600 dark:text-emerald-400">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                        </div>
                        Deployment & Launch Strategy
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        ${data.deployment.map((step, idx) => `
                            <button type="button" onclick="searchRelated('${step.split(' ')[0]} Deployment')" class="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-800/30 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all hover:shadow-md cursor-pointer text-left focus:outline-none">
                                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shadow-inner">${idx+1}</div>
                                <p class="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">${step}</p>
                            </button>
                        `).join('')}
                    </div>
                </div>

                <!-- Related Topics -->
                <div class="mt-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        Explore Related Topics
                    </h3>
                    <div class="flex flex-wrap gap-3">
                        ${data.related.map(rel => `
                            <button type="button" onclick="searchRelated('${rel}')" class="px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-full text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm font-medium text-sm flex items-center gap-2">
                                <span>${rel}</span>
                                <svg class="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                        `).join('')}
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
                            <p class="text-2xl md:text-4xl font-bold leading-snug mb-2">${data.summary}</p>
                        </div>
                        
                        <!-- Impact Score Widget -->
                        <div class="flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] w-full lg:w-auto">
                            <div class="relative flex items-center justify-center">
                                <svg class="w-36 h-36 transform -rotate-90 drop-shadow-lg">
                                    <circle cx="72" cy="72" r="60" fill="transparent" stroke="rgba(255,255,255,0.15)" stroke-width="12"></circle>
                                    <circle cx="72" cy="72" r="60" fill="transparent" stroke="#ffffff" stroke-width="12" stroke-dasharray="377" stroke-dashoffset="${377 - (377 * data.score / 100)}" stroke-linecap="round"></circle>
                                </svg>
                                <span class="absolute text-5xl font-black drop-shadow-md">${data.score}</span>
                            </div>
                            <span class="text-sm uppercase tracking-widest mt-6 font-bold text-indigo-50 opacity-90">Impact Score</span>
                        </div>
                    </div>
                </div>

                <!-- Premium Insights Grid -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    ${data.insights.map((insight, index) => {
                        const colors = [
                            { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800/50', iconBg: 'bg-blue-100 dark:bg-blue-900/50', iconColor: 'text-blue-600 dark:text-blue-400', iconPath: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
                            { bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800/50', iconBg: 'bg-emerald-100 dark:bg-emerald-900/50', iconColor: 'text-emerald-600 dark:text-emerald-400', iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                            { bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800/50', iconBg: 'bg-amber-100 dark:bg-amber-900/50', iconColor: 'text-amber-600 dark:text-amber-400', iconPath: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' }
                        ];
                        const theme = colors[index % colors.length];
                        return `
                        <div class="group ${theme.bg} rounded-3xl p-8 border ${theme.border} hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                            <div class="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center ${theme.iconBg} ${theme.iconColor} shadow-sm border border-white/50 dark:border-slate-700/50 transition-transform group-hover:scale-110">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${theme.iconPath}"></path></svg>
                            </div>
                            <h4 class="text-2xl font-bold text-slate-900 dark:text-white mb-3">${insight.title}</h4>
                            <p class="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">${insight.desc}</p>
                        </div>
                        `;
                    }).join('')}
                </div>
                
                <!-- Related Topics -->
                <div class="mt-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        Explore Related Topics
                    </h3>
                    <div class="flex flex-wrap gap-3">
                        ${data.related.map(rel => `
                            <button type="button" onclick="searchRelated('${rel}')" class="px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-full text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm font-medium text-sm flex items-center gap-2">
                                <span>${rel}</span>
                                <svg class="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
}
