// Filepath: E:\WEB JS\fyp\opti-trade\src\components\dashboard\new-dashboard\pages\DashHome.jsx

import React from 'react';
import { Stacked, Pie, LineChart, SparkLine } from '../components'; // Import charts
import { useStateContext } from '../contexts/ContextProvider.jsx';
import DashHeader from '../components/DashHeader';
import Footer from '../../../Footer.jsx'

const DashHome = () => {
  const { currentColor, currentMode } = useStateContext();

  return (
      <div className="mt-24">
        <DashHeader category="Overview" title="Dashboard Home" />
        <div className="flex flex-wrap lg:flex-nowrap justify-center ">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-400">Earnings</p>
                <p className="text-2xl">$63,448.78</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-10 flex-wrap justify-center">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780">
            <div className="flex justify-between">
              <p className="font-semibold text-xl">Revenue Updates</p>
            </div>
            <div className="mt-10 flex gap-10 flex-wrap justify-center">
              <Stacked currentMode={currentMode} width="320px" height="360px" />
              <Pie id="pie-chart" data={[]} legendVisiblity={false} height="160px" />
              <LineChart />
              <SparkLine currentColor={currentColor} id="line-sparkLine" type="Line" height="80px" width="250px" data={[]} color={currentColor} />
            </div>
          </div>
        </div>
          <Footer />
      </div>
  );
};

export default DashHome;
