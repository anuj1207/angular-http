import {Component, OnInit} from '@angular/core'
import {AppService} from "../app.singletonService";
import {Task} from "../task";
import {Router} from "@angular/router";

@Component({
  selector: 'taskList',
  templateUrl: './app/task-list/taskList.component.html',
  styleUrls: [''],
})

export class TaskListComponent implements OnInit{
  tasks:Task[];
  constructor(private service: AppService,private router: Router){};

  ngOnInit(){
    this.service.showTask().subscribe(data=>{
      this.tasks=data;
    }, error=>{
      alert(error);
    });
  }

  deleteTask(i:string){
    this.service.deleteTask(i).subscribe(data=>{
      alert("Data deleted successfully"+data);
    }, error=>{
      alert(error);
    });
    location.reload();
  }

  goToUpdate(index :string) {
    this.router.navigate(['updateTask',index]);
  }
}
