import { Outlet } from 'react-router-dom';

export const AnonymousLayout: React.FunctionComponent<{}> = () => {
  return (
    <div className="max-w-3xl m-auto">
      <Outlet />
    </div>
  );
};
