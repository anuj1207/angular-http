import {Component, OnInit} from '@angular/core'
import {AppService} from "../app.singletonService";
import {Task} from "../task";
import {Router} from "@angular/router";

@Component({
  moduleId:module.id,
  selector: 'taskList',
  templateUrl: './taskList.component.html',
  styleUrls: [''],
})

export class TaskListComponent implements OnInit{
  tasks:Task[];
  constructor(private service: AppService,private router: Router){};

  ngOnInit(){
    this.service.showTask().subscribe(data=>{
      this.tasks=data;
    }, error=>{
      console.error(error);
    });
  }

  deleteTask(i:string){
    this.service.deleteTask(i).subscribe(data=>{
      alert("Data deleted successfully"+data);
      this.tasks=data;
    }, error=>{
      console.error(error);
    });
    this.service.showTask().subscribe(data=>{
      this.tasks=data;
    }, error=>{
      console.error(error);
    });
  }

  goToUpdate(index :string) {
    this.router.navigate(['updateTask',index]);
  }
}
