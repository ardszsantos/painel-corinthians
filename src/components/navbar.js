
import timao from '../assets/images/timao.png';

const NavbarComponent = () => {
  return (  
    <header className="items-center w-full h-[60px] bg-navBack">
      <div className="pl-[157px] pr-[157px] flex justify-between">
        <div className='flex gap-8 items-center'>
          <img className='' src={timao} alt=""/>
          <h1 className='jet-font text-[29px] text-white'>TIMÃO | STATS</h1>
        </div>
        <nav className='text-white text-[25px] jet-font flex items-center gap-20'>
          <a href="">
            <p>NOTÍCIAS</p>
          </a>
          <a href="">
            <p>PARTIDAS</p>
          </a>
          <a href="">
            <p>ESTATÍSTICAS</p>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default NavbarComponent;