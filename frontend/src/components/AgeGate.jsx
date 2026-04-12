'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function AgeGate({ onVerify, onDecline }) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-slide-up">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#dc2626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8"
              aria-hidden="true"
            >
              <path d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-900 mb-1">Age Verification</h2>
        <p className="text-center text-red-600 font-semibold text-sm mb-4">
          You must be 18 years or older to continue
        </p>

        <p className="text-gray-600 text-sm text-center mb-6 leading-relaxed">
          This platform is strictly for adults aged 18+. By entering, you confirm your age and agree
          to our{' '}
          <Link href="/terms" className="text-brand-600 underline" target="_blank">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/guidelines" className="text-brand-600 underline" target="_blank">
            Community Guidelines
          </Link>
          .
        </p>

        {/* Checkbox */}
        <label className="flex items-start gap-3 cursor-pointer mb-6 group">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
          />
          <span className="text-sm text-gray-700 leading-relaxed">
            I confirm I am <strong>18 years of age or older</strong> and agree to the Terms of
            Service and Community Guidelines. I understand this site contains adult content and
            conversations.
          </span>
        </label>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => agreed && onVerify()}
            disabled={!agreed}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
          >
            I am 18+ — Enter Site
          </button>
          <button
            onClick={onDecline}
            className="w-full py-3 rounded-xl font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all"
          >
            I am under 18 — Leave
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          Minors are strictly prohibited. Violations are reported to authorities.
        </p>
      </div>
    </div>
  );
}
