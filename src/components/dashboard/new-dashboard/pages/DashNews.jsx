// C:\Users\SAM\Downloads\Dashboard\opti-trade-pct\src\components\dashboard\new-dashboard\pages\DashNews.jsx

import React, { useState, useEffect } from 'react';
import {
  GridComponent,
  ColumnDirective,
  ColumnsDirective,
  Page,
  Inject,
  Filter,
  Group
} from '@syncfusion/ej2-react-grids';
import DashHeader from '../components/DashHeader'; // Import DashHeader
import '../../../../assets/DashScreener.css'; // Import the same CSS file

const DashNews = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const newsPerPage = 10; // Number of news items per page

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage]);

  const fetchNews = async (page) => {
    try {
      const response = await fetch(`https://archlinux.tail9023a4.ts.net/news?page=${page}`);
      const data = await response.json();
      setNews(data); // Assuming the API returns an array of news items
      setTotalPages(Math.ceil(21700 / newsPerPage)); // Calculate total pages based on known API data
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
      <div style={{ margin: '10%', marginTop: '1%', marginLeft: '0%', maxWidth: '95%', overflowX: 'auto' }}>
        <DashHeader category="Insights" title="News" /> {/* Add DashHeader here */}
        <GridComponent
            dataSource={news}
            allowPaging={true}
            pageSettings={{ pageSize: newsPerPage }}
            allowFiltering={true}
            allowGrouping={true}
            filterSettings={{ type: 'Excel' }} // Enable Excel-style filtering
            cssClass="custom-grid" // Apply the custom grid class
        >
          <ColumnsDirective>
            <ColumnDirective field='Date' headerText='Date' width='150' />
            <ColumnDirective field='Ticker' headerText='Ticker' width='100' />
            <ColumnDirective field='Title' headerText='Title' width='300' />
            <ColumnDirective field='Link' headerText='Link' width='300' template={(props) => <a href={props.Link} target="_blank" rel="noopener noreferrer">Read more</a>} />
          </ColumnsDirective>
          <Inject services={[Page, Filter, Group]} />
        </GridComponent>
        <div className="flex justify-center mt-4">
          <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 mx-1 bg-gray-200"
          >
            &lt;
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNumber = i + 1;
            return (
                <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-3 py-1 mx-1 ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  {pageNumber}
                </button>
            );
          })}
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
}

export default DashNews;
