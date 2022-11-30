import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexTodoFormComponent } from './container/index-todo-form/index-todo-form.component';
import {IndexTodoListComponent} from './container/index-todo-list/index-todo-list.container';

const routes: Routes = [
  { path: 'todo/:id', component: IndexTodoFormComponent, pathMatch: 'full' },
  { path: '', component: IndexTodoListComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
