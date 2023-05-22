import { ModeItem } from '~/interfaces';
export const Blitz: React.FC<ModeItem> = ({ fill = '#000000' }: ModeItem) => {
  return (
    <svg width="17" height="24" viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.14691 14.153H0L13.0657 0L9.54874 9.7978H16.6957L3.62902 23.9508L7.146 14.153H7.14691Z"
        fill={fill}
      />
      <defs>
        <linearGradient
          id="paint0_linear_452_26703"
          x1="-0.15276"
          y1="-15.1189"
          x2="15.0437"
          y2="21.2762"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#019AFF" stopOpacity="0.65" />
          <stop offset="1" stopColor="#0151FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};
