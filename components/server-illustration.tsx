export default function ServerIllustration({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g className="server-rack" opacity="0.8">
        <rect x="100" y="60" width="200" height="40" rx="4" stroke="#06B6D4" strokeWidth="2" fill="rgba(6, 182, 212, 0.05)" />
        <rect x="100" y="110" width="200" height="40" rx="4" stroke="#06B6D4" strokeWidth="2" fill="rgba(6, 182, 212, 0.05)" />
        <rect x="100" y="160" width="200" height="40" rx="4" stroke="#06B6D4" strokeWidth="2" fill="rgba(6, 182, 212, 0.05)" />

        <circle cx="120" cy="80" r="3" fill="#06B6D4">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="135" cy="80" r="3" fill="#06B6D4">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
        </circle>
        <circle cx="150" cy="80" r="3" fill="#06B6D4">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin="0.6s" repeatCount="indefinite" />
        </circle>

        <circle cx="120" cy="130" r="3" fill="#FB923C">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="135" cy="130" r="3" fill="#FB923C">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" begin="0.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="150" cy="130" r="3" fill="#FB923C">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" begin="0.8s" repeatCount="indefinite" />
        </circle>

        <circle cx="120" cy="180" r="3" fill="#10B981">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="135" cy="180" r="3" fill="#10B981">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="150" cy="180" r="3" fill="#10B981">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="1s" repeatCount="indefinite" />
        </circle>

        <rect x="180" y="72" width="100" height="16" rx="2" fill="rgba(6, 182, 212, 0.1)" />
        <rect x="180" y="122" width="100" height="16" rx="2" fill="rgba(251, 146, 60, 0.1)" />
        <rect x="180" y="172" width="100" height="16" rx="2" fill="rgba(16, 185, 129, 0.1)" />
      </g>

      <g className="cloud-nodes">
        <circle cx="80" cy="40" r="20" stroke="#06B6D4" strokeWidth="1.5" fill="rgba(6, 182, 212, 0.05)">
          <animate attributeName="r" values="20;22;20" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="320" cy="40" r="20" stroke="#FB923C" strokeWidth="1.5" fill="rgba(251, 146, 60, 0.05)">
          <animate attributeName="r" values="20;22;20" dur="3s" begin="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="240" r="25" stroke="#10B981" strokeWidth="1.5" fill="rgba(16, 185, 129, 0.05)">
          <animate attributeName="r" values="25;27;25" dur="3s" begin="0.5s" repeatCount="indefinite" />
        </circle>
      </g>

      <g className="connections" opacity="0.4">
        <path d="M 90 50 Q 150 35, 100 60" stroke="#06B6D4" strokeWidth="1" fill="none">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
        </path>
        <path d="M 310 50 Q 250 35, 300 60" stroke="#FB923C" strokeWidth="1" fill="none">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" begin="0.7s" repeatCount="indefinite" />
        </path>
        <path d="M 200 220 Q 150 200, 150 160" stroke="#10B981" strokeWidth="1" fill="none">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" begin="0.3s" repeatCount="indefinite" />
        </path>
        <path d="M 200 220 Q 250 200, 250 160" stroke="#10B981" strokeWidth="1" fill="none">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" begin="1s" repeatCount="indefinite" />
        </path>
      </g>

      <g className="data-flow">
        <circle cx="100" cy="60" r="2" fill="#06B6D4">
          <animateMotion dur="3s" repeatCount="indefinite" path="M 0 0 Q 50 -30, 100 0 Q 150 30, 200 0" />
        </circle>
        <circle cx="200" cy="110" r="2" fill="#FB923C">
          <animateMotion dur="4s" repeatCount="indefinite" path="M 0 0 Q -50 30, -100 0 Q -150 -30, -200 0" />
        </circle>
        <circle cx="150" cy="160" r="2" fill="#10B981">
          <animateMotion dur="3.5s" repeatCount="indefinite" path="M 0 0 Q 25 40, 50 80" />
        </circle>
      </g>
    </svg>
  );
}
