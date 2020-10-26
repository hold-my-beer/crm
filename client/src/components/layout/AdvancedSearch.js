import React from 'react';
import PropTypes from 'prop-types';

const AdvancedSearch = ({ className, onClassChange }) => {
  return (
    <div className={className}>
      <div className="close-search-button-area">
        <div
          className="close-search-button"
          onClick={e => onClassChange('advanced-search')}
        >
          <div className="close-search-button-item"></div>
          <div className="close-search-button-item"></div>
        </div>
      </div>
      <div className="search-parameters">
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Брокер</strong>
          </div>
          <div className="search-parameter-values">
            <ul>
              <li>
                <input id="0" type="checkbox" name="Marsh" value="Marsh" />
                Marsh
              </li>
              <li>
                <input id="1" type="checkbox" name="Aon" value="Aon" />
                Aon
              </li>
              <li>
                <input id="2" type="checkbox" name="Willis" value="Willis" />
                Willis
              </li>
              <li>
                <input
                  id="3"
                  type="checkbox"
                  name="In2Matrix"
                  value="In2Matrix"
                />
                In2Matrix
              </li>
              <li>
                <input
                  id="4"
                  type="checkbox"
                  name="GrecoJLT"
                  value="GrecoJLT"
                />
                GrecoJLT
              </li>
            </ul>
          </div>
        </div>
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Контакт</strong>
          </div>
          <div className="search-parameter-values">
            <ul>
              <li>
                <input
                  id="0"
                  type="checkbox"
                  name="Елена Поезжаева"
                  value="Елена Поезжаева"
                />
                Елена Поезжаева
              </li>
              <li>
                <input
                  id="1"
                  type="checkbox"
                  name="Виктория Матюшкина"
                  value="Виктория Матюшкина"
                />
                Виктория Матюшкина
              </li>
              <li>
                <input
                  id="2"
                  type="checkbox"
                  name="Анна Воробьева"
                  value="Анна Воробьева"
                />
                Анна Воробьева
              </li>
              <li>
                <input
                  id="3"
                  type="checkbox"
                  name="Наталья Гришина"
                  value="Наталья Гришина"
                />
                Наталья Гришина
              </li>
              <li>
                <input
                  id="4"
                  type="checkbox"
                  name="Елизавета Амбарян"
                  value="Елизавета Амбарян"
                />
                Елизавета Амбарян
              </li>
            </ul>
          </div>
        </div>

        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Дедлайн</strong>
          </div>
          <div className="search-parameter-values">
            <label htmlFor="deadlineFrom">От</label>
            <input type="date" id="deadlineFrom" name="deadlineFrom" value="" />
            <label htmlFor="deadlineTo">До</label>
            <input type="date" id="deadlineTo" name="deadlineTo" value="" />
          </div>
        </div>
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Ответственный</strong>
          </div>
          <div className="search-parameter-values">
            <ul>
              <li>
                <input
                  id="0"
                  type="checkbox"
                  name="Алексютина"
                  value="Алексютина"
                />
                Алексютина
              </li>
              <li>
                <input id="1" type="checkbox" name="Левина" value="Левина" />
                Левина
              </li>
              <li>
                <input id="2" type="checkbox" name="Петров" value="Петров" />
                Петров
              </li>
              <li>
                <input
                  id="3"
                  type="checkbox"
                  name="Щербакова"
                  value="Щербакова"
                />
                Щербакова
              </li>
            </ul>
          </div>
        </div>
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Статус</strong>
          </div>
          <div className="search-parameter-values">
            <ul>
              <li>
                <input
                  id="0"
                  type="checkbox"
                  name="В работе"
                  value="В работе"
                />
                В работе
              </li>
              <li>
                <input
                  id="1"
                  type="checkbox"
                  name="Выиграли"
                  value="Выиграли"
                />
                Выиграли
              </li>
              <li>
                <input
                  id="2"
                  type="checkbox"
                  name="Отправлено"
                  value="Отправлено"
                />
                Отправлено
              </li>
              <li>
                <input
                  id="3"
                  type="checkbox"
                  name="Проиграли"
                  value="Проиграли"
                />
                Проиграли
              </li>
            </ul>
          </div>
        </div>
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Отправлено</strong>
          </div>
          <div className="search-parameter-values">
            <label htmlFor="sentFrom">От</label>
            <input type="date" id="sentFrom" name="sentFrom" value="" />
            <label htmlFor="sentTo">До</label>
            <input type="date" id="sentTo" name="sentTo" value="" />
          </div>
        </div>
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Тип</strong>
          </div>
          <div className="search-parameter-values">
            <ul>
              <li>
                <input
                  id="0"
                  type="checkbox"
                  name="Реальный"
                  value="Реальный"
                />
                Реальный
              </li>
              <li>
                <input
                  id="1"
                  type="checkbox"
                  name="Пролонгация"
                  value="Пролонгация"
                />
                Пролонгация
              </li>
              <li>
                <input
                  id="2"
                  type="checkbox"
                  name="Формальный"
                  value="Формальный"
                />
                Формальный
              </li>
              <li>
                <input
                  id="3"
                  type="checkbox"
                  name="Расширение"
                  value="Расширение"
                />
                Расширение
              </li>
            </ul>
          </div>
        </div>
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Дата пролонгации</strong>
          </div>
          <div className="search-parameter-values">
            <label htmlFor="renewalFrom">От</label>
            <input type="date" id="renewalFrom" name="renewalFrom" value="" />
            <label htmlFor="renewalTo">До</label>
            <input type="date" id="renewalTo" name="renewalTo" value="" />
          </div>
        </div>
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Перестраховщик</strong>
          </div>
          <div className="search-parameter-values">
            <ul>
              <li>
                <input
                  id="0"
                  type="checkbox"
                  name="Insurope"
                  value="Insurope"
                />
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
        </div>
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Премия</strong>
          </div>
          <div className="search-parameter-values">
            <label htmlFor="premiumFrom">От</label>
            <input type="number" id="premiumFrom" name="premiumFrom" value="" />
            <label htmlFor="premiumTo">До</label>
            <input type="number" id="premiumTo" name="premiumTo" value="" />
          </div>
        </div>
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Численность</strong>
          </div>
          <div className="search-parameter-values">
            <label htmlFor="populationFrom">От</label>
            <input
              type="number"
              id="populationFrom"
              name="populationFrom"
              value=""
            />
            <label htmlFor="populationTo">До</label>
            <input
              type="number"
              id="populationTo"
              name="populationTo"
              value=""
            />
          </div>
        </div>
        <input
          type="button"
          className="btn btn-primary btn-block"
          value="Найти"
        />
      </div>
    </div>
  );
};

AdvancedSearch.propTypes = {};

export default AdvancedSearch;
