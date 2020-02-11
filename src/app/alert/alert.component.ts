import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { Message } from '../interfaces/message';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {

    message: Message;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
      this.alertService.getAlert().subscribe((message) => this.message = message);
    }

    close() {
      this.message = null;
    }

    ngOnDestroy() {
      this.alertService.getAlert().subscribe().unsubscribe();
    }
}
