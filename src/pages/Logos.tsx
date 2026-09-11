import GalleryAPI from "@/components/Gallery4";
import { NavbarSimple } from "@/components/Navigation";

const Logos = () => {
  return (
    <div className="min-h-screen custom-gradient-bg">
      <NavbarSimple />
      <div className="container mx-auto flex flex-col gap-16 p-8 pb-20 sm:p-20">
        <main className="flex flex-col gap-8">
          <h1 className="font-parkinsans text-4xl">Logo Collection</h1>
          <GalleryAPI collection="logos" />
        </main>
      </div>
    </div>
  );
};

export default Logos;