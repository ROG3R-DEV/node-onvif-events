# node-onvif-events

A node.JS module that attempts to bridge the gap between your ONVIF camera's motion detection and Motion.

Forked from [zmonvif-events](https://github.com/nickw444/zmonvif-events) and converted for node.JS.

[![NPM](https://nodei.co/npm/node-onvif-events.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/node-onvif-events/)

[![npm](https://img.shields.io/npm/dm/node-onvif-events.svg)](https://www.npmjs.com/package/node-onvif-events)
[![npm](https://img.shields.io/npm/v/node-onvif-events.svg)](https://www.npmjs.com/package/node-onvif-events)

**If you like this project you can support me.**  
<a href="https://www.buymeacoffee.com/rog3r" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-white.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>

## Installation

```shell
    $ npm install --save node-onvif-events
```

## Event Monitor

```js
    const MotionDetection = require('node-onvif-events');

    var configMotion = new MotionDetection({
        url: 'http://192.168.0.230/onvif/device_service/ ', // Onvif Service URL
        id: 1,// Any id
        hostname: '192.168.0.230', // IP from your Device
        username: 'admin', // User
        password: 'pass0rd', // Password
        port: 80 // Onvif Service Port
    });
    
    // Starts Monitoring
    configMotion.start();
```

## Action when Detecting Motion 

```js
    const MotionDetection = require('node-onvif-events');

    var lastState = null;

    var configMotion = new MotionDetection({
        url: 'http://192.168.0.230/onvif/device_service/ ', // Onvif Service URL
        id: 1,// Any id
        hostname: '192.168.0.230', // IP from your Device
        username: 'admin', // User
        password: 'pass0rd', // Password
        port: 80 // Onvif Service Port
    });

    function motion() {
        console.log("Motion Detected!!");
    }
    
    function motionStop() {
        console.log("Motion Stopped!!");
    }
    
    function checkState(){
        setInterval(function () {
          var motionState = configMotion.getMotionState();
          if(motionState === true && motionState !== lastState){
            motion()
          }
          else if (motionState === false && motionState !== lastState){
	    motionStop();
	}
	lastState = configMotion.getMotionState();
        }, 1000)
      }

      configMotion.start();
      checkState();
```
