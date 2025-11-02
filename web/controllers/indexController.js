
module.exports = (req, res) => {

    if (req.path === "/home" || req.path === "/"){
        const { getAnnouncements } = require('./announcementController');
        res.render('home', { announcements: getAnnouncements() });
    }
    
    else if (req.path === "/pet-board") {
        res.render('pet-board');
    }

    else if (req.path === "/weather-forecast") {
        res.render('weather-forecast');
    }

}