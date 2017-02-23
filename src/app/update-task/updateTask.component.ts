import {Component, OnInit} from '@angular/core';
import {AppService} from "../app.singletonService";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Task} from "../task";
import {ActivatedRoute} from "@angular/router";

@Component ({
  selector: 'updateTask',
  templateUrl: './app/create-task/createTask.component.html',
  styleUrls: ['']
})

export class UpdateComponent implements OnInit{

  tasks:any[];
  index: string;
  task: any;
  addForm: FormGroup;
  constructor(private service: AppService, private formBuilder: FormBuilder, private route: ActivatedRoute,){
    this.task=this.service.tasks[0]
  }
  ngOnInit(){
    this.service.showTask().subscribe(data=>{
      this.tasks=data;
      console.log("my Data"+this.tasks[0]._id);
      this.route.params.subscribe((data: any) => {
        this.index = data.id;
        console.log("index "+this.index)
        console.log("json data "+JSON.stringify(this.tasks))
        this.task = this.tasks.filter(x=>x._id==this.index)[0];
        console.log(this.task);
      });
      //this.addForm.get('date').setValue(this.task.date);
      //this.addForm.get('title').setValue(this.task.title);
      //this.addForm.get('description').setValue(this.task.description);
      //this.addForm.get('priority').setValue(this.task.priority);
    }, error=>{
      alert(error);
    });

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
      this.service.updateTask(new Task(newTask.date,newTask.title,newTask.description,newTask.priority)
        ,this.index)
        .subscribe(data=>{
          alert("data added successfully"+data);
        },error=>{
          alert(error);
        });
      console.log(newTask);
      this.addForm.reset();
    }
  }

}
