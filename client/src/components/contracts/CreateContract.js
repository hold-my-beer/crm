import React from 'react';
import PropTypes from 'prop-types';

const CreateContract = props => {
  return (
    <div className="contract-parameters">
      <div className="contract-parameters-header">Контракт №1</div>
      <div className="contract-parameters-content">
        <div className="form-group">
          <label htmlFor="entity">Юрлицо *</label>
          <input
            type="text"
            name="entity"
            id="entity"
            list="entities"
            placeholder="Начните ввод..."
          />
          <datalist id="entities">
            <option value="Coca-Cola"></option>
            <option value="KSB"></option>
            <option value="Lufhansa"></option>
          </datalist>
        </div>
        <div className="form-group">
          <label htmlFor="premium">Премия *</label>
          <input
            type="number"
            name="premium"
            id="premium"
            placeholder="Начните ввод..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="contract-number">Номер договора *</label>
          <input
            type="text"
            name="contract-number"
            id="contract-number"
            placeholder="Начните ввод..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Дата начала *</label>
          <input type="date" id="startDate" name="startDate" value="" />
        </div>
        <div className="form-group">
          <label htmlFor="renewal">Дата пролонгации *</label>
          <input type="date" id="renewal" name="renewal" value="" />
        </div>
        <div className="form-group">
          <label htmlFor="responsible">Ответственный *</label>
          <input
            type="text"
            name="responsible"
            id="responsible"
            list="responsibles"
            placeholder="Начните ввод..."
          />
          <datalist id="responsibles">
            <option value="Петров"></option>
            <option value="Левина"></option>
            <option value="Абмаева"></option>
          </datalist>
        </div>
        <div className="form-group">
          <label htmlFor="reinsurers">Перестраховщики *</label>
          <ul id="reinsurers">
            <li>
              <input id="0" type="checkbox" name="Insurope" value="Insurope" />
              Insurope
            </li>
            <li>
              <input id="1" type="checkbox" name="Zurich" value="Zurich" />
              Zurich
            </li>
            <li>
              <input id="2" type="checkbox" name="GenRe" value="GenRe" />
              GenRe
            </li>
            <li>
              <input id="3" type="checkbox" name="СУ" value="СУ" />
              СУ
            </li>
          </ul>
        </div>
        <div className="form-group">
          <label htmlFor="broker">Брокер *</label>
          <input
            type="text"
            name="broker"
            id="broker"
            list="brokers"
            placeholder="Начните ввод..."
          />
          <datalist id="brokers">
            <option value="Marsh"></option>
            <option value="Aon"></option>
            <option value="Willis"></option>
          </datalist>
        </div>
        <div className="form-group">
          <label htmlFor="contact">Контактное лицо *</label>
          <input
            type="text"
            name="contact"
            id="contact"
            list="contacts"
            placeholder="Начните ввод..."
          />
          <datalist id="contacts">
            <option value="Елизавета Амбарян"></option>
            <option value="Елена Поезжаева"></option>
            <option value="Наталья Гришина"></option>
          </datalist>
        </div>
        <div className="form-group">
          <label htmlFor="population">Численность *</label>
          <input
            type="number"
            name="population"
            id="population"
            placeholder="Начните ввод..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="activity-type">ОКВЭД *</label>
          <input
            type="text"
            name="activity-type"
            id="activity-type"
            list="activity-types"
            placeholder="Начните ввод..."
          />
          <datalist id="activity-types">
            <option value="Торговля"></option>
            <option value="Производство"></option>
            <option value="Развлечения"></option>
          </datalist>
        </div>
        <div className="form-group">
          <label>Упоминание в тендерах</label>
          <div className="inline-group">
            <input type="radio" name="mention" id="yes" value="yes" />
            <label htmlFor="yes">Да</label>
          </div>
          <div className="inline-group">
            <input type="radio" name="mention" id="no" value="no" />
            <label htmlFor="no">Нет</label>
          </div>
          <div className="inline-group">
            <input type="radio" name="mention" id="unknown" value="unknown" />
            <label htmlFor="unknown">Не известно</label>
          </div>
        </div>
        <div className="form-group">
          <label>Пролонгация *</label>
          <div className="inline-group">
            <input type="radio" name="mention" id="yes" value="yes" />
            <label htmlFor="yes">Да</label>
          </div>
          <div className="inline-group">
            <input type="radio" name="mention" id="no" value="no" />
            <label htmlFor="no">Нет</label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="comment">Комментарий</label>
          <textarea name="comment" id="comment" rows="5"></textarea>
        </div>
      </div>
    </div>
  );
};

CreateContract.propTypes = {};

export default CreateContract;
