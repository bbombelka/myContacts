import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass'],
})
export class FormComponent implements OnInit {
  showForm: boolean = false;

  @Output() contact: EventEmitter<{}> = new EventEmitter();
  @Output() show: EventEmitter<boolean> = new EventEmitter(this.showForm);
  @Input() currentContact;
  @Input() isEdited;

  isValid = {
    name: true,
    phone: true,
    email: true,
  };
  newContact: Contact = {
    id: 0,
    name: '',
    phone: '',
    email: '',
    address: {
      street: '',
      city: '',
    },
  };

  constructor() {}

  ngOnInit() {}

  onSubmit(name, phone, email, street, city, id) {
    this.newContact = {
      id,
      name,
      phone,
      email,
      address: {
        street,
        city,
      },
    };
    this.contact.emit(this.newContact);
  }

  disableVisibility() {
    this.showForm = false;
    this.show.emit(this.showForm);
  }
  lengthValidation(input, length) {
    if (length < 3) {
      console.log('invalid');
      this.isValid[input] = false;
    } else {
      this.isValid[input] = true;
    }
  }
}
