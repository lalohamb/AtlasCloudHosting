export default function AtlasLogo({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Main cyan-orange gradient */}
        <linearGradient id="al-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#FB923C" />
        </linearGradient>

        {/* Radial gradient for core */}
        <radialGradient id="al-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="40%" stopColor="#06B6D4" stopOpacity="1" />
          <stop offset="100%" stopColor="#0891B2" stopOpacity="0.8" />
        </radialGradient>

        {/* Radial gradient for outer glow behind core */}
        <radialGradient id="al-coreglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
        </radialGradient>

        {/* Cyan node glow */}
        <filter id="al-glow-cyan" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Orange node glow */}
        <filter id="al-glow-orange" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Core glow filter */}
        <filter id="al-glow-core" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Ring glow */}
        <filter id="al-glow-ring" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer ambient glow disc */}
      <circle cx="100" cy="100" r="88" fill="url(#al-coreglow)" opacity="0.25" />

      {/* Orbital rings — thick, glowing */}
      <circle
        cx="100" cy="100" r="82"
        stroke="url(#al-grad1)"
        strokeWidth="1.5"
        opacity="0.35"
        filter="url(#al-glow-ring)"
      />
      <circle
        cx="100" cy="100" r="68"
        stroke="url(#al-grad1)"
        strokeWidth="2"
        opacity="0.55"
        filter="url(#al-glow-ring)"
      />
      <circle
        cx="100" cy="100" r="52"
        stroke="#06B6D4"
        strokeWidth="2.5"
        opacity="0.75"
        filter="url(#al-glow-ring)"
      >
        <animate attributeName="opacity" values="0.55;0.9;0.55" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* Connection lines — cyan, bold */}
      <line x1="100" y1="100" x2="100" y2="32" stroke="#06B6D4" strokeWidth="1.5">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
      </line>
      <line x1="100" y1="100" x2="168" y2="100" stroke="#06B6D4" strokeWidth="1.5">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="0.5s" repeatCount="indefinite" />
      </line>
      <line x1="100" y1="100" x2="100" y2="168" stroke="#06B6D4" strokeWidth="1.5">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="1s" repeatCount="indefinite" />
      </line>
      <line x1="100" y1="100" x2="32" y2="100" stroke="#06B6D4" strokeWidth="1.5">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="1.5s" repeatCount="indefinite" />
      </line>

      {/* Diagonal connection lines — orange */}
      <line x1="100" y1="100" x2="148" y2="52" stroke="#FB923C" strokeWidth="1.2">
        <animate attributeName="opacity" values="0.3;0.85;0.3" dur="2.5s" repeatCount="indefinite" />
      </line>
      <line x1="100" y1="100" x2="148" y2="148" stroke="#FB923C" strokeWidth="1.2">
        <animate attributeName="opacity" values="0.3;0.85;0.3" dur="2.5s" begin="0.6s" repeatCount="indefinite" />
      </line>
      <line x1="100" y1="100" x2="52" y2="148" stroke="#FB923C" strokeWidth="1.2">
        <animate attributeName="opacity" values="0.3;0.85;0.3" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
      </line>
      <line x1="100" y1="100" x2="52" y2="52" stroke="#FB923C" strokeWidth="1.2">
        <animate attributeName="opacity" values="0.3;0.85;0.3" dur="2.5s" begin="1.8s" repeatCount="indefinite" />
      </line>

      {/* Cardinal nodes — cyan, large, glowing */}
      <circle cx="100" cy="32" r="6" fill="#06B6D4" filter="url(#al-glow-cyan)">
        <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="168" cy="100" r="6" fill="#06B6D4" filter="url(#al-glow-cyan)">
        <animate attributeName="r" values="5;7;5" dur="2s" begin="0.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="0.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="168" r="6" fill="#06B6D4" filter="url(#al-glow-cyan)">
        <animate attributeName="r" values="5;7;5" dur="2s" begin="1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="1s" repeatCount="indefinite" />
      </circle>
      <circle cx="32" cy="100" r="6" fill="#06B6D4" filter="url(#al-glow-cyan)">
        <animate attributeName="r" values="5;7;5" dur="2s" begin="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="1.5s" repeatCount="indefinite" />
      </circle>

      {/* Diagonal nodes — orange, glowing */}
      <circle cx="148" cy="52" r="5" fill="#FB923C" filter="url(#al-glow-orange)">
        <animate attributeName="r" values="4;6;4" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="148" cy="148" r="5" fill="#FB923C" filter="url(#al-glow-orange)">
        <animate attributeName="r" values="4;6;4" dur="2.5s" begin="0.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" begin="0.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="52" cy="148" r="5" fill="#FB923C" filter="url(#al-glow-orange)">
        <animate attributeName="r" values="4;6;4" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="52" cy="52" r="5" fill="#FB923C" filter="url(#al-glow-orange)">
        <animate attributeName="r" values="4;6;4" dur="2.5s" begin="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" begin="1.8s" repeatCount="indefinite" />
      </circle>

      {/* Globe arcs — bold, gradient */}
      <path
        d="M 62 100 Q 81 72, 100 72 Q 119 72, 138 100"
        stroke="url(#al-grad1)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      >
        <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
      </path>
      <path
        d="M 62 100 Q 81 128, 100 128 Q 119 128, 138 100"
        stroke="url(#al-grad1)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      >
        <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" begin="1.5s" repeatCount="indefinite" />
      </path>

      {/* Core glow halo */}
      <circle cx="100" cy="100" r="18" fill="#06B6D4" opacity="0.2" filter="url(#al-glow-core)" />

      {/* Core centre */}
      <circle cx="100" cy="100" r="11" fill="url(#al-core)" filter="url(#al-glow-core)">
        <animate attributeName="r" values="10;13;10" dur="2.5s" repeatCount="indefinite" />
      </circle>

      {/* Core highlight dot */}
      <circle cx="96" cy="96" r="3.5" fill="white" opacity="0.7" />
    </svg>
  );
}
