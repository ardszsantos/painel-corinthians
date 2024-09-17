import React from 'react';
import NavbarComponent from './components/navbar';
import FirstSection from './components/sectionOne';
import TimaoStats from './components/corinthiansStats';

function App() {
  return (
    <div className='w-full h-full'>
      <NavbarComponent/>
      <TimaoStats/>
      <FirstSection/>
    </div>
  );
}

export default App;
