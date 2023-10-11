import React from 'react';

export default function DataTable({ headers, items = [], itemKey }) {
  if (!headers || !headers.length) {
    throw new Error('<DataTable /> headers is required.');
  }

  const headerKey = headers.map((header) => header.value);
  if (!itemKey) {
    itemKey = headerKey[0];
  }

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.text}>
              {header.text}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            {headerKey.map((key) => (
              <td key={key + index}>
                {item[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
