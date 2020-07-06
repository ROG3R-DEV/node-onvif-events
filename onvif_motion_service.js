/*
  name: onvif-events
  version: "1.0.0
  description: An implementation of Node.js that detects the events of your camera that works with the onvif protocol
  author: Rogério Luiz <rogerio.macdev@gmail.com>
*/

const chalk = require('chalk');
const fetch = require('node-fetch');

class MotionService {
    constructor(basePath) {
      this.basePath = basePath
    }
  
    logTime() {
      let nowDate = new Date();
      return nowDate.toLocaleDateString() + ' ' + nowDate.toLocaleTimeString([], { hour12: false });
    }
    /**
     * @param {number} cameraId
     * @param {boolean} state
     */
    setAlarm(cameraId, state) {
      console.log(this.logTime(), process.pid, chalk.bold.red('[MOTION DETECTION]'),'[CAMERA',cameraId+']:','Mudança de estado (isMotion):',state);
      const cmd = state ? 'on' : 'off';
      const url = `${this.basePath}${cameraId}/config/set?emulate_motion=${cmd}`;
      return fetch(url);
    }
  }

  module.exports = MotionService;