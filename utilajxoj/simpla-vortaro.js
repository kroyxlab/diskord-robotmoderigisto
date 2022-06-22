const fetch = require('node-fetch');

// Serĉu la tradukon de la vorto enmetita
exports.difinu = async (vorto) => {
  const ligilo = `http://www.simplavortaro.org/api/v1/vorto/${vorto.toLowerCase()}`;
  const sercxo = await fetch(ligilo)
    .then((sercxado) => sercxado.json())
    .then(({ difinoj }) => difinoj.map(({ difino }) => difino))
    .then((difino) => difino.filter((vortdifino) => vortdifino !== null).join('\n\n'))
    .catch(() => 'eraro');

  return sercxo;
};

// Serĉu tradukon de vorto enmetita
exports.traduku = async (vorto) => {
  const ligilo = `http://www.simplavortaro.org/api/v1/vorto/${vorto.toLowerCase()}`;
  const sercxo = await fetch(ligilo)
    .then((sercxado) => sercxado.json())
    .then(({ difinoj }) => difinoj
      .map(({ tradukoj }) => tradukoj
        .map(({ lingvo, traduko }) => ({ lingvo, traduko }))))
    .then((tradukoj) => tradukoj[0].sort())
    .catch(() => 'eraro');

  return sercxo;
};

// Analizu la vorton enmetitan en siaj eroj
exports.analizu = async (vorto) => {
  const ligilo = `http://www.simplavortaro.org/api/v1/trovi/${vorto.toLowerCase()}`;
  const sercxo = await fetch(ligilo)
    .then((sercxado) => sercxado.json())
    .then(({ vortfarado }) => vortfarado[0])
    .then(({ rezulto, partoj }) => {
      const partaro = partoj
        .filter((vortero) => vortero.vorto !== null)
        .map((vortero) => vortero.vorto);

      return { rezulto, partoj: partaro };
    })
    .catch(() => 'eraro');

  return sercxo;
};
