import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Message } from 'src/models/message';
import { HomeschoolService } from 'src/services/homeschool.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(public homeSchoolService: HomeschoolService) { }
  @Input() homeSchoolId?: string
  @Input() showModal?: boolean
  @Output() getModalStatusEvent: EventEmitter<boolean> = new EventEmitter();
  message: Message = new Message(this.homeSchoolId);
  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.message.homeSchoolId = changes['homeSchoolId'].currentValue;
  }
  send(): void { 
    this.errors = [];
    if (!this.message.email || !this.validateEmail(this.message.email)) { 
      this.errors.push('Your email is required and needs to be valid');
    }
    if (!this.message.name) { 
      this.errors.push('Your name is required');
    }
    if (!this.message.body) { 
      this.errors.push('Message is required');
    }

    if (this.errors.length > 0) return;
    this.homeSchoolService.sendMessage(this.message).subscribe(
      result => console.warn(result)
    )
    this.closeForm();
  }
  closeForm(): void { 
    this.message = new Message('');
    this.showModal = false;
    this.getModalStatusEvent.emit(this.showModal);
  }

  validateEmail(email:string): boolean {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  errors: string[] = []
}
