import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DocumentsService } from '../../../services/documents.service';
import { global } from '../../../services/global';
import { Documents } from '../../../models/documents';

@Component({
	selector: 'app-documents-register',
	templateUrl: './documents-register.component.html',
	styleUrls: ['./documents-register.component.css'],
	providers: [
		DocumentsService
	]
})

export class DocumentsRegisterComponent implements OnInit {
	@Output() sendName:EventEmitter<any> = new EventEmitter()

	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public fileStatus: string;
	public responseMessage: string;
	public documentLoad: boolean;
	public resetVar: boolean;

	public afuConfig = {
	    multiple: false,
	    formatsAllowed:  ".pdf, .xlsx, .xlsm, .xlsb, .doc, .docx, .zip, .rar, .jpg, .dwg",
	    maxSize: "70",
	    uploadAPI:  {
			url: global.url + 'filed/upload-file',
			headers: {
	    		//"Authorization" : this._userService.getToken()
			}
	    },
	    theme: "attachPin",
	    hideProgressBar: false,
	    hideResetBtn: true,
	    hideSelectBtn: false,
	    attachPinText: 'Seleccionar Archivo'
	};

	constructor(
		private _documentsService: DocumentsService
	) {
		this.resetVar = false;
	}

	ngOnInit() {
	}

	fileUpload(info){
		let inputSelected = document.querySelector('.afu-attach-pin');
		let data = JSON.parse(info.response);

		inputSelected.classList.remove('correct');
		inputSelected.classList.remove('incorrect');

		if(data.status == 'success'){
			this.fileStatus = 'success';
			this.responseMessage = data.message;

			inputSelected.classList.add('correct');
			this.passName(data.file);
		} else{
			this.fileStatus = 'error';
			this.responseMessage = data.error.message;
			inputSelected.classList.add('incorrect'); 
		}
	}

	passName(document_name){
		this.sendName.emit(document_name);
	}
}
