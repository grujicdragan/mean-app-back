const express = require('express');
const router = express.Router();
const passport = require('passport');

const Time = require('../models/time');

router.get('/all', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if(!req.user) {
        return res.status(401).send("You are not authorized to perform this operation");
    }
    const timeDb = await Time.find({ user: req.user._id, stop: { $ne: null }});
    res.send(timeDb);
});

router.get('/lastTime', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if(!req.user) {
        return res.status(401).send("You are not authorized to perform this operation");
    }
    const timeDb = await Time.getTime(req.user._id);
    if (timeDb) {
        res.send(timeDb);
    } else {
        res.send(null);
    }
});

router.post('/start', passport.authenticate('jwt', { session: false }), (req, res) => {
    if(!req.user) {
        return res.status(401).send("You are not authorized to perform this operation");
    }
    const currDate = new Date();
    const time = new Time({
        start: currDate.getTime(),
        user: req.user
    });
    Time.addTime(time, (err) => {
        if (err) {
            res.json({ success: false, msg: err.message });
        } else {
            res.json({ success: true, msg: 'Time start clocking' });
        }
    });
});

router.put('/stop', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if(!req.user) {
        return res.status(401).send("You are not authorized to perform this operation");
    }
    const timeDb = await Time.getTime(req.user._id);
    const currDate = new Date();
    timeDb.stop = currDate.getTime();
    await timeDb.save();
    res.json({ success: true, msg: 'Time stop clocking' });
});

module.exports = router;