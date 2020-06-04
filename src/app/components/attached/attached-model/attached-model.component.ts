import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-attached-model',
	templateUrl: './attached-model.component.html',
	styleUrls: ['./attached-model.component.css']
})
export class AttachedModelComponent implements OnInit {
	@Input() public attached: any;
	@Input() public buttonText: string;
	@Input() public preloaderStatus: boolean;
	@Output() sendFlagWithInfo: EventEmitter<any> = new EventEmitter();

	constructor() {}

	ngOnInit() {}

	onSubmit(dependenceForm){
		this.sendFlagWithInfo.emit(dependenceForm);
	}

}
