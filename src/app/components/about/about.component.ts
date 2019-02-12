import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass'],
})
export class AboutComponent implements OnInit {
  @Output() showAbout: EventEmitter<boolean> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  closeWindow() {
    this.showAbout.emit(false);
  }
}
