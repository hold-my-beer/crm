import React from 'react';
import PropTypes from 'prop-types';
import XLSX from 'xlsx';

const ExportToExcel = ({ dataToExport }) => {
  const exportFile = () => {
    const options = {
      worksheet: {
        dateNF: 'dd-mm-yyyy'
      }
    };
    /* convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(dataToExport.data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, 'sheetjs.xlsx');
  };

  return (
    <div>
      <button
        disabled={!dataToExport.data.length}
        className="btn btn-small btn-round btn-dark"
        onClick={exportFile}
      >
        Выгрузить в Excel
      </button>
    </div>
  );
};

ExportToExcel.propTypes = {
  dataToExport: PropTypes.object.isRequired
};

export default ExportToExcel;
