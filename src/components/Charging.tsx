import pikachu from './../assets/pikachu-running.gif';

import React from 'react';

export const Charging = () => {
  return (
    <div className='w-full flex justify-center'>
      <figure className='w-[150px]'>
        <img src={pikachu.src} alt='pikachu corriendo' />
      </figure>
    </div>
  );
};
