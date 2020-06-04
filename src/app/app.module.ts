// Imports necesarios
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { NgxPaginationModule } from 'ngx-pagination';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import * as $ from 'jquery';

import { AppComponent } from './app.component';
import { FiledInComponent } from './components/filed/filed-in/filed-in.component';
import { MemorandumRegisterComponent } from './components/memorandum/memorandum-register/memorandum-register.component';
import { AppUsersRegisterComponent } from './components/app-users/app-users-register/app-users-register.component';
import { DocumentsRegisterComponent } from './components/documents/documents-register/documents-register.component';
import { FiledOutComponent } from './components/filed/filed-out/filed-out.component';
import { FiledSearchComponent } from './components/filed/filed-search/filed-search.component';
import { FiledOutModelComponent } from './components/filed/filed-out-model/filed-out-model.component';
import { FiledInModelComponent } from './components/filed/filed-in-model/filed-in-model.component';
import { MemorandumModelComponent } from './components/memorandum/memorandum-model/memorandum-model.component';

import { IdentityGuard } from './services/identity.guard';
import { IdentityAdminGuard } from './services/identityAdmin.guard';

import { UserService } from './services/user.service';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UserEditPasswordComponent } from './components/user/user-edit-password/user-edit-password.component';

import { DependenceModelComponent } from './components/dependence/dependence-model/dependence-model.component';
import { DependenceListComponent } from './components/dependence/dependence-list/dependence-list.component';
import { DependenceRegisterComponent } from './components/dependence/dependence-register/dependence-register.component';
import { DependenceEditComponent } from './components/dependence/dependence-edit/dependence-edit.component';

import { AttachedModelComponent } from './components/attached/attached-model/attached-model.component';
import { AttachedListComponent } from './components/attached/attached-list/attached-list.component';
import { AttachedRegisterComponent } from './components/attached/attached-register/attached-register.component';
import { AttachedEditComponent } from './components/attached/attached-edit/attached-edit.component';

import { UserClasificationModelComponent } from './components/user-clasification/user-clasification-model/user-clasification-model.component';
import { UserClasificationListComponent } from './components/user-clasification/user-clasification-list/user-clasification-list.component';
import { UserClasificationRegisterComponent } from './components/user-clasification/user-clasification-register/user-clasification-register.component';
import { UserClasificationEditComponent } from './components/user-clasification/user-clasification-edit/user-clasification-edit.component';

@NgModule({
	declarations: [
		AppComponent,
		FiledInComponent,
		MemorandumRegisterComponent,
		AppUsersRegisterComponent,
		DocumentsRegisterComponent,
		FiledOutComponent,
		FiledSearchComponent,
		FiledOutModelComponent,
		FiledInModelComponent,
		MemorandumModelComponent,
		UserLoginComponent,
		UserListComponent,
		UserEditComponent,
		UserEditPasswordComponent,
		UserRegisterComponent,
		DependenceListComponent,
		DependenceModelComponent,
		DependenceRegisterComponent,
		DependenceEditComponent,
		AttachedListComponent,
		AttachedModelComponent,
		AttachedRegisterComponent,
		AttachedEditComponent,
		UserClasificationListComponent,
		UserClasificationModelComponent,
		UserClasificationRegisterComponent,
		UserClasificationEditComponent
  	],
	imports: [
  		BrowserModule,
  		routing,
  		FormsModule,
  		HttpClientModule,
  		AngularFileUploaderModule,
  		NgxPaginationModule
	],
	providers: [
		appRoutingProviders,
		{provide: LocationStrategy, useClass: HashLocationStrategy},
		IdentityAdminGuard,
		IdentityGuard,
		UserService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
