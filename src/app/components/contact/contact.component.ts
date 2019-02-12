import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Contact } from '../../models/contact';
import { FetchService } from '../../services/fetch-service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass'],
})
export class ContactComponent implements OnInit {
  @Input() contact: Contact;
  @Output() editContactId: EventEmitter<number> = new EventEmitter();
  @Output() deleteContactId: EventEmitter<number> = new EventEmitter();
  @Output() show: EventEmitter<boolean> = new EventEmitter();
  hidden: boolean = true;
  constructor(private fetchService: FetchService) {}

  ngOnInit() {}
  onDelete(id: number) {
    if (confirm('Are you sure you want to remove this contact?')) {
      this.deleteContactId.emit(id);
    }
  }
  onEdit(id: number) {
    this.editContactId.emit(id);
    this.show.emit(true);
  }
}
