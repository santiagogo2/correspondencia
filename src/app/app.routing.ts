// Imports necesarios para el archivo de rutas
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdentityGuard } from './services/identity.guard';
import { IdentityAdminGuard } from './services/identityAdmin.guard';

//Componentes radicados
import { FiledInComponent } from './components/filed/filed-in/filed-in.component';
import { FiledOutComponent } from './components/filed/filed-out/filed-out.component';
import { FiledSearchComponent } from './components/filed/filed-search/filed-search.component';
import { MemorandumRegisterComponent } from './components/memorandum/memorandum-register/memorandum-register.component';
import { AppUsersRegisterComponent } from './components/app-users/app-users-register/app-users-register.component';

import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UserEditPasswordComponent } from './components/user/user-edit-password/user-edit-password.component';

import { DependenceListComponent } from './components/dependence/dependence-list/dependence-list.component';
import { DependenceRegisterComponent } from './components/dependence/dependence-register/dependence-register.component';
import { DependenceEditComponent } from './components/dependence/dependence-edit/dependence-edit.component';

import { AttachedListComponent } from './components/attached/attached-list/attached-list.component';
import { AttachedRegisterComponent } from './components/attached/attached-register/attached-register.component';
import { AttachedEditComponent } from './components/attached/attached-edit/attached-edit.component';

import { UserClasificationListComponent } from './components/user-clasification/user-clasification-list/user-clasification-list.component';
import { UserClasificationRegisterComponent } from './components/user-clasification/user-clasification-register/user-clasification-register.component';
import { UserClasificationEditComponent } from './components/user-clasification/user-clasification-edit/user-clasification-edit.component';

//Definir las rutas
const appRoutes: Routes = [
	{path: '', component: UserLoginComponent},
	{path: 'inicio', component: UserLoginComponent},
	{path: 'radicado/salida', component: FiledOutComponent, canActivate: [IdentityGuard]},
	{path: 'radicado/entrada', component: FiledInComponent, canActivate: [IdentityGuard]},
	{path: 'radicado/buscar-radicado', component: FiledSearchComponent, canActivate: [IdentityGuard]},
	{path: 'memorando/nuevo-registro', component: MemorandumRegisterComponent, canActivate: [IdentityGuard]},
	{path: 'app-users/nuevo-registro', component: AppUsersRegisterComponent, canActivate: [IdentityGuard]},

	{path: 'user/login', component: UserLoginComponent},
	{path: 'user/logout/:sure', component: UserLoginComponent},
	{path: 'listar/usuarios', component: UserListComponent, canActivate: [IdentityGuard, IdentityAdminGuard]},
	{path: 'registrar/usuario', component: UserRegisterComponent, canActivate: [IdentityGuard, IdentityAdminGuard]},
	{path: 'editar/usuario/:id', component: UserEditComponent, canActivate: [IdentityGuard, IdentityAdminGuard]},
	{path: 'editar/contraseña/usuario/:id', component: UserEditPasswordComponent, canActivate: [IdentityGuard]},

	{path: 'listar/dependencias', component: DependenceListComponent, canActivate: [IdentityGuard, IdentityAdminGuard]},
	{path: 'registrar/dependencias', component: DependenceRegisterComponent, canActivate: [IdentityGuard, IdentityAdminGuard]},
	{path: 'editar/dependencia/:id', component: DependenceEditComponent, canActivate: [IdentityGuard, IdentityAdminGuard]},

	{path: 'listar/adjuntos', component: AttachedListComponent, canActivate: [IdentityGuard, IdentityAdminGuard]},
	{path: 'registrar/adjuntos', component: AttachedRegisterComponent, canActivate: [IdentityGuard, IdentityAdminGuard]},
	{path: 'editar/adjuntos/:id', component: AttachedEditComponent, canActivate: [IdentityGuard, IdentityAdminGuard]},

	{path: 'listar/clasificacion/usuarios', component: UserClasificationListComponent, canActivate: [IdentityGuard, IdentityAdminGuard]},
	{path: 'registrar/clasificacion/usuarios', component: UserClasificationRegisterComponent, canActivate: [IdentityGuard, IdentityAdminGuard]},
	{path: 'editar/clasificacion/usuario/:id', component: UserClasificationEditComponent, canActivate: [IdentityGuard, IdentityAdminGuard]}
];

// Exportar la configuración
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);