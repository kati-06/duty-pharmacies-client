import React from 'react';

function Navbar() {
  const handleRefreshClick = () => {
    window.location.href = '/'; // This will refresh the website
  };

  return (
    <nav className="px-3 py-5 text-white font-bold bg-black">
      <div className="flex gap-3 max-w-[1200px]" style={{margin: '0 auto'}}>
        <div
          className="flex gap-3"
          style={{cursor: 'pointer'}}
          onClick={handleRefreshClick}
        >
          <img className="w-[24px]" src="/logo.jpeg" alt="" />
          <span>Nöbetçi Eczaneler</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
