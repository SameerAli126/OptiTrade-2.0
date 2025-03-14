import React from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import DashHeader from '../components/DashHeader';

import {
    EarningsCard,
    RevenueUpdates,
    EarningsPie,
    RecentTransactions,
    DropDown
} from '../components/DashHome/DashHomeComponents';
import { LineChart } from '../components';
import { earningData } from '../data/dummy';  // Add this import

const DashHome = () => {
    const { currentColor, currentMode } = useStateContext();

    return (
        <div className="rounded-3xl p-4 bg-white dark:bg-secondary-dark-bg dark:text-gray-200">
            <DashHeader category="Overview" title="Dashboard Home" />
            <div className="mt-12">
                <div className="flex flex-wrap lg:flex-nowrap justify-center">
                    <EarningsCard currentColor={currentColor} />
                    <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                        {earningData.map((item) => (
                            <div key={item.title} className="bg-white dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl">
                                <button
                                    type="button"
                                    style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                                    className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
                                >
                                    {item.icon}
                                </button>
                                <p className="mt-3">
                                    <span className="text-lg font-semibold">{item.amount}</span>
                                    <span className={`text-sm text-${item.pcColor} ml-2`}>
                    {item.percentage}
                  </span>
                                </p>
                                <p className="text-sm text-gray-600 mt-1">{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-10 flex-wrap justify-center">
                    <RevenueUpdates currentColor={currentColor} currentMode={currentMode} />
                    <div>
                        <EarningsPie currentColor={currentColor} />
                    </div>
                </div>

                <div className="flex gap-10 m-4 flex-wrap justify-center">
                    <RecentTransactions currentMode={currentMode} />
                    <div className="bg-white dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
                        <div className="flex justify-between items-center gap-2 mb-10">
                            <p className="text-xl font-semibold">Sales Overview</p>
                            <DropDown currentMode={currentMode} />
                        </div>
                        <div className="md:w-full overflow-auto">
                            <LineChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashHome;