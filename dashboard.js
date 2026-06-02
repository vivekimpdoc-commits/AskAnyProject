// --- Theme Toggle Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');

// Set theme on load based on localStorage or system preference
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    lightIcon.classList.remove('hidden');
} else {
    document.documentElement.classList.remove('dark');
    darkIcon.classList.remove('hidden');
}

// Listen for toggle click
themeToggleBtn.addEventListener('click', function() {
    // Toggle icons
    darkIcon.classList.toggle('hidden');
    lightIcon.classList.toggle('hidden');

    // Toggle dark class on html
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
    }
});

// --- Search Logic & API Simulation ---

const searchForm = document.getElementById('search-form');
const topicInput = document.getElementById('topic-input');
const loadingState = document.getElementById('loading-state');
const resultsContainer = document.getElementById('results-container');
const topicDisplay = document.getElementById('topic-display');

// Elements to populate
const execSummaryEl = document.getElementById('executive-summary');
const keyFactsEl = document.getElementById('key-facts');
const trendsTagsEl = document.getElementById('trends-tags');
const sourceLinksEl = document.getElementById('source-links');

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const topic = topicInput.value.trim();
    if (!topic) return;

    // Reset UI
    resultsContainer.classList.add('hidden', 'opacity-0');
    resultsContainer.classList.remove('animate-fade-in-up');
    
    // Show Loading
    loadingState.classList.remove('hidden');
    loadingState.classList.add('flex');
    
    // Scroll to loading spinner slightly
    loadingState.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // -------------------------------------------------------------
    // API INTEGRATION POINT
    // -------------------------------------------------------------
    // Replace the code below with your actual API fetch calls.
    // Example for Google Search / Perplexity / LLM:
    //
    // try {
    //     const response = await fetch('YOUR_API_ENDPOINT', {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': 'Bearer YOUR_API_KEY',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ query: topic })
    //     });
    //     const data = await response.json();
    //     // map data to the mockData format below
    // } catch (err) {
    //     console.error("API Fetch Failed", err);
    // }
    // -------------------------------------------------------------

    // SIMULATED API CALL (Remove this when integrating real API)
    setTimeout(() => {
        
        // Mocked response generation based on the topic
        const mockData = generateMockData(topic);
        
        // Populate DOM
        populateResults(topic, mockData);

        // Hide loading, Show results
        loadingState.classList.add('hidden');
        loadingState.classList.remove('flex');
        
        resultsContainer.classList.remove('hidden');
        // Add a slight delay to allow display:block to apply before animating opacity
        setTimeout(() => {
            resultsContainer.classList.add('animate-fade-in-up');
        }, 50);
        
    }, 2500); // 2.5 seconds artificial delay
});

function populateResults(topic, data) {
    topicDisplay.textContent = topic;
    
    // A) Executive Summary
    execSummaryEl.innerHTML = data.summary;
    
    // B) Key Facts
    keyFactsEl.innerHTML = '';
    data.facts.forEach(fact => {
        const li = document.createElement('li');
        li.className = "flex items-start gap-2";
        li.innerHTML = `
            <svg class="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            <span>${fact}</span>
        `;
        keyFactsEl.appendChild(li);
    });

    // C) Related Trends
    trendsTagsEl.innerHTML = '';
    data.trends.forEach(trend => {
        const span = document.createElement('span');
        span.className = "px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400 transition-colors cursor-pointer";
        span.textContent = trend;
        
        // Bonus: Make tags clickable to initiate a new search
        span.addEventListener('click', () => {
            topicInput.value = trend;
            searchForm.dispatchEvent(new Event('submit'));
        });
        
        trendsTagsEl.appendChild(span);
    });

    // D) Source Links
    sourceLinksEl.innerHTML = '';
    data.sources.forEach(source => {
        const a = document.createElement('a');
        a.href = source.url;
        a.target = "_blank";
        a.className = "flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 bg-slate-50 dark:bg-slate-900/50 transition-colors group";
        
        // Extract domain name for a clean display
        let domain = "";
        try {
            domain = new URL(source.url).hostname.replace('www.', '');
        } catch(e) {
            domain = "example.com";
        }

        a.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-indigo-500 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
            </div>
            <div class="overflow-hidden">
                <div class="font-medium text-slate-800 dark:text-slate-200 truncate">${source.title}</div>
                <div class="text-xs text-slate-500 dark:text-slate-500 truncate">${domain}</div>
            </div>
        `;
        sourceLinksEl.appendChild(a);
    });
}

// Utility to generate plausible mock data based on input
function generateMockData(topic) {
    const capitalized = topic.charAt(0).toUpperCase() + topic.slice(1);
    
    return {
        summary: `Based on the latest web data, <strong>${capitalized}</strong> has seen a significant surge in interest recently. This topic encompasses several critical technological and cultural shifts. Analysts suggest that continued development in this area will drastically impact industry standards over the next 3 to 5 years, making it a focal point for researchers and investors alike.`,
        
        facts: [
            `Global search volume for "${topic}" increased by 45% in the last quarter.`,
            `Key industry leaders have invested heavily in ${topic} related R&D this year.`,
            `Recent studies indicate a strong correlation between ${topic} adoption and increased efficiency.`,
            `The primary challenges identified include scalability, cost of entry, and regulatory compliance.`
        ],
        
        trends: [
            `${topic} best practices`,
            `Future of ${topic}`,
            `${topic} vs traditional methods`,
            `Top tools for ${topic}`,
            `Is ${topic} worth the hype?`,
            `${topic} tutorial 2026`
        ],
        
        sources: [
            { title: `Comprehensive Guide to ${capitalized}`, url: `https://en.wikipedia.org/wiki/${encodeURIComponent(topic)}` },
            { title: `Latest Research on ${capitalized}`, url: `https://scholar.google.com/search?q=${encodeURIComponent(topic)}` },
            { title: `Industry Report: ${capitalized} Trends`, url: `https://techcrunch.com/search/${encodeURIComponent(topic)}` },
            { title: `Community Discussions`, url: `https://www.reddit.com/r/technology/search?q=${encodeURIComponent(topic)}` }
        ]
    };
}
