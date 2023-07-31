import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AjaxLoadService} from "./services/ajax-load.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges{
    title = 'Hexagon';

    constructor(public ajaxLoadService: AjaxLoadService) {
    }

    ngOnInit(): void {
    }


    ngOnChanges(changes: SimpleChanges): void {
    }
}
