import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-user-clasification-model',
	templateUrl: './user-clasification-model.component.html',
	styleUrls: ['./user-clasification-model.component.css']
})
export class UserClasificationModelComponent implements OnInit {
	@Input() public userClasification: any;
	@Input() public buttonText: string;
	@Input() public preloaderStatus: boolean;
	@Output() sendFlagWithInfo: EventEmitter<any> = new EventEmitter();

	constructor() {}

	ngOnInit() {}

	onSubmit(dependenceForm){
		this.sendFlagWithInfo.emit(dependenceForm);
	}
}
