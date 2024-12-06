import React, { useState, useEffect } from "react";
import "./index.css";
import { TableProps } from "../../models";
import debounce from "lodash.debounce";

const Table: React.FC<TableProps> = ({ data }) => {
  const [filteredData, setFilteredData] = useState<any>(data);
  const [currentPage, setCurrentPage] = useState(1);

  // Percentage Funded filters
  const [minPercentage, setMinPercentage] = useState(0);
  const [maxPercentage, setMaxPercentage] = useState(
    data.reduce((max: number, row: any) => {
      return row['percentage.funded'] > max ? row['percentage.funded'] : max;
    }, 0)
  );
  const [minSliderValue, setMinSliderValue] = useState(0);
  const [maxSliderValue, setMaxSliderValue] = useState(maxPercentage);

  // Amount Pledged filters
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(
    data.reduce((max: number, row: any) => {
      return row['amt.pledged'] > max ? row['amt.pledged'] : max;
    }, 0)
  );
  const [minAmountSlider, setMinAmountSlider] = useState(0);
  const [maxAmountSlider, setMaxAmountSlider] = useState(maxAmount);

  const [searchQuery, setSearchQuery] = useState("");

  const entriesPerPage = 5;
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  useEffect(() => {
    const debouncedFilter = debounce(() => {
      setFilteredData(
        data.filter((row: any) => {
          const percentage = row['percentage.funded'];
          const amount = row['amt.pledged'];

          const matchesSearchQuery =
            searchQuery === "" ||
            row['percentage.funded']
              .toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            row['amt.pledged']
              .toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase());

          const matchesPercentageSliders =
            percentage >= minSliderValue && percentage <= maxSliderValue;

          const matchesAmountSliders =
            amount >= minAmountSlider && amount <= maxAmountSlider;

          return matchesSearchQuery && matchesPercentageSliders && matchesAmountSliders;
        })
      );
    }, 300);

    debouncedFilter();

    return () => {
      debouncedFilter.cancel();
    };
  }, [minSliderValue, maxSliderValue, minAmountSlider, maxAmountSlider, searchQuery, data]);

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
  const currentData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  return (
    <div className="table-container">
      <div className="filters">
        <input
          type="text"
          placeholder="Search Percentage or Amount"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-filter"
        />
        <div className="slider">
          <label htmlFor="min-percentage">
            Min % Funded: {minSliderValue}
          </label>
          <input
            type="range"
            id="min-percentage"
            min={minPercentage}
            max={maxPercentage}
            value={minSliderValue}
            onChange={(e) => setMinSliderValue(Number(e.target.value))}
          />
        </div>
        <div className="slider">
          <label htmlFor="max-percentage">
            Max % Funded: {maxSliderValue}
          </label>
          <input
            type="range"
            id="max-percentage"
            min={minPercentage}
            max={maxPercentage}
            value={maxSliderValue}
            onChange={(e) => setMaxSliderValue(Number(e.target.value))}
          />
        </div>
        <div className="slider">
          <label htmlFor="min-amount">
            Min Amount: ${minAmountSlider}
          </label>
          <input
            type="range"
            id="min-amount"
            min={minAmount}
            max={maxAmount}
            value={minAmountSlider}
            onChange={(e) => setMinAmountSlider(Number(e.target.value))}
          />
        </div>
        <div className="slider">
          <label htmlFor="max-amount">
            Max Amount: ${maxAmountSlider}
          </label>
          <input
            type="range"
            id="max-amount"
            min={minAmount}
            max={maxAmount}
            value={maxAmountSlider}
            onChange={(e) => setMaxAmountSlider(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="table-container__heading">
        <p>Products</p>
        <text>{filteredData.length}</text>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage Funded</th>
            <th>Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row: any) => (
            <tr key={row.sNo}>
              <td>{'SLBS' + 1000 + row['s.no']}</td>
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
