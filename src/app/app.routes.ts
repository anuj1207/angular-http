import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component"
import {UpdateComponent} from "./create-and-update-task/updateTask.component";
import {TaskListComponent} from "./task-list/taskList.component";
import {CreateTaskComponent} from "./create-and-update-task/createTask.component";

export const routes:Routes = [{
  path: 'home',
  component: HomeComponent
},{
  path: 'updateTask/:id',
  component: UpdateComponent
},{
  path: 'taskList',
  component: TaskListComponent
},{
  path:'createTask',
  component: CreateTaskComponent
}];
