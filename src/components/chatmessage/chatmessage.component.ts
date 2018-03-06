import { Component, Input } from '@angular/core';

import { Message } from '../../models/messages/message.interface';

@Component({
  selector: 'app-chat-message',
  templateUrl: 'chatmessage.component.html'
})
export class ChatmessageComponent {

  @Input() chatMessage: Message;

  @Input() chatIndex: number;

  constructor() {

  }

}
