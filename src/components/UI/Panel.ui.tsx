import { CSSProperties, ReactNode } from 'react';

export default function Panel(props: {
  header: ReactNode;
  body: ReactNode;
  footer: ReactNode;
  containerStyles?: CSSProperties;
}) {
  return (
    <div
      style={{ ...props.containerStyles }}
      className={`border border-sky-600 flex flex-col rounded-md overflow-hidden`}
    >
      <div className="p-5 pb-4 border-b border-gray-200">{props.header}</div>
      <div className="flex-1">{props.body}</div>
      {props.footer && (
        <div className="border-t p-4 pt-3 text-xs border-gray-200">{props.footer}</div>
      )}
    </div>
  );
}
