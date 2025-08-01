// Particle animation for techie background
function initParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            color: `rgba(0, 255, 255, ${Math.random() * 0.5 + 0.5})`,
            speed: Math.random() * 1 + 0.5
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            p.y -= p.speed;
            if (p.y < 0) p.y = canvas.height;
        });
        requestAnimationFrame(draw);
    }
    draw();
}

initParticles();
window.addEventListener('resize', () => {
    const canvas = document.getElementById('particles');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Existing API logic with loading indicator
document.getElementById('checkButton').addEventListener('click', async () => {
    const url = document.getElementById('urlInput').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<div class="loader">Scanning...</div>'; // Simple spinner placeholder
    resultsDiv.style.display = 'block';

    if (!url) {
        resultsDiv.innerHTML = 'Invalid URL detected. Please input a valid site.';
        return;
    }

    const apiKey = 'AIzaSyD4tMtd5iAMsXILtpxGBd90n9ZV-_PScoA';
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error.message || 'Scan failed');
        }
        const data = await response.json();
        const scores = data.lighthouseResult.categories;

        resultsDiv.innerHTML = `
            <h2>Scan Results</h2>
            <p><strong>Performance:</strong> ${scores.performance.score * 100}/100</p>
            <p><strong>Accessibility:</strong> ${scores.accessibility.score * 100}/100</p>
            <p><strong>Best Practices:</strong> ${scores['best-practices'].score * 100}/100</p>
            <p><strong>SEO Score:</strong> ${scores.seo.score * 100}/100</p>
            <p><strong>Optimizations:</strong> Focus on image compression, code minification, and caching.</p>
        `;
    } catch (error) {
        console.error('Error details:', error);
        resultsDiv.innerHTML = `Error: ${error.message}. Verify URL or API status.`;
    }
});

// Add a simple CSS loader in styles.css if needed, but this keeps it lightweight
