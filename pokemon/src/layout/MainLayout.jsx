import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function MainLayout() {
  return (
    <div>
      <div className="relative">
        <div className="bg-black w-full h-20 mt-auto">
          <div className="bg-red-600 w-full h-12 p-2"></div>
        </div>
      </div>
      <div className="flex justify-center mt-4 p-0 absolute top-0 left-0 right-0">
        <Link to="/pokedex">
          <img
            src="/pngwing.com.png"
            alt="Home"
            className="w-25 p-0"
          />
        </Link>
      </div>

      <Outlet />
    </div>
  );
}

export default MainLayout;
