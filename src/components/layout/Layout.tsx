import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;