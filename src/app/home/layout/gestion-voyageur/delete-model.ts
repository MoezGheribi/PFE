import {Component, Input, OnInit, Output,EventEmitter} from '@angular/core';


@Component({
  selector: 'delete',
  inputs: ['pk', 'lg'],
  templateUrl: './delete-model.html'
})
export class Delete implements OnInit {
  @Output() deleteFun = new EventEmitter();
  @Input() pk: any;
  @Input() lg: boolean = false;
  name:string = 'Pardeep Jain';
  constructor() { }

  ngOnInit() {
    // console.log('Delete called', this.pk);
  }

  DeleteFunction() {
    this.deleteFun.emit('emit');
  }
}
