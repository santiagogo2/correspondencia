import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()

export class IdentityAdminGuard implements CanActivate{
	constructor(
		private _userService: UserService,
		private _router: Router
	){}

	canActivate(){
		let identity = this._userService.getIdentity();

		if(identity && identity.role == 'admin'){
			return true;
		} else {
			this._router.navigate(['/radicado/salida']);
			return false;
		}
	}
}