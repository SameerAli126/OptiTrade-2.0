import React, { useState, useEffect } from 'react';

const NewsWorker = () => {
    const [news, setNews] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 10; // Number of news items per page
    const maxPageButtons = 5; // Maximum number of page buttons to display

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('https://archlinux.tail9023a4.ts.net/news');
                const data = await response.json();
                // Sort data by date in descending order
                const sortedNews = data.sort((a, b) => new Date(b.Date) - new Date(a.Date));
                // Take only the first 2000 news items
                setNews(sortedNews.slice(0, 2000));
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const highlightSearchTerm = (text) => {
        if (!searchTerm) return text;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, (match) => `<span class="bg-yellow-200">${match}</span>`);
    };

    const filteredNews = news.filter(item =>
        item.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate the news items to display on the current page
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);

    // Calculate total pages
    const totalPages = Math.ceil(filteredNews.length / newsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Determine the range of page numbers to display
    const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    return (
        <div className="news-container p-4">
            <h2 className="text-2xl mb-4">News</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search news"
                className="p-2 border border-gray-300 rounded mb-4"
            />
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="p-2 bg-gray-100">Date</th>
                    <th className="p-2 bg-gray-100">Title</th>
                    <th className="p-2 bg-gray-100">Link</th>
                </tr>
                </thead>
                <tbody>
                {currentNews.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100 transition-colors">
                        <td className="p-2">{new Date(item.Date).toLocaleString()}</td>
                        <td className="p-2" dangerouslySetInnerHTML={{ __html: highlightSearchTerm(item.Title) }}></td>
                        <td className="p-2">
                            <a href={item.Link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                Read more
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 mx-1 bg-gray-200"
                >
                    &lt;
                </button>
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePageChange(startPage + i)}
                        className={`px-3 py-1 mx-1 ${currentPage === startPage + i ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        {startPage + i}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 mx-1 bg-gray-200"
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default NewsWorker;
