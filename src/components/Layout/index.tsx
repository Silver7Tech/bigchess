import './style.css';
export default function Layout(props: {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div
      className="flex-1 py-4 md:py-8 justify-center w-full flex overflow-auto scroll-smooth scrollbar-hide"
      style={{
        scrollBehavior: 'smooth',
      }}
    >
      <div className="grid layout-template gap-10">
        <div className="layout-left">{props.left}</div>
        <div className="layout-center">{props.center}</div>
        <div className="layout-right">{props.right}</div>
      </div>
    </div>
  );
}
