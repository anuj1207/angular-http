import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {AppService} from "./app.singletonService";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";
import {HomeComponent} from "./home/home.component";
import {UpdateComponent} from "./create-and-update-task/updateTask.component";
import {TaskListComponent} from "./task-list/taskList.component";
import { CreateTaskComponent} from "./create-and-update-task/createTask.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http"


@NgModule({
  imports:      [ BrowserModule , RouterModule.forRoot(routes), FormsModule, CommonModule, ReactiveFormsModule, HttpModule],
  declarations: [ AppComponent ,HomeComponent, UpdateComponent, TaskListComponent, CreateTaskComponent],
  bootstrap:    [ AppComponent ],
  providers:    [ AppService, ]
})
export class AppModule { }
