const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const Room = require("../models/room");

router.get("/getallrooms", async (req, res) => {
    try {
        const rooms = await Room.find({});
        return res.send({ rooms });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/getroombyid", async (req, res) => {
    const roomid = req.body.roomid;
    try {
        const room = await Room.find({ code: roomid });
        return res.send({ room });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router;
