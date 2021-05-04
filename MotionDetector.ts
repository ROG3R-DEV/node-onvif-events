import { Cam, NotificationMessage, CamOptions } from 'onvif';

const TOPIC = /RuleEngine\/CellMotionDetector\/Motion$/;

export class MotionDetector {
  lastIsMotion: boolean = false;

  private constructor(private cam: Cam, private id: number) {}

  static async create(
    id: number,
    options: CamOptions
  ): Promise<MotionDetector> {
    return new Promise((resolve, reject) => {
      const cam = new Cam(options, (error) => {
        if (error) {
          reject(error);
        } else {
          const monitor = new MotionDetector(cam, id);
          resolve(monitor);
        }
      });
    });
  }

  listen(onMotion: (motion: boolean, id: number) => void) {
    this.cam.on('event', (message: NotificationMessage) => {
      if (message?.topic?._?.match(TOPIC)) {
        const motion = message.message.message.data.simpleItem.$.Value;
        if (motion !== this.lastIsMotion) {
          this.lastIsMotion = motion;
          onMotion(motion, this.id);
        }
      }
    });
  }

  close(): void {
    this.cam.removeAllListeners('event');
  }
}
