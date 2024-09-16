import React from 'react';
import NavbarComponent from './components/navbar';
import LastMatches from './components/lastMatches';
import TimaoStats from './components/corinthiansStats';

function App() {
  return (
    <div className='w-full h-full'>
      <NavbarComponent/>
      <TimaoStats/>
      <LastMatches/>
    </div>
  );
}

export default App;
