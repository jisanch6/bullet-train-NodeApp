exports.getOverview = (req, res) => {
  res.status(200).render('overview', {
    title: 'All Departures',
  });
};

exports.getDeparture = (req, res) => {
  res.status(200).render('departure', {
    title: 'To Houston',
  });
};
