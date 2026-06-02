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
const positivePointsEl = document.getElementById('positive-points');
const negativePointsEl = document.getElementById('negative-points');

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
    
    loadingState.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // -------------------------------------------------------------
    // API INTEGRATION POINT
    // Replace with real API call to LLM that generates Pros/Cons
    // -------------------------------------------------------------

    // SIMULATED API CALL
    setTimeout(() => {
        const mockData = generateMockData(topic);
        populateResults(topic, mockData);

        loadingState.classList.add('hidden');
        loadingState.classList.remove('flex');
        
        resultsContainer.classList.remove('hidden');
        setTimeout(() => {
            resultsContainer.classList.add('animate-fade-in-up');
            resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
        
    }, 2000); 
});

function populateResults(topic, data) {
    topicDisplay.textContent = topic;
    
    // Positive Points
    positivePointsEl.innerHTML = '';
    data.pros.forEach(pro => {
        const li = document.createElement('li');
        li.className = "flex items-start gap-4";
        li.innerHTML = `
            <svg class="w-6 h-6 text-emerald-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
            <span class="font-medium text-lg leading-relaxed">${pro}</span>
        `;
        positivePointsEl.appendChild(li);
    });

    // Negative Points
    negativePointsEl.innerHTML = '';
    data.cons.forEach(con => {
        const li = document.createElement('li');
        li.className = "flex items-start gap-4";
        li.innerHTML = `
            <svg class="w-6 h-6 text-rose-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
            <span class="font-medium text-lg leading-relaxed">${con}</span>
        `;
        negativePointsEl.appendChild(li);
    });
}

function generateMockData(topic) {
    // Dynamically generating <10 word points
    return {
        pros: [
            `Accelerates growth and innovation in ${topic}.`,
            `Reduces manual effort significantly over time.`,
            `Opens new investment opportunities globally.`
        ],
        cons: [
            `Requires high initial setup costs.`,
            `Vulnerable to unexpected regulatory changes.`,
            `Demands a steep learning curve.`
        ]
    };
}
