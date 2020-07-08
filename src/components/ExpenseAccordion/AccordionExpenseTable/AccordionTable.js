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
          <label>{row.label}</label>
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
