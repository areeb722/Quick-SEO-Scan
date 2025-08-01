document.getElementById('checkButton').addEventListener('click', async () => {
    const url = document.getElementById('urlInput').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'Analyzing...';
    resultsDiv.style.display = 'block';

    if (!url) {
        resultsDiv.innerHTML = 'Please enter a valid URL.';
        return;
    }

    const apiKey = 'AIzaSyD4tMtd5iAMsXILtpxGBd90n9ZV-_PScoA';
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const scores = data.lighthouseResult.categories;

        resultsDiv.innerHTML = `
            <h2>SEO Analysis Results</h2>
            <p><strong>Performance Score:</strong> ${scores.performance.score * 100}/100</p>
            <p><strong>Accessibility Score:</strong> ${scores.accessibility.score * 100}/100</p>
            <p><strong>Best Practices Score:</strong> ${scores['best-practices'].score * 100}/100</p>
            <p><strong>SEO Score:</strong> ${scores.seo.score * 100}/100</p>
            <p><strong>Suggestions:</strong> Optimize images, minify CSS/JS, and enable compression for better performance.</p>
        `;
    } catch (error) {
        resultsDiv.innerHTML = 'Error fetching data. Check your API key or URL.';
    }
});
