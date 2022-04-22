import { co2_icon, humidity_icon, particle_icon, pressure_icon, sound_icon, temperature_icon } from "./assets/images/icons"

const backendURL = "http://192.168.1.68:5000";

const knownSensors =  new Map();
knownSensors.set("eCO2", co2_icon);
knownSensors.set("Noise", sound_icon);
knownSensors.set("Barometric Pressure", pressure_icon);
knownSensors.set("PM1.0", particle_icon);
knownSensors.set("PM10", particle_icon);
knownSensors.set("PM2.5", particle_icon);
knownSensors.set("Humidity", humidity_icon);
knownSensors.set("Temperature", temperature_icon);


export { backendURL, knownSensors }