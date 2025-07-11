import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { BookList } from './book-list/book-list';
import { BookForm } from './book-form/book-form';
import { authGuard } from './auth-guard';
import { Register } from './register/register';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'books', component: BookList, canActivate: [authGuard]},
  { path: 'books/add', component: BookForm, canActivate: [authGuard]},
  { path: 'books/edit/:isbn', component: BookForm, canActivate: [authGuard] },
   { path: 'register', component: Register }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
