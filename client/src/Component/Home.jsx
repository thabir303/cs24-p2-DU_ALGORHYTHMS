import SwipperBanner from "./Swiper/SwipperBanner"
const Home = () => {
    return (
        <div className="w-full">
            <SwipperBanner></SwipperBanner>

            <div className="w-full flex justify-center mt-20">
            <h1 className="text-8xl font-bold bg-gradient-to-r from-lime-500 via-lime-400 to-lime-600 inline-block text-transparent bg-clip-text">EcoSync</h1>
            </div>
        </div>
    );
};

export default Home;