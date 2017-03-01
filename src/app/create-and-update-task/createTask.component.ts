import { Component,OnInit } from '@angular/core'
import {Task} from "../task";
import {AppService} from "../app.singletonService";
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  moduleId:module.id,
  selector: 'createTask',
  templateUrl:'./createTask.component.html',
  styleUrls: [''],
})

export class CreateTaskComponent implements OnInit{

  tasks:Task[];
  task:Task;
  constructor(private service: AppService,private router: Router){
    this.task={
      _id: '',
      date: '',
      title: '',
      description: '',
      priority: ""
    }//this.service.tasks[0]
    console.log(this.task.date+'::::'+this.task.date)
  };
  ngOnInit(){

  }

  addTask() {
      let newTask = {
        date: this.task.date,
        title: this.task.title,
        description: this.task.description,
        priority: this.task.priority
      };
      console.log(newTask);
      this.service.addTask(new Task(newTask.date,newTask.title,newTask.description,newTask.priority))
        .subscribe(data=>{
          this.task = data
          alert("data added successfully"+data);
          this.router.navigate(['taskList']);
        },error=>{
          console.error(error);
        });
  }

}
