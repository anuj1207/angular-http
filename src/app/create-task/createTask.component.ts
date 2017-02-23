import { Component,OnInit } from '@angular/core'
import {Task} from "../task";
import {AppService} from "../app.singletonService";
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'createTask',
  templateUrl:'./app/create-task/createTask.component.html',
  styleUrls: [''],
})

export class CreateTaskComponent implements OnInit{

  tasks:Task[];
  task:Task;
  addForm: FormGroup;
  constructor(private service: AppService,private formBuilder: FormBuilder){
    this.task=this.service.tasks[0]
  };
  ngOnInit(){

    this.addForm = this.formBuilder.group({
      date: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required]
    })
  }

  addTask() {
    if (this.addForm.valid) {
      let newTask = {
        date: this.addForm.controls['date'].value,
        title: this.addForm.controls['title'].value,
        description: this.addForm.controls['description'].value,
        priority: this.addForm.controls['priority'].value
      };
      console.log(newTask);
      this.addForm.reset();
      this.service.addTask(new Task(newTask.date,newTask.title,newTask.description,newTask.priority))
        .subscribe(data=>{
          alert("data added successfully"+data);
        },error=>{
          alert(error);
        });
    }
  }

}
