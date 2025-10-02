
import React from 'react';

export const FiftyFiftyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 0 L0 50 L50 100 L100 50 Z" />
    <text x="50" y="60" fontSize="40" fill="black" textAnchor="middle" fontWeight="bold">50:50</text>
  </svg>
);

export const AudienceIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 0 L0 50 L50 100 L100 50 Z" />
    <g transform="translate(25, 30)">
      <rect x="0" y="25" width="10" height="15" fill="black" />
      <rect x="15" y="15" width="10" height="25" fill="black" />
      <rect x="30" y="5" width="10" height="35" fill="black" />
      <rect x="45" y="20" width="10" height="20" fill="black" />
    </g>
  </svg>
);

export const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 0 L0 50 L50 100 L100 50 Z" />
    <path transform="translate(25, 25) scale(0.5)" fill="black" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

export const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        <circle cx="12" cy="16" r="1"></circle>
    </svg>
);
