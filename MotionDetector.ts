import { Cam, NotificationMessage, CamOptions } from 'onvif';

const TOPICS = ['tns1:RuleEngine/CellMotionDetector/Motion'];

export class MotionDetector {
  lastIsMotion: boolean = false;

  private constructor(
    private cam: Cam,
    private id: number,
    private topics: Array<string>
  ) {}

  static async create(
    id: number,
    options: CamOptions,
    topics: Array<string> = TOPICS
  ): Promise<MotionDetector> {
    return new Promise((resolve, reject) => {
      const cam = new Cam(options, (error) => {
        if (error) {
          reject(error);
        } else {
          const monitor = new MotionDetector(cam, id, topics);
          resolve(monitor);
        }
      });
    });
  }

  listen(onMotion: (motion: boolean, id: number, topic: string) => void) {
    this.cam.on('event', (message: NotificationMessage) => {
      if (this.topics.includes(message?.topic?._)) {
        const simpleItem = message.message.message.data.simpleItem;
        const motion = (
          simpleItem instanceof Array ? simpleItem[0] : simpleItem
        ).$.Value;
        if (motion !== this.lastIsMotion) {
          this.lastIsMotion = motion;
          onMotion(motion, this.id, message.topic._);
        }
      }
    });
  }

  close(): void {
    this.cam.removeAllListeners('event');
  }
}
