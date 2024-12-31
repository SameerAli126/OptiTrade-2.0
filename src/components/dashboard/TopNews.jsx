import React from "react";

function TopNews() {
    const newsItems = [
        { title: "DeSantis makes case to be Trump's rival", source: "WSJ.com: World News" },
        { title: "Germany enters recession in Q3", source: "NYT > Business > DealBook" },
        { title: "NYC moves to regulate how AI is used", source: "WSJ.com: World News" },
    ];

    return (
        <div className="bg-cyan-700 text-white rounded-lg shadow-md p-4 mt-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Top News</h2>
                <button className="text-sm bg-gray-700 px-3 py-1 rounded-lg">Close</button>
            </div>
            <ul className="space-y-4">
                {newsItems.map((news, index) => (
                    <li key={index} className="flex flex-col">
                        <span className="text-sm font-medium">{news.title}</span>
                        <span className="text-xs text-gray-400">{news.source}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TopNews;
