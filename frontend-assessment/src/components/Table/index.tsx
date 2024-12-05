import React, { useState } from "react";
import "./index.css";
import { TableProps } from "../../models";



const Table: React.FC<TableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  const totalPages = Math.ceil(data.length / entriesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentData = data.slice(startIndex, startIndex + entriesPerPage);

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage Funded</th>
            <th>Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row:any) => (
            <tr key={row.sNo}>
              <td>{row['s.no']}</td>
              <td>{row['percentage.funded']}%</td>
              <td className="table-amount">${row['amt.pledged']}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
