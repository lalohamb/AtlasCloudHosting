export default function AtlasLogo({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="100" cy="100" r="90" stroke="url(#gradient1)" strokeWidth="2" opacity="0.3" />
      <circle cx="100" cy="100" r="75" stroke="url(#gradient1)" strokeWidth="1.5" opacity="0.4" />
      <circle cx="100" cy="100" r="60" stroke="url(#gradient1)" strokeWidth="1" opacity="0.5" />

      <circle cx="100" cy="100" r="8" fill="url(#gradient2)" />

      <g className="nodes">
        <circle cx="100" cy="40" r="4" fill="#06B6D4">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="160" cy="100" r="4" fill="#06B6D4">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="160" r="4" fill="#06B6D4">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="40" cy="100" r="4" fill="#06B6D4">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin="1.5s" repeatCount="indefinite" />
        </circle>

        <circle cx="140" cy="60" r="3" fill="#FB923C">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="140" cy="140" r="3" fill="#FB923C">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" begin="0.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="140" r="3" fill="#FB923C">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="60" r="3" fill="#FB923C">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" begin="1.8s" repeatCount="indefinite" />
        </circle>
      </g>

      <g className="connections" opacity="0.6">
        <line x1="100" y1="100" x2="100" y2="40" stroke="#06B6D4" strokeWidth="1">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="100" y1="100" x2="160" y2="100" stroke="#06B6D4" strokeWidth="1">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </line>
        <line x1="100" y1="100" x2="100" y2="160" stroke="#06B6D4" strokeWidth="1">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" begin="1s" repeatCount="indefinite" />
        </line>
        <line x1="100" y1="100" x2="40" y2="100" stroke="#06B6D4" strokeWidth="1">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" begin="1.5s" repeatCount="indefinite" />
        </line>

        <line x1="100" y1="100" x2="140" y2="60" stroke="#FB923C" strokeWidth="0.5" opacity="0.5">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.5s" repeatCount="indefinite" />
        </line>
        <line x1="100" y1="100" x2="140" y2="140" stroke="#FB923C" strokeWidth="0.5" opacity="0.5">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.5s" begin="0.6s" repeatCount="indefinite" />
        </line>
        <line x1="100" y1="100" x2="60" y2="140" stroke="#FB923C" strokeWidth="0.5" opacity="0.5">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
        </line>
        <line x1="100" y1="100" x2="60" y2="60" stroke="#FB923C" strokeWidth="0.5" opacity="0.5">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.5s" begin="1.8s" repeatCount="indefinite" />
        </line>
      </g>

      <path
        d="M 70 100 Q 85 80, 100 80 Q 115 80, 130 100"
        stroke="url(#gradient3)"
        strokeWidth="2"
        fill="none"
        opacity="0.7"
      >
        <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
      </path>

      <path
        d="M 70 100 Q 85 120, 100 120 Q 115 120, 130 100"
        stroke="url(#gradient3)"
        strokeWidth="2"
        fill="none"
        opacity="0.7"
      >
        <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" begin="1.5s" repeatCount="indefinite" />
      </path>

      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#FB923C" />
        </linearGradient>
        <radialGradient id="gradient2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#0891B2" />
        </radialGradient>
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="50%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
    </svg>
  );
}
