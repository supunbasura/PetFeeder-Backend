const mqtt = require("mqtt");
const PetFeeder = require("../models/pet-feeder");
const { petFeederIdPrev } = require("./configs");
exports.petFeederIdPrev = "ffffffffffffff";

exports.API_URL = "https://vast-teal-ring.cyclic.app";
// exports.API_URL = "https://smart-pet-feeder-backend.herokuapp.com";

// HiveMQ Cloud broker connection options
const options = {
  host: 'eeeb71bdb3674f92903ba65e6c9d6f35.s1.eu.hivemq.cloud',
  port: 8883,
  protocol: 'mqtts',
  username: 'mahel-MQTT',
  password: 'mahel-MQTT123'
};

// Connect to HiveMQ Cloud broker
let mqtt_client = mqtt.connect(options);

exports.client = mqtt_client;

let petFeederId = "0123456789";
let timout = 3;
const resetPetFeederON = () => {
    PetFeeder.findById("ffffffffffffff" + petFeederId)
        .then(petFeeder => {
            // Change this later to false
            petFeeder.status = true;
            return petFeeder.save();
        })
        .catch(err => {
            const message = err.message;
            console.log(message);
        })
}

let timer = setInterval(() => {
    resetPetFeederON(petFeederId);
}, timout * 60 * 1000);

exports.resetTimer = () => {
    clearInterval(timer);
    timer = setInterval(() => {
        resetPetFeederON(petFeederId);
    }, timout * 60 * 1000);
}