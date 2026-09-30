import React from 'react';

interface PortfolioIconProps {
  name: string;
  className?: string;
}

const SYMBOL_ID_MAP: Record<string, string> = {
  menu_book: 'icon-menu_book',
  join: 'icon-join',
  psychology_alt: 'icon-psychology',
  psychology: 'icon-psychology',
  auto_awesome: 'icon-auto_awesome',
  fact_check: 'icon-fact_check',
  verified: 'icon-check_circle',
  check_circle: 'icon-check_circle',
  travel_explore: 'icon-travel_explore',
  workspace_premium: 'icon-workspace_premium',
  military_tech: 'icon-workspace_premium',
  memory: 'icon-memory',
  school: 'icon-school',
  emoji_events: 'icon-emoji_events',
  format_quote: 'icon-format_quote',
};

/**
 * Global SVG Sprite mounted once in App.tsx.
 * Deduplicates all repeated inline SVG icons (check_circle, star ratings, WhatsApp, portfolio icons)
 * using <symbol> + <use> to reduce DOM node count and HTML weight.
 */
export const SvgSprite: React.FC = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    width="0"
    height="0"
    className="sr-only pointer-events-none"
  >
    <defs>
      <symbol
        id="icon-star"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.447a1 1 0 00-1.175 0l-3.368 2.447c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
      </symbol>

      <symbol id="icon-five-stars" viewBox="0 0 116 20">
        <use href="#icon-star" x="0" y="0" width="20" height="20" />
        <use href="#icon-star" x="24" y="0" width="20" height="20" />
        <use href="#icon-star" x="48" y="0" width="20" height="20" />
        <use href="#icon-star" x="72" y="0" width="20" height="20" />
        <use href="#icon-star" x="96" y="0" width="20" height="20" />
      </symbol>

      <symbol id="icon-whatsapp" viewBox="0 0 24 24">
        <path d="M12.031 2c-5.508 0-9.987 4.479-9.987 9.988 0 1.758.459 3.479 1.332 4.996L2 22l5.143-1.348c1.469.801 3.125 1.224 4.884 1.224h.004c5.508 0 9.988-4.479 9.988-9.988 0-2.669-1.039-5.178-2.926-7.064A9.927 9.927 0 0 0 12.031 2zm0 18.204h-.003c-1.488 0-2.946-.399-4.221-1.155l-.303-.18-3.051.8.815-2.974-.197-.314a8.279 8.279 0 0 1-1.275-4.405c0-4.577 3.724-8.301 8.305-8.301 2.218 0 4.303.864 5.87 2.432a8.248 8.248 0 0 1 2.431 5.871c0 4.578-3.725 8.302-8.304 8.302zm4.555-6.216c-.25-.125-1.477-.729-1.706-.812-.229-.083-.396-.125-.562.125-.167.25-.646.812-.791.979-.146.166-.292.187-.542.062-.25-.125-1.055-.389-2.01-1.24-.743-.662-1.245-1.481-1.391-1.731-.146-.25-.015-.385.11-.509.112-.112.25-.291.375-.437.125-.146.167-.25.25-.417.083-.166.042-.312-.021-.437-.062-.125-.562-1.354-.771-1.854-.203-.487-.409-.421-.562-.429l-.479-.008c-.167 0-.437.062-.667.312-.229.25-.875.854-.875 2.083s.896 2.416 1.021 2.583c.125.166 1.762 2.691 4.27 3.774.596.258 1.062.412 1.425.527.599.19 1.144.163 1.575.099.48-.072 1.477-.604 1.685-1.187.208-.583.208-1.083.146-1.187-.062-.104-.229-.166-.479-.291z" />
      </symbol>

      <symbol id="icon-ai-chat" viewBox="0 0 24 24">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5ZM9.5 11.5h5M9.5 14.5h3" />
      </symbol>

      <symbol id="icon-menu_book" viewBox="0 0 24 24">
        <path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2zM22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7zM6 8h2M6 12h2M16 8h2M16 12h2" />
      </symbol>

      <symbol id="icon-join" viewBox="0 0 24 24">
        <path d="M14.5 12a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0ZM20.5 12a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z" />
      </symbol>

      <symbol id="icon-psychology" viewBox="0 0 24 24">
        <path d="M12 4.5a6.5 6.5 0 0 0-6.5 6.5c0 2.3 1.2 4.3 3 5.4V19a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-2.6c1.8-1.1 3-3.1 3-5.4A6.5 6.5 0 0 0 12 4.5ZM9.5 11.5a2.5 2.5 0 1 1 5 0c0 1.2-.8 1.8-1.5 2.4-.4.4-.5.8-.5 1.3M9.5 22h5" />
      </symbol>

      <symbol id="icon-auto_awesome" viewBox="0 0 24 24">
        <path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15zM5 15l.7 1.6L7.3 17.3l-1.6.7L5 19.6l-.7-1.6L2.7 17.3l1.6-.7L5 15z" />
      </symbol>

      <symbol id="icon-fact_check" viewBox="0 0 24 24">
        <path d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM7 9h4M7 13h4M7 17h2m4.5-5.5 1.8 1.8 3.2-3.3" />
      </symbol>

      <symbol id="icon-check_circle" viewBox="0 0 24 24">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M9 11l3 3L22 4" />
      </symbol>

      <symbol id="icon-travel_explore" viewBox="0 0 24 24">
        <path d="M18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0ZM11 4a10 10 0 0 0 0 14M11 4a10 10 0 0 1 0 14M4.5 11h13m2.5 9-3.5-3.5" />
      </symbol>

      <symbol id="icon-workspace_premium" viewBox="0 0 24 24">
        <path d="M18 9a6 6 0 1 1-12 0 6 6 0 0 1 12 0ZM8.5 14.2 7 21l5-2.5L17 21l-1.5-6.8" />
      </symbol>

      <symbol id="icon-memory" viewBox="0 0 24 24">
        <path d="M8 6h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm2 3h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
      </symbol>

      <symbol id="icon-school" viewBox="0 0 24 24">
        <path d="m22 10-10-5-10 5 10 5 10-5zM6 12v5c3 2.5 9 2.5 12 0v-5M22 10v6" />
      </symbol>

      <symbol id="icon-emoji_events" viewBox="0 0 24 24">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6m12 5h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16m-10-7.34V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22m7-7.34V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </symbol>

      <symbol id="icon-format_quote" viewBox="0 0 24 24">
        <path d="M10 11H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 2.667-1.333 4.333-4 5m13-7h-4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 2.667-1.333 4.333-4 5" />
      </symbol>
    </defs>
  </svg>
);

/**
 * Renders a crisp SVG icon referencing the shared <symbol> sprite via <use>.
 */
export const PortfolioIcon: React.FC<PortfolioIconProps> = ({
  name,
  className = 'w-6 h-6',
}) => {
  const symbolId = SYMBOL_ID_MAP[name];

  if (symbolId) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.85}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} inline-block shrink-0 overflow-hidden leading-none`}
        aria-hidden="true"
        focusable="false"
      >
        <use href={`#${symbolId}`} />
      </svg>
    );
  }

  return (
    <span
      className={`material-symbols-outlined ${className}`}
      aria-hidden="true"
    >
      {name}
    </span>
  );
};
