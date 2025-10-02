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
      fillRule="evenodd"
      d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.28 1.465l-2.132 2.132a.5.5 0 0 0-.157.278l-.206 1.03a1.125 1.125 0 0 0 .27 1.212l2.32 2.32a1.125 1.125 0 0 0 1.212.27l1.03-.206a.5.5 0 0 0 .278-.157l2.132-2.132c.49-.49.93-1.496 1.465-.28l2.308 1.73a1.745 1.745 0 0 1 .163 2.611l-1.034 1.034a1.745 1.745 0 0 1-2.433.362c-1.493-.85-3.116-1.921-4.789-3.593-1.673-1.673-2.743-3.296-3.593-4.789a1.745 1.745 0 0 1 .362-2.433L1.885.511z"
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