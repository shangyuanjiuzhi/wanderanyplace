document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('feedback-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const statusDiv = document.getElementById('feedback-status');
    const submitBtn = document.getElementById('fb-submit-btn');
    const name = document.getElementById('fb-name').value;
    const email = document.getElementById('fb-email').value;
    const subject = document.getElementById('fb-subject').value;
    const message = document.getElementById('fb-message').value;
    
    if (!message.trim()) {
      statusDiv.className = 'mt-6 p-4 rounded-lg text-center bg-red-100 text-red-700';
      statusDiv.textContent = 'Please enter your message.';
      statusDiv.classList.remove('hidden');
      return;
    }
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<svg aria-hidden="true" data-icon="ri:loader-4-fill" class="iconify mr-2 w-5 h-5 animate-spin" width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1m0 16a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1M4.93 4.93a1 1 0 0 1 1.41 0l1.41 1.41a1 1 0 1 1-1.41 1.41L4.93 6.34a1 1 0 0 1 0-1.41m11.31 11.31a1 1 0 0 1 1.41 0l1.41 1.41a1 1 0 0 1-1.41 1.41l-1.41-1.41a1 1 0 0 1 0-1.41M2 12a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1m16 0a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1M6.34 17.66a1 1 0 0 1 0 1.41l-1.41 1.41a1 1 0 1 1-1.41-1.41l1.41-1.41a1 1 0 0 1 1.41 0M17.66 6.34a1 1 0 0 1 0 1.41l-1.41 1.41a1 1 0 1 1-1.41-1.41l1.41-1.41a1 1 0 0 1 1.41 0" fill="currentColor"></path></svg> Sending...';
    
    try {
      const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3001/api/send-feedback'
        : '/api/send-feedback';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });
      
      const result = await response.json();
      
      if (result.success) {
        statusDiv.className = 'mt-6 p-4 rounded-lg text-center bg-green-100 text-green-700';
        statusDiv.textContent = result.message;
        statusDiv.classList.remove('hidden');
        this.reset();
        
        if (result.previewUrl) {
          const link = document.createElement('a');
          link.href = result.previewUrl;
          link.target = '_blank';
          link.textContent = ' Click here to preview the email';
          link.className = 'underline ml-2';
          statusDiv.appendChild(link);
        }
      } else {
        statusDiv.className = 'mt-6 p-4 rounded-lg text-center bg-red-100 text-red-700';
        statusDiv.textContent = result.error || 'Failed to send. Please try again.';
        statusDiv.classList.remove('hidden');
      }
    } catch (error) {
      statusDiv.className = 'mt-6 p-4 rounded-lg text-center bg-red-100 text-red-700';
      statusDiv.textContent = 'Error: Could not connect to server. Make sure the server is running on port 3001.';
      statusDiv.classList.remove('hidden');
      console.error('Error:', error);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<svg aria-hidden="true" data-icon="ri:send-plane-fill" class="iconify mr-2 w-5 h-5" width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 2L11 13M22 2l-7 20l-4-9l-9-4l20-7z" fill="currentColor"></path></svg> Submit Feedback';
    }
  });
});
