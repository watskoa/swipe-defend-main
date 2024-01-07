import Reviews from "../../../Components/Reviews/Reviews";
import Banner from "../Banner/Banner";
import SecondBanner from "../Banner/SecondBanner";
import ThirdBanner from "../Banner/ThirdBanner";
import Card from "../Card/Card";
import InfoSection from "../InfoSection/InfoSection";



const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <SecondBanner></SecondBanner>
            <ThirdBanner></ThirdBanner>
            <Card></Card>
            <InfoSection></InfoSection>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;