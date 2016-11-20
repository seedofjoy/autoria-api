import React, { PropTypes } from 'react';


export const statsShape = PropTypes.shape({
  arithmeticMean: PropTypes.number.isRequired,
  classifieds: PropTypes.arrayOf(PropTypes.number).isRequired,
  interQuartileMean: PropTypes.number.isRequired,
  percentiles: PropTypes.shape({
    1.0: PropTypes.number,
    5.0: PropTypes.number,
    25.0: PropTypes.number,
    50.0: PropTypes.number,
    75.0: PropTypes.number,
    95.0: PropTypes.number,
    99.0: PropTypes.number,
  }).isRequired,
  prices: PropTypes.arrayOf(PropTypes.number).isRequired,
  total: PropTypes.number.isRequired,
});


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
  stats: statsShape.isRequired,
};
