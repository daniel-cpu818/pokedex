
import NameForm from "./components/NameForm";

function Home() {
  return (
    <div className="w-full h-dvh flex items-center justify-start pl-10 bg-[url('/vecteezy_lightning-yellow-mouse-background_24993881.svg')] bg-repeat bg-cover">
    <div className="text-left px20">
      <a href="https://fontmeme.com/es/fuente-pokemon/">
        <img
          src="https://fontmeme.com/permalink/250409/3a93b3a770f738e70b9f89412489ef6d.png"
          alt="fuente-pokemon"
          className="w-72 sm:w-96"
        />
      </a>
      <p className="text-3xl text-white">Escribe tu nombre</p>
  
      <div className="py-4 flex justify-start items-center gap-1">
        <NameForm />
      </div>
    </div>
  </div>
  
  );
}

export default Home;

