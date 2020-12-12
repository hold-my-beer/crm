import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

const CreateContract = ({
  index,
  entities,
  activityTypes,
  contracts,
  onContractDelete,
  contract,
  onContractChange,
  // users,
  reinsurers
  // brokers
}) => {
  const {
    id,
    entity,
    activityType,
    contactPerson,
    phoneNumber,
    email,
    premium,
    number,
    startDate,
    endDate,
    nextRenewalDate,
    // responsible,
    reinsurerNames,
    reinsurerIds,
    // broker,
    // brokerEmployee,
    population,
    isRenewal,
    // commission,
    renewalProbability
  } = contract;

  const [okved, setOkved] = useState({
    code: '',
    name: ''
  });

  const { code, name } = okved;

  const getName = val => {
    for (let i = 0; i < activityTypes.length; i++) {
      if (activityTypes[i].code === val) {
        return activityTypes[i].name;
      }
    }
    return '';
  };

  const onOkvedChange = e => {
    setOkved({
      code: e.target.value,
      name: getName(e.target.value)
    });

    onContractChange(id, e);
  };

  const onDeleteClick = e => {
    e.preventDefault();
    onContractDelete(id);
  };

  useEffect(() => {
    if (activityType) {
      const indexOfActivity = activityTypes
        .map(item => item._id)
        .indexOf(activityType);

      setOkved({
        code: activityTypes[indexOfActivity].code,
        name: activityTypes[indexOfActivity].name
      });
    }
  }, [activityType]);

  return (
    <div className="contract-parameters">
      <div className="contract-parameters-header">Контракт №{index}</div>
      <div className="contract-parameters-content">
        <div className="form-group">
          <label htmlFor="entity">Юрлицо *</label>
          <input
            type="text"
            name="entity"
            id="entity"
            list="entities"
            placeholder="Начните ввод..."
            autoComplete="off"
            value={entity}
            onChange={e => onContractChange(id, e)}
          />
          <datalist id="entities">
            {entities &&
              entities.length > 0 &&
              entities.map(entity => (
                <option key={entity._id} value={entity.name}></option>
              ))}
          </datalist>
        </div>
        <div className="form-group">
          <label htmlFor="code">ОКВЭД *</label>
          <input
            type="text"
            name="code"
            id="code"
            list="codes"
            placeholder="Начните ввод..."
            autoComplete="off"
            value={code}
            onChange={e => onOkvedChange(e)}
          />
          <label>{name.substr(0, 50)}</label>
          <datalist id="codes">
            {activityTypes &&
              activityTypes.length &&
              activityTypes.map(activityType => (
                <option
                  key={activityType._id}
                  value={activityType.code}
                ></option>
              ))}
          </datalist>
        </div>
        <div className="form-group">
          <label htmlFor="contactPerson">Контактное лицо *</label>
          <input
            type="text"
            name="contactPerson"
            id="contactPerson"
            placeholder="Начните ввод..."
            autoComplete="off"
            value={contactPerson}
            onChange={e => onContractChange(id, e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Номер телефона</label>
          <NumberFormat
            format="+7 (###) ###-####"
            allowEmptyFormatting
            mask="_"
            name="phoneNumber"
            id="phoneNumber"
            autoComplete="off"
            value={phoneNumber}
            onChange={e => onContractChange(id, e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            placeholder="Начните ввод..."
            name="email"
            value={email}
            onChange={e => onContractChange(id, e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="premium">Премия, руб. *</label>
          <NumberFormat
            thousandSeparator={' '}
            name="premium"
            id="premium"
            autoComplete="off"
            value={premium}
            onChange={e => onContractChange(id, e)}
            placeholder="Начните ввод..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="number">Номер договора *</label>
          <input
            type="text"
            placeholder="Начните ввод..."
            name="number"
            value={number}
            onChange={e => onContractChange(id, e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Дата начала договора *</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={startDate}
            onChange={e => onContractChange(id, e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">Дата окончания договора *</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={endDate}
            onChange={e => onContractChange(id, e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nextRenewalDate">Дата следующей пролонгации *</label>
          <input
            type="date"
            id="nextRenewalDate"
            name="nextRenewalDate"
            value={nextRenewalDate}
            onChange={e => onContractChange(id, e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="reinsurerNames">Перестраховщики *</label>
          <ul id="reinsurerNames">
            {reinsurers &&
              reinsurers.map(reinsurer => (
                <li key={reinsurer._id}>
                  <input
                    type="checkbox"
                    name="reinsurerNames"
                    id={reinsurer.name}
                    value={reinsurer.name}
                    onChange={e => onContractChange(id, e)}
                    checked={reinsurerIds.indexOf(reinsurer._id) !== -1}
                  />
                  <label htmlFor={reinsurer.name}>{reinsurer.name}</label>
                </li>
              ))}
          </ul>
        </div>

        <div className="form-group">
          <label htmlFor="population">Численность *</label>
          <NumberFormat
            thousandSeparator={' '}
            name="population"
            id="population"
            autoComplete="off"
            value={population}
            onChange={e => onContractChange(id, e)}
            placeholder="Начните ввод..."
          />
        </div>
        <div className="form-group" onChange={e => onContractChange(id, e)}>
          <label>Пролонгация *</label>
          <div className="inline-group">
            <input
              type="radio"
              name="isRenewal"
              id="true"
              value={true}
              checked={isRenewal}
              readOnly={true}
            />
            <label htmlFor="true">Да</label>
          </div>
          <div className="inline-group">
            <input
              type="radio"
              name="isRenewal"
              id="false"
              value={false}
              checked={!isRenewal}
              readOnly={true}
            />
            <label htmlFor="false">Нет</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="renewalProbability">Вероятность пролонгации, %</label>
          <input
            type="number"
            name="renewalProbability"
            id="renewalProbability"
            autoComplete="off"
            value={renewalProbability}
            onChange={e => onContractChange(id, e)}
            placeholder="Начните ввод..."
          />
        </div>
        <button
          className="btn btn-block btn-danger"
          onClick={e => onDeleteClick(e)}
        >
          Удалить контракт
        </button>
      </div>
    </div>
  );
};

CreateContract.propTypes = {
  index: PropTypes.number.isRequired,
  contracts: PropTypes.array.isRequired,
  activityTypes: PropTypes.array.isRequired,
  contracts: PropTypes.array.isRequired,
  onContractDelete: PropTypes.func.isRequired,
  contract: PropTypes.object.isRequired,
  onContractChange: PropTypes.func.isRequired,
  reinsurers: PropTypes.array.isRequired
};

export default CreateContract;
