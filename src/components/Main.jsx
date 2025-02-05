// Filepath: E:\WEB JS\fyp\opti-trade\src\components\Main.jsx
import Footer from './Footer';
const Main = () => {
    return (
        <main className="flex flex-col md:flex-row justify-center pt-24 gap-12 px-4 md:px-8">
            <div className="max-w-[450px]">
                <h1 className="text-[40px] md:text-[52px] font-normal text-[#00c805]">Investing</h1>
                <h2 className="text-[30px] md:text-[50px] font-normal text-black mt-5">
                    Build your portfolio starting with just $1
                </h2>
                <p className="text-[16px] md:text-[18px] leading-[24px] text-black mt-7">
                    Invest in stocks, options, and ETFs at your pace and commission-free.
                </p>
                <button className="mt-12 px-6 py-3.5 border border-black rounded-full text-[15px] font-bold text-white bg-black hover:bg-gray-800">
                    Learn more
                </button>
            </div>
            <Footer />
        </main>
    );
};

export default Main;