import React, { useState, useEffect } from 'react';
import DashHeader from '../components/DashHeader';
import '../../../../assets/DashScreener.css';
import { useStateContext } from '../contexts/ContextProvider.jsx'; // Import the context

const DashNews = () => {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const newsPerPage = 15;
    const { currentColor, sidebarColor } = useStateContext(); // Destructure the colors

    useEffect(() => {
        fetchNews(currentPage);
    }, [currentPage]);

    const fetchNews = async (page) => {
        try {
            const response = await fetch(
                `https://archlinux.tail9023a4.ts.net/news?page=${page}&page_size=${newsPerPage}`
            );
            const data = await response.json();
            setNews(data);
            setTotalPages(Math.ceil(21700 / newsPerPage));
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="mx-4 mt-4 max-w-95%">
            <DashHeader category="Insights" title="News" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item, index) => (
                    <div key={index} className="flex flex-col h-full">
                        <div className="card font-sans bg-white rounded-lg overflow-hidden transform transition duration-500 hover:shadow-2xl flex flex-col h-full">
                            <div className="p-4" style={{ background: `linear-gradient(to right, ${currentColor}, ${sidebarColor})`, color: 'white' }}>
                                <div className="text-lg font-montserrat font-bold">{item.Ticker}</div>
                            </div>
                            <div className="p-6 font-montserrat flex flex-col flex-grow">
                                <div className="text-black text-xl font-semibold mb-4 line-clamp-3">
                                    {item.Title}
                                </div>
                                <div className="mt-auto flex justify-between items-center">
                                    <a
                                        href={item.Link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block font-mono text-sm font-bold bg-slate-500 text-white py-2 px-4 rounded-full transition duration-100 transform hover:opacity-75"
                                    >
                                        Learn More
                                    </a>
                                    <div className="text-gray-600 text-sm text-right">
                                        {formatDate(item.Date)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-6 mb-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-1 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                >
                    &lt;
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNumber = i + 1;
                    return (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`px-4 py-2 mx-1 rounded-lg ${
                                currentPage === pageNumber
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 mx-1 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                >
                    &gt;
                </button>
            </div>
        </div>
    );
}

export default DashNews;
