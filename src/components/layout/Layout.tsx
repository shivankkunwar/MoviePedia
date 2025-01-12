import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout: FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-8">
        <Outlet />
      </main>
      
    </div>
  );
};

export default Layout;

