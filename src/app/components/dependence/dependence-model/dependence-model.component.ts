import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-dependence-model',
	templateUrl: './dependence-model.component.html',
	styleUrls: ['./dependence-model.component.css']
})
export class DependenceModelComponent implements OnInit {
	@Input() public dependence: any;
	@Input() public buttonText: string;
	@Input() public preloaderStatus: boolean;
	@Output() sendFlagWithInfo: EventEmitter<any> = new EventEmitter();

	constructor() {
	}

	ngOnInit() {
	}

	onSubmit(dependenceForm){
		this.sendFlagWithInfo.emit(dependenceForm);
	}
}
