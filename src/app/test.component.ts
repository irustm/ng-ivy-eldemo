import { Component, OnInit } from '@angular/core';

interface Ta {
  s: string?;
}
@Component({
  selector: 'app-test',
  template: `<div (click)="upCount()">{{count}}</div>`
})
export class TestComponent implements OnInit {
  public count: Ta;

  constructor() { }

  ngOnInit() {
    this.count.s = null;
  }

  upCount() {
    //this.count += 1;
  }

}
