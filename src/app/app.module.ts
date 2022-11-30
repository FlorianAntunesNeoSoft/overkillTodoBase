import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TodoListComponent} from './component/todo-list/todo-list.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {todosReducer} from './store/reducer';
import {environment} from '../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {Effects} from './store/effects';
import {HttpClientModule} from '@angular/common/http';
import { IndexTodoListComponent } from './container/index-todo-list/index-todo-list.container';
import { TodoDetailsComponent } from './component/todo-details/todo-details.component';
import { IndexTodoFormComponent } from './container/index-todo-form/index-todo-form.component';
import { ModalFormTodoComponent } from './component/modal-form-todo/modal-form-todo.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    IndexTodoListComponent,
    TodoDetailsComponent,
    IndexTodoFormComponent,
    ModalFormTodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({todosStore: todosReducer}),
    EffectsModule.forRoot([Effects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
