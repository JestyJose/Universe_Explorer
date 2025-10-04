import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { MusicToggle } from "@/components/MusicToggle";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/categories");
  };

  return (
    <>
      <Navbar />
      <Hero onGetStarted={handleGetStarted} />
      <MusicToggle />
    </>
  );
};

export default Index;
