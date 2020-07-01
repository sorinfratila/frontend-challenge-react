import React from 'react';
import PropTypes from 'prop-types';
import classes from './AccordionTable.module.scss';

function AccordionTable({ rows = [] }) {
  const rowsEl = rows.map(row => {
    return (
      <tr key={row.label}>
        <td>
          <label>{row.label}</label>
        </td>
        <td>
          <p>{row.value}</p>
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
