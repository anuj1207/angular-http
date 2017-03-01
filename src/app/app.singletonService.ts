import {Injectable} from "@angular/core";
import {Task} from "./task";
import {Observable} from "rxjs/Observable";

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {Http, Headers} from "@angular/http";

@Injectable()
export class AppService{

  tasks:Task[] = [{
    _id: '',
    date: '',
    title: '',
    description: '',
    priority: ""
  }]
  constructor(private http:Http){}

  addTask(t:Task):Observable<any>{
    let jsonHeader = new Headers({
      'Content-Type':'application/json'
    });
    return this.http.post('http://localhost:9000/add',t,{headers: jsonHeader}).map(data=>{
      return this.extractData(data)
    }).catch(e=>this.handleError(e));
  }

  showTask():Observable<any>{
    let jsonHeader = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.get('http://localhost:9000/get/all',{headers: jsonHeader}).map(data=>{
      this.tasks = this.extractData(data)
      return this.tasks
    }).catch(e=>this.handleError(e));
  }

  deleteTask(id:string):Observable<any>{
    let jsonHeader = new Headers({
      'Content-Type':'application/json'
    });
    return this.http.get('http://localhost:9000/remove/'+id,{headers: jsonHeader}).map(data=> {
      return this.extractData(data)
    }).catch(e=> this.handleError(e));
  }

  extractData(res:any){
    let body = res.json();
    return body;
  }

  updateTask(t:Task,id:string):Observable<any>{
    let jsonHeader = new Headers({
      'Content-Type':'application/json'
    });
    let obj = {
        _id :id,
        date : t.date,
        title : t.title,
        description : t.description,
        priority : t.priority
    }
    return this.http.post('http://localhost:9000/update',obj,{headers: jsonHeader}).map(data=>{
      return this.extractData(data)
    }).catch(e=>this.handleError(e));
  }

  private handleError(error:any) {
    let errMsg: string;
    try {
      if (JSON.parse(error._body).message) {
        errMsg = JSON.parse(error._body).message;
      }
      else {
        errMsg = 'Something went wrong. Please try again later.';
      }
    }
    catch(e) {
      errMsg = 'Something went wrong. Please try again later.'
    }
    return Observable.throw(new Error(errMsg));
  }

}
