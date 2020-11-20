import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLeads } from '../../actions/lead';
import hasSubstring from '../../utils/hasSubstring';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';

import Search from '../layout/Search';
// import FilterLeads from './FilterLeads';
import Sort from '../layout/Sort';
import Pagination from '../layout/Pagination';
import ExportToExcel from '../layout/ExportToExcel';
import Spinner from '../layout/Spinner';

const Leads = ({
  getLeads,
  constant: { constant },
  lead: { leads, loading }
}) => {
  const [className, setClassName] = useState('filter');

  const [filteredLeads, setFilteredLeads] = useState([]);

  const [sortedLeads, setSortedLeads] = useState([]);

  const [displayedLeads, setDisplayedLeads] = useState([]);

  const [dataToExport, setDataToExport] = useState({
    data: [] /* Array of Arrays e.g. [["a","b"],[1,2]] */,
    cols: [] /* Array of column objects e.g. { name: "C", K: 2 } */
  });

  /* Toggle filter div */
  const onClassChange = newClassName => {
    setClassName(newClassName);
  };

  /* Search */
  const onSearchChange = newFilteredLeads => {
    setFilteredLeads(newFilteredLeads);
  };

  const filterLeads = newSearchValue => {
    const newFilteredLeads = [];

    leads.forEach(lead => {
      if (
        (lead.company && hasSubstring(lead.company.name, newSearchValue)) ||
        (lead.broker && hasSubstring(lead.broker.name, newSearchValue)) ||
        (lead.contactPerson &&
          hasSubstring(lead.contactPerson, newSearchValue)) ||
        (lead.responsible &&
          hasSubstring(lead.responsible.secondName, newSearchValue)) ||
        (lead.copyTo && hasSubstring(lead.copyTo.secondName, newSearchValue)) ||
        (lead.comment && hasSubstring(lead.comment, newSearchValue))
      ) {
        newFilteredLeads.push(lead);
      }
    });

    return newFilteredLeads;
  };

  /* Filter leads */
  const onFilterSubmit = newFilteredLeads => {
    setFilteredLeads(newFilteredLeads);
  };

  /* Sort */
  const onSortChange = newSortedLeads => {
    setSortedLeads(newSortedLeads);
  };

  /* Pagination */
  const onPageParamsChange = newDisplayedLeads => {
    setDisplayedLeads(newDisplayedLeads);
  };

  useEffect(() => {
    getLeads();
  }, [getLeads]);

  useEffect(() => {
    setFilteredLeads(leads.length === 0 ? [] : leads);
    setSortedLeads(leads.length === 0 ? [] : leads);
    setDisplayedLeads(leads.length === 0 ? [] : leads);
  }, [leads]);

  useEffect(() => {
    let data = [];

    if (leads.length) {
      data = sortedLeads.map(lead => [
        lead.company.name,
        lead.broker.name,
        lead.contactPerson,
        new Date(lead.renewalDate),
        new Date(lead.contactDate),
        lead.responsible.secondName,
        lead.copyTo.secondName,
        lead.premium ? lead.premium : '',
        lead.comment
      ]);

      data.unshift([
        'Компания',
        'Брокер',
        'Контакт',
        'Дата следующей пролонгации',
        'Дата следующей связи',
        'Ответственный',
        'В копии',
        'Премия, руб.',
        'Комментарий'
      ]);
    }

    setDataToExport({ ...dataToExport, data });
  }, [sortedLeads]);

  return (
    <div className="leads">
      <h1 className="my-1">Лиды</h1>
      <p className="lead">Информация о лидах</p>
      <Link to="/create-lead" className="btn btn-small btn-round btn-primary">
        Создать новый <span className="plus">+</span>
      </Link>

      <Search
        className={className}
        onClassChange={onClassChange}
        rows={leads}
        filteredRows={filteredLeads}
        onSearchChange={onSearchChange}
        filterRows={filterLeads}
      />

      {/* <FilterLeads
        className={className}
        onClassChange={onClassChange}
        leads={leads}
        filteredLeads={filteredLeads}
        onFilterSubmit={onFilterSubmit}
        constant={constant}
      /> */}

      <Sort
        sortOptions={constant.SORT_LEADS_BY ? constant.SORT_LEADS_BY : []}
        filteredRows={filteredLeads}
        sortedRows={sortedLeads}
        onSortChange={onSortChange}
      />

      <ExportToExcel dataToExport={dataToExport} />

      {loading ? (
        <Spinner />
      ) : (
        <div className="table">
          <table>
            <thead>
              <tr>
                <th className="sticky-column">Компания</th>
                <th>Брокер</th>
                <th>Контакт</th>
                <th className="text-center">Пролонгация</th>
                <th className="text-center">Дата связи</th>
                <th>Ответственный</th>
                <th>В копии</th>
                <th className="text-right">Премия, руб.</th>
                <th className="commentary">Комментарий</th>
              </tr>
            </thead>
            <tbody>
              {displayedLeads.map(lead => (
                <tr key={lead._id}>
                  <td className="sticky-column">
                    <Link to={`/edit-lead/${lead._id}`}>
                      {lead.company.name}
                    </Link>
                  </td>
                  <td>{lead.broker.name}</td>
                  <td>{lead.contactPerson}</td>
                  <td className="text-center">
                    <Moment format="DD-MM-YYYY">{lead.renewalDate}</Moment>
                  </td>
                  <td className="text-center">
                    <Moment format="DD-MM-YYYY">{lead.contactDate}</Moment>
                  </td>
                  <td>{lead.responsible.secondName}</td>
                  <td>{lead.copyTo.secondName}</td>
                  <td className="text-right">
                    {lead.premium && (
                      <NumberFormat
                        displayType="text"
                        thousandSeparator={' '}
                        value={lead.premium}
                      />
                    )}
                  </td>
                  <td className="commentary">{lead.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination
        sortedRows={sortedLeads}
        displayedRows={displayedLeads}
        onPageParamsChange={onPageParamsChange}
      />
    </div>
  );
};

Leads.propTypes = {
  getLeads: PropTypes.func.isRequired,
  constant: PropTypes.object.isRequired,
  lead: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  constant: state.constant,
  lead: state.lead
});

export default connect(mapStateToProps, {
  getLeads
})(Leads);
