import "./Home.css";
import { HeroSection } from "../HeroSection/HeroSection";

function Home(): JSX.Element {
    return (
        <div className="Home fade-in-slow">
            <HeroSection />
        </div>
    );
}

export default Home;
