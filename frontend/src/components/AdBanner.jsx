'use client';
import { useEffect, useRef } from 'react';

/**
 * AdBanner — renders a Google AdSense ad unit.
 *
 * Usage:
 *   <AdBanner slot="1234567890" format="auto" className="my-4" />
 *
 * Set NEXT_PUBLIC_ADSENSE_ID in .env to enable.
 * Replace `slot` with your actual ad unit slot ID from AdSense dashboard.
 */
export default function AdBanner({ slot, format = 'auto', responsive = true, className = '' }) {
  const adRef = useRef(null);
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  useEffect(() => {
    if (!publisherId || !adRef.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded yet or blocked by ad blocker — safe to ignore
    }
  }, [publisherId]);

  // No publisher ID configured — show a subtle placeholder
  if (!publisherId) {
    return (
      <div className={`ad-container text-xs text-gray-400 ${className}`} aria-hidden="true">
        Ad
      </div>
    );
  }

  return (
    <div className={`ad-container overflow-hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
