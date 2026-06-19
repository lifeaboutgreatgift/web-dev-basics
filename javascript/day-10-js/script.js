// Dom Reference Hooks
const outputFeed = document.getElementById('output-feed');
const spinner = document.getElementById('loading-spinner');

// UI Status Helpers
function showLoading(isLoading) {
    if (isLoading) {
        spinner.classList.remove('hidden');
        outputFeed.textContent = "Awaiting transaction settlement...";
    } else {
        spinner.classList.add('hidden');
    }
}

function updateLog(message, isError = false) {
    outputFeed.style.color = isError ? "#f87171" : "#a7f3d0";
    outputFeed.textContent = typeof message === 'object' ? JSON.stringify(message, null, 2) : message;
}

/* ==========================================
   1. CONCURRENT API SIMULATION (Promise.all)
   ========================================== */
document.getElementById('btn-concurrent').addEventListener('click', async () => {
    showLoading(true);
    try {
        // Mock targets mirroring mock endpoint operations
        const userPromise = fetch('https://typicode.com');
        const postPromise = fetch('https://typicode.com');

        // Fire streams simultaneously 
        const [userRes, postRes] = await Promise.all([userPromise, postPromise]);

        if (!userRes.ok || !postRes.ok) throw new Error("A downstream data pipeline failed.");

        const user = await userRes.json();
        const post = await postRes.json();

        updateLog({
            status: "Success - Both Channels Resolved Concurrently",
            author: user.name,
            latestDraftTitle: post.title
        });
    } catch (err) {
        updateLog(`Process Failed: ${err.message}`, true);
    } finally {
        showLoading(false);
    }
});

/* ==========================================
   2. PAYLOAD TRANSMISSION SIMULATION (POST)
   ========================================== */
document.getElementById('btn-post').addEventListener('click', async () => {
    showLoading(true);
    try {
        const payload = {
            title: "Simulated Fiction Node Entry",
            body: "Day 10 state mutations validation engine tracking.",
            userId: 7
        };

        const response = await fetch('https://typicode.com', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer SandboxToken-Day10'
            }
        });

        if (response.status !== 201) throw new Error(`Unexpected server code: ${response.status}`);

        const result = await response.json();
        updateLog({
            httpStatus: `${response.status} Created`,
            serverEchoPayload: result
        });
    } catch (err) {
        updateLog(`Post Failed: ${err.message}`, true);
    } finally {
        showLoading(false);
    }
});

/* ==========================================
   3. EVENT LOOP PRIORITY RUNNER
   ========================================== */
document.getElementById('btn-loop').addEventListener('click', () => {
    let trackingArray = [];
    trackingArray.push("1. Main execution thread baseline hit.");
    
    // Macro-task execution queue target
    setTimeout(() => {
        trackingArray.push("4. Macro-task queue callback cleared.");
        updateLog(trackingArray.join("\n\n"));
    }, 0);

    // Micro-task execution queue target (Takes absolute precedence)
    Promise.resolve().then(() => {
        trackingArray.push("3. Micro-task microqueue hook appended (High Priority).");
        updateLog(trackingArray.join("\n\n"));
    });

    trackingArray.push("2. Main execution thread tail complete.");
    updateLog(trackingArray.join("\n\n"));
});
