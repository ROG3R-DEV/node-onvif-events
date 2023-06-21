declare module 'onvif' {
  import { EventEmitter } from 'events';

  export type ConnectionCallback = (error?: Error) => void;

  export interface NotificationMessage {
    topic: { _: string };
    message: {
      message: {
        $: object;
        source: object;
        data: {
          simpleItem: SimpleItem | Array<SimpleItem>;
        };
      };
    };
  }

  interface SimpleItem {
    $: {
      Name: string;
      Value: boolean;
    };
  }

  export interface CamOptions {
    hostname: string;
    username?: string;
    password?: string;
    port?: number;
    path?: string;
    timeout?: number;
    preserveAddress?: boolean;
  }
  export class Cam extends EventEmitter {
    constructor(options: CamOptions, callback: ConnectionCallback);
    connect(callback: ConnectionCallback): void;
    on(event: 'event', listener: (message: NotificationMessage) => void): this;
  }
}
