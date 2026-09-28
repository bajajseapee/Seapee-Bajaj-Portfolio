import React from 'react';

interface PortfolioIconProps {
  name: string;
  className?: string;
}

/**
 * Renders a crisp inline SVG icon with fixed dimensions and overflow:hidden
 * so card icons never depend on an external icon font or render raw ligature text.
 */
export const PortfolioIcon: React.FC<PortfolioIconProps> = ({
  name,
  className = 'w-6 h-6',
}) => {
  const commonProps = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.85,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: `${className} inline-block shrink-0 overflow-hidden leading-none`,
    'aria-hidden': true,
  };

  switch (name) {
    case 'menu_book':
      return (
        <svg {...commonProps}>
          <path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z" />
          <path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z" />
          <path d="M6 8h2" />
          <path d="M6 12h2" />
          <path d="M16 8h2" />
          <path d="M16 12h2" />
        </svg>
      );

    case 'join':
      return (
        <svg {...commonProps}>
          <circle cx="9" cy="12" r="5.5" />
          <circle cx="15" cy="12" r="5.5" />
        </svg>
      );

    case 'psychology_alt':
    case 'psychology':
      return (
        <svg {...commonProps}>
          <path d="M12 4.5a6.5 6.5 0 0 0-6.5 6.5c0 2.3 1.2 4.3 3 5.4V19a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-2.6c1.8-1.1 3-3.1 3-5.4A6.5 6.5 0 0 0 12 4.5Z" />
          <path d="M9.5 11.5a2.5 2.5 0 1 1 5 0c0 1.2-.8 1.8-1.5 2.4-.4.4-.5.8-.5 1.3" />
          <path d="M9.5 22h5" />
        </svg>
      );

    case 'auto_awesome':
      return (
        <svg {...commonProps}>
          <path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z" />
          <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z" />
          <path d="M5 15l.7 1.6L7.3 17.3l-1.6.7L5 19.6l-.7-1.6L2.7 17.3l1.6-.7L5 15z" />
        </svg>
      );

    case 'fact_check':
      return (
        <svg {...commonProps}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M7 9h4" />
          <path d="M7 13h4" />
          <path d="M7 17h2" />
          <path d="m13.5 11.5 1.8 1.8 3.2-3.3" />
        </svg>
      );

    case 'verified':
    case 'check_circle':
      return (
        <svg {...commonProps}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="m9 11 3 3L22 4" />
        </svg>
      );

    case 'travel_explore':
      return (
        <svg {...commonProps}>
          <circle cx="11" cy="11" r="7" />
          <path d="M11 4a10 10 0 0 0 0 14" />
          <path d="M11 4a10 10 0 0 1 0 14" />
          <path d="M4.5 11h13" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );

    case 'workspace_premium':
    case 'military_tech':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="9" r="6" />
          <path d="m8.5 14.2-1.5 6.8 5-2.5 5 2.5-1.5-6.8" />
        </svg>
      );

    case 'memory':
      return (
        <svg {...commonProps}>
          <rect x="6" y="6" width="12" height="12" rx="2" />
          <rect x="9" y="9" width="6" height="6" rx="1" />
          <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
        </svg>
      );

    case 'school':
      return (
        <svg {...commonProps}>
          <path d="m22 10-10-5-10 5 10 5 10-5z" />
          <path d="M6 12v5c3 2.5 9 2.5 12 0v-5" />
          <path d="M22 10v6" />
        </svg>
      );

    case 'emoji_events':
      return (
        <svg {...commonProps}>
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
      );

    case 'format_quote':
      return (
        <svg {...commonProps}>
          <path d="M10 11H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 2.667-1.333 4.333-4 5" />
          <path d="M19 11h-4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 2.667-1.333 4.333-4 5" />
        </svg>
      );

    default:
      return (
        <span
          className={`material-symbols-outlined ${className}`}
          aria-hidden="true"
        >
          {name}
        </span>
      );
  }
};
