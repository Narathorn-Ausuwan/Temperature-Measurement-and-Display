const { getAnnouncements } = require('./announcementController');
const { getTemperatureData } = require('./influxDBController');

module.exports = async (req, res) => {

    if (req.path === "/home" || req.path === "/") {
        res.render('home', { announcements: getAnnouncements() });
    }

    else if (req.path === "/pet-board") {
        try {
            // ดึงข้อมูลจาก InfluxDB ผ่าน controller
            const data = await getTemperatureData('sensor_readings', ['temperature', 'humidity'], '-1h');
            res.render('pet-board', { influxData: data });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error fetching data');
        }
    }

    else if (req.path === "/weather-forecast") {
        res.render('weather-forecast');
    }

}