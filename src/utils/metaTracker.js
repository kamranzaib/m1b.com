export async function trackMetaEvent(eventName, userData, customData) {
  try {
    const pixelData = {
      event_name: eventName,
      user_data: {
        em: userData.email ? hashEmail(userData.email) : null,
        ph: userData.phone ? hashPhone(userData.phone) : null
      },
      custom_data: customData || {},
      event_source_url: customData?.sourceUrl || window.location.href,
      action_source: 'website'
    };

    const response = await fetch('/api/meta-pixel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pixelData)
    });

    if (response.ok) {
      console.log('Meta event tracked successfully:', eventName);
    } else {
      console.error('Failed to track Meta event:', response.statusText);
    }
  } catch (error) {
    console.error('Error tracking Meta event:', error);
  }
}

function hashEmail(email) {
  return btoa(email.toLowerCase().trim());
}

function hashPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  return btoa(cleaned);
}