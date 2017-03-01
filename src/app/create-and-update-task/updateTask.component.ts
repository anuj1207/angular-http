import {Component, OnInit} from '@angular/core';
import {AppService} from "../app.singletonService";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Task} from "../task";
import {ActivatedRoute, Router} from "@angular/router";

@Component ({
  moduleId:module.id,
  selector: 'updateTask',
  templateUrl: 'createTask.component.html',
  styleUrls: ['']
})

export class UpdateComponent implements OnInit{

  tasks:Task[];
  index: string;
  task: Task;
  constructor(private service: AppService, private route: ActivatedRoute,private router: Router){
    this.task=this.service.tasks[0];
  }
  ngOnInit(){
      this.route.params.subscribe((data: any) => {
        this.index = data.id;
        console.log("index "+this.index)
        this.service.showTask().subscribe(data=>{
          this.tasks=data;
          console.log("my Data"+this.tasks[0]._id);
        console.log("json data "+JSON.stringify(this.tasks))
        this.task = this.tasks.filter(x=>x._id==this.index)[0];
        console.log(this.task);
      },error=>{
          alert(error);
        });

    }, error=>{
      alert(error);
    });

  }
  addTask() {
    console.log("Button clicked");
      this.service.updateTask(new Task(this.task.date,this.task.title,this.task.description,this.task.priority),this.index)
        .subscribe(data=>{
          this.tasks=data
          alert("data added successfully"+data);
          this.router.navigate(['taskList']);
        },error=>{
          alert(error);
        });

  }

}
