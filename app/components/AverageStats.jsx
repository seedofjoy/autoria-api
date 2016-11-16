import React, { PropTypes } from 'react';

export default function AverageStats({ stats }) {
  return (
    <div>
      <p>{`Всего объявлений: ${stats.total}`}</p>
      <p>{`Средняя цена: ${parseInt(stats.arithmeticMean, 10)} $`}</p>
      <p>{`Средняя цена (1-4 квантиль): ${parseInt(stats.interQuartileMean, 10)} $`}</p>
    </div>
  );
}

AverageStats.propTypes = {
  stats: PropTypes.object.isRequired,
};
