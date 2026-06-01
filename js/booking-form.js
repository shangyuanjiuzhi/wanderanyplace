document.addEventListener('DOMContentLoaded', function() {
  function toggleOthersInput() {
    const checkbox = document.getElementById('others-checkbox');
    const container = document.getElementById('others-input-container');
    if (checkbox.checked) {
      container.classList.remove('hidden');
    } else {
      container.classList.add('hidden');
    }
  }

  document.getElementById('booking-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const statusMessage = document.getElementById('status-message');
    
    const name = document.getElementById('name').value;
    const passengers = document.getElementById('passengers').value;
    const phone = document.getElementById('phone').value;
    const wechat = document.getElementById('wechat').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const email = document.getElementById('email').value;
    const services = Array.from(document.querySelectorAll('input[name="services"]:checked')).map(cb => cb.value);
    const others = document.getElementById('others-checkbox').checked ? document.getElementById('others-detail').value : '';

    if (!phone && !wechat && !whatsapp) {
      statusMessage.className = 'mb-6 p-4 rounded-lg bg-red-100 text-red-700';
      statusMessage.textContent = 'Please fill in at least one contact method (Phone/WeChat/WhatsApp)';
      statusMessage.classList.remove('hidden');
      return;
    }

    if (services.length === 0) {
      statusMessage.className = 'mb-6 p-4 rounded-lg bg-red-100 text-red-700';
      statusMessage.textContent = 'Please select at least one service';
      statusMessage.classList.remove('hidden');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<svg aria-hidden="true" data-icon="ri:loader-4-fill" class="iconify mr-2 w-5 h-5 animate-spin" width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1m0 16a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1M4.93 4.93a1 1 0 0 1 1.41 0l1.41 1.41a1 1 0 1 1-1.41 1.41L4.93 6.34a1 1 0 0 1 0-1.41m11.31 11.31a1 1 0 0 1 1.41 0l1.41 1.41a1 1 0 0 1-1.41 1.41l-1.41-1.41a1 1 0 0 1 0-1.41M2 12a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1m16 0a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1M6.34 17.66a1 1 0 0 1 0 1.41l-1.41 1.41a1 1 0 1 1-1.41-1.41l1.41-1.41a1 1 0 0 1 1.41 0M17.66 6.34a1 1 0 0 1 0 1.41l-1.41 1.41a1 1 0 1 1-1.41-1.41l1.41-1.41a1 1 0 0 1 1.41 0" fill="currentColor"></path></svg> Sending...';

    try {
      const response = await fetch('/api/send-booking-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, passengers, phone, wechat, whatsapp, email, services, others })
      });

      const result = await response.json();

      if (result.success) {
        statusMessage.className = 'mb-6 p-4 rounded-lg bg-green-100 text-green-700';
        statusMessage.textContent = result.message;
        statusMessage.classList.remove('hidden');
        
        this.reset();
        document.getElementById('others-input-container').classList.add('hidden');
        
        if (result.previewUrl) {
          const link = document.createElement('a');
          link.href = result.previewUrl;
          link.target = '_blank';
          link.textContent = ' Click here to preview the email';
          link.className = 'underline ml-2';
          statusMessage.appendChild(link);
        }
      } else {
        statusMessage.className = 'mb-6 p-4 rounded-lg bg-red-100 text-red-700';
        statusMessage.textContent = result.error || 'Failed to send. Please try again.';
        statusMessage.classList.remove('hidden');
      }
    } catch (error) {
      statusMessage.className = 'mb-6 p-4 rounded-lg bg-red-100 text-red-700';
      statusMessage.textContent = 'Error: Could not connect to server. Make sure the server is running on port 3001.';
      statusMessage.classList.remove('hidden');
      console.error('Error:', error);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<svg aria-hidden="true" data-icon="ri:send-plane-fill" class="iconify mr-2 w-5 h-5" width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 2L11 13M22 2l-7 20l-4-9l-9-4l20-7z" fill="currentColor"></path></svg> Submit Booking Request';
    }
  });
});
