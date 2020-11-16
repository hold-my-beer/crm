import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ sortedRows, displayedRows, onPageParamsChange }) => {
  const MIN_ROWNUMBER = 3;

  const [pageParams, setPageParams] = useState({
    rowsNumber: 0,
    rowsPerPage: 0,
    totalPages: 0,
    currentPage: 0,
    startPosition: -1,
    endPosition: -1
  });

  const {
    rowsNumber,
    rowsPerPage,
    totalPages,
    currentPage,
    startPosition,
    endPosition
  } = pageParams;

  const onRowsPerPageChange = e => {
    const val = parseInt(e.target.value);

    setPageParams({
      ...pageParams,
      rowsPerPage: val,
      totalPages: Math.floor((rowsNumber - 1) / val) + 1,
      currentPage: 1,
      startPosition: 0,
      endPosition: rowsNumber < val ? rowsNumber : val
    });
  };

  const goToFirst = () => {
    setPageParams({
      ...pageParams,
      currentPage: 1,
      startPosition: 0,
      endPosition: rowsNumber < rowsPerPage ? rowsNumber : rowsPerPage
    });
  };

  const goToLast = () => {
    setPageParams({
      ...pageParams,
      currentPage: totalPages,
      startPosition:
        rowsNumber < rowsPerPage ? 0 : (totalPages - 1) * rowsPerPage,
      endPosition: rowsNumber
    });
  };

  const prevPage = () => {
    setPageParams({
      ...pageParams,
      currentPage: currentPage === 1 ? currentPage : currentPage - 1,
      startPosition:
        currentPage === 1 ? startPosition : startPosition - rowsPerPage,
      endPosition: currentPage === 1 ? endPosition : startPosition
    });
  };

  const nextPage = () => {
    setPageParams({
      ...pageParams,
      currentPage: currentPage === totalPages ? currentPage : currentPage + 1,
      startPosition: currentPage === totalPages ? startPosition : endPosition,
      endPosition:
        currentPage === totalPages
          ? endPosition
          : Math.min(rowsNumber, endPosition + rowsPerPage)
    });
  };

  useEffect(() => {
    setPageParams({
      ...pageParams,
      rowsNumber: sortedRows.length,
      rowsPerPage: MIN_ROWNUMBER,
      totalPages: Math.floor((sortedRows.length - 1) / MIN_ROWNUMBER) + 1,
      currentPage: 1,
      startPosition: sortedRows.length !== 0 ? 0 : -1,
      endPosition:
        sortedRows.length !== 0
          ? sortedRows < MIN_ROWNUMBER
            ? sortedRows
            : MIN_ROWNUMBER
          : -1
    });
  }, [sortedRows]);

  useEffect(() => {
    const newDisplayedRows = [...sortedRows].splice(startPosition, endPosition);

    onPageParamsChange(newDisplayedRows);
  }, [startPosition, endPosition, sortedRows]);

  return (
    <div className="pagination">
      <div className="rows-number-group">
        <label htmlFor="rowsPerPage">Количество строк</label>
        <select
          name="rowsPerPage"
          id="rowsPerPage"
          value={rowsPerPage}
          onChange={e => onRowsPerPageChange(e)}
        >
          <option value="3">3</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>
      <div className="pagination-group">
        <button
          className="btn btn-small btn-round btn-primary"
          onClick={goToFirst}
          disabled={currentPage === 1}
        >
          Начало
        </button>
        <button
          className="btn btn-small btn-round btn-primary"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          {'<<'}
        </button>
        <div className="currentPage">
          Страница {currentPage} из {totalPages}
        </div>
        <button
          className="btn btn-small btn-round btn-primary"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          {'>>'}
        </button>
        <button
          className="btn btn-small btn-round btn-primary"
          onClick={goToLast}
          disabled={currentPage === totalPages}
        >
          Конец
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  sortedRows: PropTypes.array.isRequired,
  displayedRows: PropTypes.array.isRequired,
  onPageParamsChange: PropTypes.func.isRequired
};

export default Pagination;
