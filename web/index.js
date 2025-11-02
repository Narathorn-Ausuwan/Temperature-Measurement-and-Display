
const express = require('express');
const dotenv = require('dotenv');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const app = express();
const ejs = require('ejs');

dotenv.config();

app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 4000;
const indexController = require('./controllers/indexController');

const influxDB = new InfluxDB({
  url: process.env.INFLUX_URL,
  token: process.env.INFLUX_TOKEN
});
const writeApi = influxDB.getWriteApi(process.env.INFLUX_ORG, process.env.INFLUX_BUCKET, 'ns');

app.get('/', indexController);
app.get('/home', indexController);
app.get('/pet-board', indexController);
app.get('/weather-forecast', indexController);
app.get('/log', indexController);

app.post('/api/sensorReading', async (req, res) => {

  const clientApiKey = req.headers['api-key'];
  if (!clientApiKey || clientApiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Invalid API Key' });
  }

  const { deviceId, deviceName, location, temperature } = req.body;

  if (!deviceId || temperature === undefined) {
    return res.status(400).json({ error: 'Missing required data.' });
  }

  const point = new Point('sensor_readings')
    .tag('deviceId', deviceId)
    .tag('deviceName', deviceName || 'Unknown')
    .tag('location', location || 'Unknown')
    .floatField('temperature', parseFloat(temperature));

  try {
    writeApi.writePoint(point);
    await writeApi.flush();

    console.log(`[INFO] Write SUCCESS for device: ${deviceId}`);
    res.status(201).json({ message: 'Data logged and flushed.' });

  } catch (error) {
    console.error('Error writing to InfluxDB:', error);
    res.status(500).json({ error: 'Failed to log data to InfluxDB.' });
  }

});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
