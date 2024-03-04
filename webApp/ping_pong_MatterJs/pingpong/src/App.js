import logo from './logo.svg';
import './App.css';
import { Game } from './components/Game';

function App() {
  return (
    <div className="w-full h-[100vh] flex flex-col  bg-gradient-to-b from-black to-[#1e293b]">
<h1 className="flex items-center text-2xl font-extrabold my-10 justify-center text-white dark:text-white sm:text-4xl lg:text-6xl lg:my-20" >Ping Pong<span className="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">But you can win</span></h1>


      <Game />
    </div>
  );
}

export default App;
