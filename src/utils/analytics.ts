declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type AnalyticsEvent = 
  | 'form_submit'
  | 'whatsapp_click'
  | 'call_click'
  | 'brochure_download'
  | 'brochure_banner_click'
  | 'get_directions_click'
  | 'plot_size_select'
  | 'chatbot_query';

export const trackEvent = (eventName: AnalyticsEvent, params: Record<string, unknown> = {}) => {
  try {
    const timestamp = new Date().toISOString();
    const eventPayload = {
      event_category: 'Purandar_Highlands_Interaction',
      event_label: eventName,
      timestamp,
      ...params,
    };

    // Google Analytics 4
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventPayload);
    }

    // Meta Pixel (Facebook / Instagram)
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      if (eventName === 'form_submit') {
        window.fbq('track', 'Lead', params);
      } else if (eventName === 'brochure_download') {
        window.fbq('track', 'Contact', params);
      } else {
        window.fbq('trackCustom', eventName, params);
      }
    }

    // GTM dataLayer
    if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: eventName,
        ...eventPayload,
      });
    }

    console.info(`[Analytics Event Tracked]: ${eventName}`, eventPayload);
  } catch (e) {
    console.debug('Analytics event could not be logged:', e);
  }
};
