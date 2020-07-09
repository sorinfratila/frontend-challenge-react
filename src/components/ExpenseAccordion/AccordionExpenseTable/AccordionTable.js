import React from 'react';
import PropTypes from 'prop-types';
import classes from './AccordionTable.module.scss';
import Thumbnail from '../../UI/Thumbnail/Thumbnail';

function AccordionTable({ rows = [] }) {
  const baseURL = 'http://localhost:3001';

  const rowsEl = rows.map(row => {
    return (
      <tr key={row.label}>
        <td>
          <label htmlFor="random">{row.label}</label>
        </td>
        <td>
          {row.value instanceof Array ? (
            <div className={classes.thumbnailContainer}>
              {row.value.map(el => (
                <Thumbnail
                  key={el.url}
                  src={baseURL + el.url}
                  small></Thumbnail>
              ))}
            </div>
          ) : row.label === 'date' ? (
            formatDate(row.value)
          ) : (
            <p>{row.value}</p>
          )}
        </td>
      </tr>
    );
  });

  return (
    <table className={classes.table}>
      <colgroup>
        <col className={classes.col_one} />
        <col className={classes.col_two} />
      </colgroup>
      <tbody>{rowsEl}</tbody>
    </table>
  );
}

AccordionTable.propTypes = {
  rows: PropTypes.array,
};

export default AccordionTable;

const formatDate = date => {
  const day = `${
    new Date(date).getDate().toString().length === 1
      ? '0' + new Date(date).getDate()
      : new Date(date).getDate()
  }`;

  const month = `${
    (new Date(date).getMonth() + 1).toString().length === 1
      ? '0' + (new Date(date).getMonth() + 1)
      : new Date(date).getMonth() + 1
  }`;

  const year = `${new Date(date).getFullYear()}`;
  return `${day}-${month}-${year}`;
};
