const { InfluxDB } = require('@influxdata/influxdb-client');

const url = process.env.INFLUX_URL;
const token = process.env.INFLUX_TOKEN;
const org = process.env.INFLUX_ORG;
const bucket = process.env.INFLUX_BUCKET;

const influxDB = new InfluxDB({ url, token });
const queryApi = influxDB.getQueryApi(org);

/**
 * ดึงข้อมูล temperature และ humidity
 * @param {string} measurement - ชื่อ measurement
 * @param {Array<string>} fields - ชื่อ fields
 * @param {string} range - '-1h', '-7d'
 */
async function getTemperatureData(measurement = 'sensor_readings', fields = ['temperature'], range = '-1h') {
  const data = {};

  for (const field of fields) {
    data[field] = [];
    const query = `
      from(bucket: "${bucket}")
        |> range(start: 0)
        |> filter(fn: (r) => r._measurement == "${measurement}")
        |> filter(fn: (r) => r._field == "${field}")
        |> keep(columns: ["_time", "_value", "deviceId", "deviceName", "location"])
    `;

    for await (const row of queryApi.iterateRows(query)) {
      // row.values เป็น array ตาม column keep
      const [, , _time, _value, deviceId, deviceName, location] = row.values;

      data[field].push({
        time: _time,
        value: parseFloat(_value),
        deviceId: deviceId || 'Unknown',
        deviceName: deviceName || 'Unknown',
        location: location || 'Unknown'
      });
    }
  }

  return data;
}

module.exports = { getTemperatureData };
