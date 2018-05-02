import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './ngdb-modal.component.html',
    styleUrls: ['./ngdb-modal.component.css']
  })
  export class NgbdModalContent {
    @Input() name;
  
    constructor(public activeModal: NgbActiveModal) {}
  }