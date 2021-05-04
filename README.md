# node-onvif-events

<img width="914" alt="Node Onvif Events" src="https://i.imgur.com/xdYpPIs.png" align="center">

<br />

<center>
<a href="https://www.npmjs.com/package/node-onvif-events"><img src="https://img.shields.io/npm/dm/node-onvif-events.svg"/></a>
<a href="https://www.npmjs.com/package/node-onvif-events"><img src="https://img.shields.io/npm/v/node-onvif-events"/></a>
</center>
<center>
An implementation of Node.js that detects the events of your camera that works with the onvif protocol.
You can use this library to turn on a lamp, send notification to a device among others .. the possibilities are limitless! 🚀✨⚡️
</center>

<br />

node-onvif-events was created during a LaCETI Cin UFPE project where it was necessary to detect security cameras movements and communicate with iot devices.

<br />

[![NPM](https://nodei.co/npm/node-onvif-events.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/node-onvif-events/)


**If you like this project you can support me.**  
<a href="https://www.buymeacoffee.com/rog3r" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-white.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>

<br />

## Installation

```shell
    $ npm install --save node-onvif-events
```
```shell
    $ yarn add node-onvif-events
```

<br />

## Tested Cameras

the library must be compatible with any camera that works with onvif protocol and has motion detection support.

see the list of tested models, if your camera worked and is not in this list please open it issue and i will add it.

<br />

| Brand     | Model         |
|-----------|---------------|
| Hiseeu    | 50X10_32M     |
| Gadinan   | 50X10_32M     |
| OEM       | 50X10_32M     |
| Intelbras | VIP 1220 D G3 |

<br />


## Typescript Example

```js
import { MotionDetector, Options } from 'node-onvif-events';

const options: Options = {
  id: 1,                      // Any number id
  hostname: '192.168.0.160',  // IP Address of device
  username: 'admin',          // User
  password: 'password',       // Password
  port: 80,                   // Onvif device service port
};

const startMotion = async () => {
  const detector = await MotionDetector.create(options.id, options);
  console.log(new Date(), '>> Motion Detection Listening!');
  detector.listen((motion) => {
    if (motion) {
      console.log(new Date(), '>> Motion Detected');
    } else {
      console.log(new Date(), '>> Motion Stopped');
    }
  });
};

startMotion();

```

## Javascript Example

```js
const onvifEvents = require("node-onvif-events");

let options = {
  id: 1,
  hostname: '192.168.0.160',
  username: 'admin',
  password: 'matrix@55901',
  port: 80
};

const startMotion = async () => {
  const detector = await onvifEvents.MotionDetector.create(options.id, options);
  console.log(new Date(), '>> Motion Detection Listening!!');
  detector.listen((motion) => {
    if (motion) {
      console.log(new Date(), '>> Motion Detected');
    } else {
      console.log(new Date(), '>> Motion Stopped');
    }
  });
}

startMotion();
```

### output
```
2021-05-03T23:06:17.280Z >> Motion Detection Listening!
2021-05-03T23:06:26.471Z >> Motion Detected
2021-05-03T23:06:29.350Z >> Motion Stopped
2021-05-03T23:06:33.372Z >> Motion Detected
```

<br />


## Contributors

<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/rog3r-dev/"><img src="https://avatars.githubusercontent.com/u/61806102?v=4" width="80px;" alt=""/><br /><sub><b>Rogério Luiz</b></sub></a><br /><a title="code">💻</a> <a title="Ideas, Planning, & Feedback">🤔</a> <a title="Concept">💡</a> <a title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/marvson"><img src="https://avatars.githubusercontent.com/u/12283227?v=4" width="80px;" alt=""/><br /><sub><b>Marvson Allan</b></sub></a><br /><a title="code">💻</a> <a title="Ideas, Planning, & Feedback">🤔</a> <a title="Reviewed Pull Requests">👀</a> </td>
  </tr>
</table>
<!-- markdownlint-restore -->
