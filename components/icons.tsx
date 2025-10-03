import React from 'react';

export const FiftyFiftyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 0 L0 50 L50 100 L100 50 Z" />
    <text x="50" y="60" fontSize="40" fill="white" textAnchor="middle" fontWeight="bold">50:50</text>
  </svg>
);

export const AudienceIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 0 L0 50 L50 100 L100 50 Z" />
    <g transform="translate(25, 30)">
      <rect x="0" y="25" width="10" height="15" fill="white" />
      <rect x="15" y="15" width="10" height="25" fill="white" />
      <rect x="30" y="5" width="10" height="35" fill="white" />
      <rect x="45" y="20" width="10" height="20" fill="white" />
    </g>
  </svg>
);

export const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 0 L0 50 L50 100 L100 50 Z" />
    <path
      transform="translate(24, 24) scale(3.25)"
      fill="white"
      d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328z"
    />
  </svg>
);

export const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        <circle cx="12" cy="16" r="1"></circle>
    </svg>
);
