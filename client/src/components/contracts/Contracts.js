import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getContracts } from '../../actions/contract';
import hasSubstring from '../../utils/hasSubstring';
import PropTypes from 'prop-types';

import Search from '../layout/Search';
import FilterContracts from '../contracts/FilterContracts';
import Sort from '../layout/Sort';
import Pagination from '../layout/Pagination';
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';
import ExportToExcel from '../layout/ExportToExcel';
import Spinner from '../layout/Spinner';

const Contracts = ({
  getContracts,
  contract: { contracts, loading },
  constant: { constant }
}) => {
  const [className, setClassName] = useState('filter');

  const [filteredContracts, setFilteredContracts] = useState([]);

  const [sortedContracts, setSortedContracts] = useState([]);

  const [displayedContracts, setDisplayedContracts] = useState([]);

  const [dataToExport, setDataToExport] = useState({
    data: [] /* Array of Arrays e.g. [["a","b"],[1,2]] */,
    cols: [] /* Array of column objects e.g. { name: "C", K: 2 } */
  });

  /* Toggle filter div */
  const onClassChange = newClassName => {
    setClassName(newClassName);
  };

  /* Search */
  const onSearchChange = newFilteredContracts => {
    setFilteredContracts(newFilteredContracts);
  };

  const filterContracts = newSearchValue => {
    const newFilteredContracts = [];

    contracts.forEach(contract => {
      if (
        (contract.company &&
          hasSubstring(contract.company.name, newSearchValue)) ||
        (contract.entity &&
          hasSubstring(contract.entity.name, newSearchValue)) ||
        (contract.number && hasSubstring(contract.number, newSearchValue)) ||
        (contract.responsible &&
          hasSubstring(contract.responsible.secondName, newSearchValue)) ||
        (contract.reinsurers &&
          contract.reinsurers.filter(reinsurer =>
            hasSubstring(reinsurer.name, newSearchValue)
          ).length !== 0) ||
        (contract.broker &&
          hasSubstring(contract.broker.name, newSearchValue)) ||
        (contract.brokerEmployee &&
          hasSubstring(contract.brokerEmployee, newSearchValue)) ||
        (contract.contractType &&
          hasSubstring(contract.contractType, newSearchValue)) ||
        (contract.entity &&
          contract.entity.activityType &&
          hasSubstring(contract.entity.activityType.name, newSearchValue)) ||
        (contract.entity &&
          hasSubstring(contract.entity.contactPerson, newSearchValue)) ||
        (contract.entity &&
          hasSubstring(contract.entity.phoneNumber, newSearchValue)) ||
        (contract.entity &&
          hasSubstring(contract.entity.email, newSearchValue)) ||
        (contract.company &&
          hasSubstring(contract.company.rightToMention, newSearchValue))
      ) {
        newFilteredContracts.push(contract);
      }
    });

    return newFilteredContracts;
  };

  /* Filter contracts */
  const onFilterSubmit = newFilteredContracts => {
    setFilteredContracts(newFilteredContracts);
  };

  /* Sort */
  const onSortChange = newSortedContracts => {
    setSortedContracts(newSortedContracts);
  };

  /* Pagination */
  const onPageParamsChange = newDisplayedContracts => {
    setDisplayedContracts(newDisplayedContracts);
  };

  useEffect(() => {
    getContracts();
  }, [getContracts]);

  useEffect(() => {
    setFilteredContracts(contracts.length === 0 ? [] : contracts);
    setSortedContracts(contracts.length === 0 ? [] : contracts);
    setDisplayedContracts(contracts.length === 0 ? [] : contracts);
  }, [contracts]);

  useEffect(() => {
    let data = [];

    if (!loading && sortedContracts.length) {
      data = sortedContracts.map(contract => [
        contract.entity.name,
        contract.company.name,
        contract.premium,
        contract.number,
        new Date(contract.startDate),
        new Date(contract.endDate),
        new Date(contract.nextRenewalDate),
        contract.contractType,
        contract.responsible.secondName,
        contract.reinsurers.length
          ? contract.reinsurers
              .map(reinsurer => reinsurer && ` ${reinsurer.name}`)
              .toString()
          : '',
        contract.broker.name,
        contract.brokerEmployee,
        contract.population,
        contract.commission,
        contract.renewalProbability ? contract.renewalProbability : '',
        contract.entity.activityType.name,
        contract.entity.contactPerson,
        contract.entity.phoneNumber,
        contract.entity.email,
        contract.company.rightToMention
      ]);

      data.unshift([
        'Юрлицо',
        'Компания',
        'Премия, руб.',
        'Номер договора',
        'Дата начала',
        'Дата окончания',
        'Следующая пролонгация',
        'Тип договора',
        'Ответственный',
        'Перестраховщики',
        'Брокер',
        'Сотрудник брокера',
        'Численность',
        'Комиссия, %',
        'Вероятность пролонгации, %',
        'Вид деятельности',
        'Контакт',
        'Телефон',
        'E-mail',
        'Право на упоминание'
      ]);
    }

    setDataToExport({ ...dataToExport, data });
  }, [sortedContracts]);

  return (
    <div className="contracts">
      <h1 className="my-1">Контракты</h1>
      <p className="lead">Информация о контрактах</p>
      <Link
        to="/create-contracts"
        className="btn btn-small btn-round btn-primary"
      >
        Создать новые <span className="plus">+</span>
      </Link>

      <Search
        className={className}
        onClassChange={onClassChange}
        rows={contracts}
        filteredRows={filteredContracts}
        onSearchChange={onSearchChange}
        filterRows={filterContracts}
      />

      <FilterContracts
        className={className}
        onClassChange={onClassChange}
        contracts={contracts}
        filteredContracts={filteredContracts}
        onFilterSubmit={onFilterSubmit}
        constant={constant}
      />

      <Sort
        sortOptions={
          constant.SORT_CONTRACTS_BY ? constant.SORT_CONTRACTS_BY : []
        }
        filteredRows={filteredContracts}
        sortedRows={sortedContracts}
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
                <th className="sticky-column">Юрлицо</th>
                <th>Компания</th>
                <th className="text-right">Премия, руб.</th>
                <th>Номер договора</th>
                <th className="text-center">Дата начала</th>
                <th className="text-center">Дата окончания</th>
                <th className="text-center">Следующая пролонгация</th>
                <th>Тип договора</th>
                <th>Ответственный</th>
                <th>Перестраховщики</th>
                <th>Брокер</th>
                <th>Сотрудник брокера</th>
                <th className="text-right">Численность</th>
                <th className="text-right">Комиссия, %</th>
                <th className="text-right">Вероятность пролонгации, %</th>
                <th>Вид деятельности</th>
                <th>Контакт</th>
                <th>Телефон</th>
                <th>E-mail</th>
                <th>Право на упоминание</th>
              </tr>
            </thead>
            <tbody>
              {displayedContracts.map(contract => (
                <tr key={contract._id}>
                  <td className="sticky-column">{contract.entity.name}</td>
                  <td>{contract.company.name}</td>
                  <td className="text-right">
                    {contract.premium && (
                      <NumberFormat
                        displayType="text"
                        thousandSeparator={' '}
                        value={contract.premium}
                      />
                    )}
                  </td>
                  <td>
                    <Link to={`/edit-contract/${contract._id}`}>
                      {contract.number}
                    </Link>
                  </td>
                  <td className="text-center">
                    <Moment format="DD-MM-YYYY">{contract.startDate}</Moment>
                  </td>
                  <td className="text-center">
                    <Moment format="DD-MM-YYYY">{contract.endDate}</Moment>
                  </td>
                  <td className="text-center">
                    <Moment format="DD-MM-YYYY">
                      {contract.nextRenewalDate}
                    </Moment>
                  </td>
                  <td>{contract.contractType}</td>
                  <td>{contract.responsible.secondName}</td>
                  <td>
                    {contract.reinsurers.length > 0 &&
                      contract.reinsurers.map(
                        reinsurer => reinsurer && `${reinsurer.name} `
                      )}
                  </td>
                  <td>{contract.broker.name}</td>
                  <td>{contract.brokerEmployee}</td>
                  <td className="text-right">
                    {contract.population && (
                      <NumberFormat
                        displayType="text"
                        thousandSeparator={' '}
                        value={contract.population}
                      />
                    )}
                  </td>
                  <td className="text-right">
                    {contract.commission && (
                      <NumberFormat
                        displayType="text"
                        thousandSeparator={' '}
                        value={contract.commission}
                      />
                    )}
                  </td>
                  <td className="text-right">
                    {contract.renewalProbability && (
                      <NumberFormat
                        displayType="text"
                        thousandSeparator={' '}
                        value={contract.renewalProbability}
                      />
                    )}
                  </td>
                  <td>
                    {contract.entity.activityType &&
                      contract.entity.activityType.name}
                  </td>
                  <td>{contract.entity.contactPerson}</td>
                  <td>{contract.entity.phoneNumber}</td>
                  <td>{contract.entity.email}</td>
                  <td>{contract.company.rightToMention}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination
        sortedRows={sortedContracts}
        displayedRows={displayedContracts}
        onPageParamsChange={onPageParamsChange}
      />
    </div>
  );
};

Contracts.propTypes = {
  getContracts: PropTypes.func.isRequired,
  contract: PropTypes.object.isRequired,
  constant: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  contract: state.contract,
  constant: state.constant
});

export default connect(mapStateToProps, { getContracts })(Contracts);
