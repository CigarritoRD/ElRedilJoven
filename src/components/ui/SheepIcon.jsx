export function SheepIcon({ className = 'h-5 w-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="12" cy="10" rx="5" ry="4" />
      <ellipse cx="8" cy="9" rx="2" ry="1.5" opacity="0.7" />
      <ellipse cx="16" cy="9" rx="2" ry="1.5" opacity="0.7" />
      <ellipse cx="10" cy="8" rx="1.5" ry="1" opacity="0.6" />
      <ellipse cx="14" cy="8" rx="1.5" ry="1" opacity="0.6" />
      <ellipse cx="12" cy="7" rx="1.5" ry="1" opacity="0.5" />
      <circle cx="10" cy="9.5" r="0.8" fill="rgba(0,0,0,0.3)" />
      <circle cx="14" cy="9.5" r="0.8" fill="rgba(0,0,0,0.3)" />
      <ellipse cx="12" cy="11" rx="0.6" ry="0.4" fill="rgba(0,0,0,0.25)" />
      <path d="M9 13 Q8 16 9 18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M15 13 Q16 16 15 18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="9" cy="18.5" rx="0.6" ry="0.8" />
      <ellipse cx="15" cy="18.5" rx="0.6" ry="0.8" />
    </svg>
  );
}
