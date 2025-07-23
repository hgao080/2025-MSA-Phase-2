interface CobwebLogoProps {
  className?: string;
}

const CobwebLogo = ({ className = "h-8 w-auto" }: CobwebLogoProps) => (
  <svg 
    className={className} 
    viewBox="0 0 120 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Web icon - interconnected nodes */}
    <g transform="translate(2, 8)">
      {/* Connection lines */}
      <path 
        d="M12 12 L20 8 M12 12 L20 16 M12 12 L4 8 M12 12 L4 16 M20 8 L28 12 M20 16 L28 12" 
        stroke="url(#logoGradient)" 
        strokeWidth="1.5" 
        strokeOpacity="0.6"
      />
      {/* Nodes */}
      <circle cx="12" cy="12" r="3" fill="url(#logoGradient)" />
      <circle cx="4" cy="8" r="2" fill="url(#logoGradient)" opacity="0.8" />
      <circle cx="4" cy="16" r="2" fill="url(#logoGradient)" opacity="0.8" />
      <circle cx="20" cy="8" r="2" fill="url(#logoGradient)" opacity="0.8" />
      <circle cx="20" cy="16" r="2" fill="url(#logoGradient)" opacity="0.8" />
      <circle cx="28" cy="12" r="2.5" fill="url(#logoGradient)" opacity="0.9" />
    </g>
    
    {/* Text "Cobweb" */}
    <text 
      x="42" 
      y="25" 
      className="fill-current font-bold text-lg" 
      style={{ fill: 'url(#logoTextGradient)' }}
    >
      Cobweb
    </text>
    
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4f46e5" />
        <stop offset="100%" stopColor="#7e22ce" />
      </linearGradient>
      <linearGradient id="logoTextGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#4f46e5" />
        <stop offset="100%" stopColor="#7e22ce" />
      </linearGradient>
    </defs>
  </svg>
);

export default CobwebLogo;
