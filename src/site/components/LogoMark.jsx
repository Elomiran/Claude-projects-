export default function LogoMark({ className = 'nav__logo-mark', invert = false }) {
  const fill = invert ? '#1C1B18' : 'white';
  return (
    <svg className={className} viewBox="0 0 88 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M0 0H88V80H48L38 96V80H0Z" fill="currentColor"/>
      <rect x="10" y="10" width="68" height="60" stroke={fill} strokeWidth="5.5" fill="none"/>
      <path d="M24 26H64V64H44" stroke={fill} strokeWidth="5.5" strokeLinecap="square" fill="none"/>
      <line x1="24" y1="44" x2="44" y2="64" stroke={fill} strokeWidth="5.5" strokeLinecap="square"/>
    </svg>
  );
}
