import HeroFormCenterAlignedSearchWithTags from "@/components/Hero";
import DomainCards from "@/components/DomainCards";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4">
        <HeroFormCenterAlignedSearchWithTags />
        <DomainCards />
      </div>
      <div className="pt-12"> 
      <Footer />
      </div>
    </div>
  );
}
