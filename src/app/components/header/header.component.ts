import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showForm: boolean = false;
  searchIsActive: boolean = false;
  @Output() show: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<string> = new EventEmitter();
  @Output() searchMode: EventEmitter<boolean> = new EventEmitter();
  @Output() showAbout: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit() {}
  toggleVisibility() {
    this.showForm = !this.showForm;
    this.show.emit(this.showForm);
  }
  onInput(searchQuery) {
    this.search.emit(searchQuery);
    if (searchQuery.length > 2) {
      this.searchMode.emit(true);
    } else {
      this.searchMode.emit(false);
    }
  }
  cancelSearch() {
    this.searchIsActive = !this.searchIsActive;
    this.searchMode.emit(false);
  }

  showInfo() {
    this.showAbout.emit(true);
  }
}
