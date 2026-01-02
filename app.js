const cryptoContainer = document.getElementById('cryptoContainer');
const coins = ['bitcoin', 'ethereum', 'binancecoin', 'solana', 'cardano', 'ripple'];

async function fetchPrices() {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd&include_24hr_change=true`);
        const data = await response.json();
        renderCards(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        cryptoContainer.innerHTML = `<p class="col-span-full text-red-400 text-center">API Rate limit reached. Please wait a moment.</p>`;
    }
}

function renderCards(data) {
    cryptoContainer.innerHTML = '';
    
    Object.keys(data).forEach(key => {
        const price = data[key].usd;
        const change = data[key].usd_24h_change.toFixed(2);
        const isUp = change >= 0;

        const card = document.createElement('div');
        card.className = `glass p-6 rounded-3xl transition-all hover:scale-[1.02] hover:bg-white/5`;
        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <h2 class="text-xl font-bold capitalize text-white">${key}</h2>
                <span class="text-xs font-bold px-2 py-1 rounded ${isUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}">
                    ${isUp ? '▲' : '▼'} ${Math.abs(change)}%
                </span>
            </div>
            <div class="text-3xl font-mono font-bold tracking-tight mb-1">
                $${price.toLocaleString()}
            </div>
            <div class="text-slate-500 text-xs">24h Market Change</div>
        `;
        cryptoContainer.appendChild(card);
    });
}

// Update every 30 seconds
setInterval(fetchPrices, 30000);
fetchPrices();
