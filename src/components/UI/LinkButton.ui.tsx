import { forwardRef } from 'react';
import { HashLink } from 'react-router-hash-link';

export interface LinkButtonProps {
  text: string;
  to: string;
  actived?: boolean;
}

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ text, to, actived = false }, ref) => {
    return (
      <HashLink
        ref={ref}
        to={to}
        className={`font-semibold leading-loose text-black ${
          actived && 'underline text-purple-100'
        }`}
      >
        {text}
      </HashLink>
    );
  },
);
