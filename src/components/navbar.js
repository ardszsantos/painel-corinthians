import timao from '../assets/images/timao.png';

const NavbarComponent = () => {
  return (
    <header className="flex justify-center gap-2 tems-center w-full h-16 bg-navBack">
        <div className='flex gap-8 items-center'>
          <img className='' src={timao} alt="" />
        </div>
        <nav className='text-white text-[10px] sm:text-[20px] md:text-[22px] lg:text-[25px] jet-font flex items-center align-top gap-4'>
          <a href="#noticias" className='hover:text-red-700'>
            <p>NOTÍCIAS</p>
          </a>
          <a href="#partidas" className='hover:text-red-700'>
            <p>PARTIDAS</p>
          </a>
        </nav>
    </header>
  );
}

export default NavbarComponent;
