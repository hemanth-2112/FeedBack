const form = document.getElementById('feedbackform');
        const username = document.getElementById('name');
        const feedback = document.getElementById('feedback');
        const li = document.getElementById('data');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = {
                username: username.value,
                feedback: feedback.value
            }
            await fetch('/givefeed', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            form.reset();
        });

        let feedbackVisible = false;
        const toggleBtn = document.getElementById('toggleFeedback');

        toggleBtn.addEventListener('click', () => {
            if (!feedbackVisible) {
                fetchfeeddata();
                toggleBtn.textContent = 'Hide Feedback';
                toggleBtn.style.backgroundColor = 'red';
            } else {
                li.innerHTML = '';
                toggleBtn.textContent = 'Show Feedback';
                toggleBtn.style.backgroundColor = 'green';
            }
            feedbackVisible = !feedbackVisible;
        });

        async function fetchfeeddata() {
            const res = await fetch('/feeddata');
            const feed = await res.json();
            li.innerHTML = '';
            feed.forEach(f => {
                const item = document.createElement('li');
                item.innerHTML = `
            <span class="username">Username:</span> ${f.username}<br>
            <span class="feedback">Feedback:</span> ${f.feedback}<br><br> `;
                li.appendChild(item);
            });
        }