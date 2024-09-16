import timao from '../assets/images/timao.png';

const NavbarComponent = () => {
  return (
    <header className="items-center w-full h-16 bg-navBack">
      <div className="pl-6 pr-6 2xl:pl-40 2xl:pr-40 flex justify-between">
        <div className='flex gap-8 items-center'>
          <img className='' src={timao} alt="" />
          <h1 className='jet-font text-[10px] sm:text-[22px] md:text-[24px] lg:text-[26px] xl:text-[29px] text-white'>
            TIMÃO | STATS
          </h1>
        </div>
        <nav className='text-white text-[10px] sm:text-[20px] md:text-[22px] lg:text-[25px] jet-font flex items-center gap-2 2xl:gap-20'>
          <a href="#noticias">
            <p>NOTÍCIAS</p>
          </a>
          <a href="#partidas">
            <p>PARTIDAS</p>
          </a>
          <a href="#estatisticas">
            <p>ESTATÍSTICAS</p>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default NavbarComponent;
