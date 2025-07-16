import { apiPost } from './api';

export async function trackMetaEvent(eventName, userData, customData) {
  try {
    const pixelData = {
      eventName,
      email: userData.email,
      phone: userData.phone,
      eventData: {
        ...customData,
        event_source_url: customData?.sourceUrl || window.location.href,
        action_source: 'website'
      }
    };

    const response = await apiPost('/api/meta/track', pixelData);

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