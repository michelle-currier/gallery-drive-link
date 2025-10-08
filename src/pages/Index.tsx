import { NavbarSimple } from "@/components/Navigation";
import GalleryAPI from "@/components/Gallery4";

const Index = () => {
  return (
    <div className="min-h-screen custom-gradient-bg">
      <NavbarSimple />
      <div className="container flex flex-col p-8 pb-20 gap-16 sm:p-20 mx-auto">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1 className="text-4xl font-parkinsans">Flyer Collection</h1>

          <GalleryAPI />
        </main>
        <footer className="row-start-3 flex gap-12 flex-wrap items-center justify-center">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://mcurrier.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            m. currier UX/UI Frontend Developer Portfolio
          </a>
          <a
            className="rounded-full border border-solid border-black/[1] dark:border-white/[1] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://github.com/michelle-currier"
            target="_blank"
            rel="noopener noreferrer"
          >
            m. currier GitHub
          </a>
          <a
            className="rounded-full border border-solid border-black/[1] dark:border-white/[1] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://www.linkedin.com/in/mouge/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Index;
