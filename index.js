const express = require('express');
const { Router } = require('express');
const router = Router();
const app = express();

app.set('port', 4000);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

function convertTemp (temp, from_scale, to_scale) {

  const from = {
    'C': temp,
    'F': (temp - 32) * 5 / 9,
    'K': temp - 273.15
  };

  temp = from[from_scale];

  const to = {
    'C': temp,
    'F': temp * 9 / 5 + 32,
    'K': temp + 273.15
  };

  return String(to[to_scale]);
}

router.get('/temps/api', function(req, res) {
  const q = req.query.q;
  const queryStringDataColletion = q.replace(/to /i, '').split(' ');
  console.log(queryStringDataColletion);

  let temperatureValue = parseFloat(queryStringDataColletion[0]);
  let temperatureFromScale = queryStringDataColletion[1].toUpperCase();
  let temperatureToScale = queryStringDataColletion[2].toUpperCase();

  res.send(convertTemp(temperatureValue, temperatureFromScale, temperatureToScale));
});

app.use('/', router);
app.listen(app.get('port'), () => console.log('Server on port', app.get('port')));
