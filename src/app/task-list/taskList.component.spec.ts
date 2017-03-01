/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {RouterOutletMap, Router} from '@angular/router';
import {AppService} from "../app.singletonService";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TaskListComponent} from "./taskList.component";

describe('TaskListComponent', function () {
  let de: DebugElement;
  let comp: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let service: AppService;
  let router: Router;

  class MockRouter {
    navigate() {
      return Promise.resolve(true)
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListComponent ],
      providers: [ RouterOutletMap, AppService, {provide: Router, useClass: MockRouter}],
      imports: [RouterTestingModule, HttpModule, FormsModule, CommonModule]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h1'));
    service = fixture.debugElement.injector.get(AppService)
    router = fixture.debugElement.injector.get(Router)
  });

  it('be able to show data to DB', () => {
    spyOn(service, 'showTask').and.returnValue(
      Observable.of<any>(
        [{
          date: 'aa',
          title: '',
          description : '',
          priority : ''
        }]
      )
    );
    spyOn(console, 'log');
    comp.ngOnInit();
    //expect(console.log).toHaveBeenCalled();
    expect(comp.tasks).toEqual([{
      date: 'aa',
      title: '',
      description : '',
      priority : ''
    }])
  });

  it('be able to show error on show method', () => {
    spyOn(service, 'showTask').and.returnValue(
        Observable.throw(new Error("hello i m error"))
    );
    spyOn(console, 'error');
    comp.ngOnInit();
    expect(console.error).toHaveBeenCalled();
  });

  it('be able to delete data from DB', () => {
    spyOn(service, 'deleteTask').and.returnValue(
      Observable.of<any>(
        [{
          date: 'aa',
          title: '',
          description : '',
          priority : ''
        }]
      )
    );
    //spyOn(service,'showTask')
    spyOn(console, 'log');
    comp.deleteTask("");
    //expect(console.log).toHaveBeenCalled();
    expect(comp.tasks).toEqual([{
      date: 'aa',
      title: '',
      description : '',
      priority : ''
    }])
  });

  it('be able to show error on deleteTask method', () => {
    spyOn(service, 'deleteTask').and.returnValue(
      Observable.throw(new Error("hello i m error"))
    );
    spyOn(console, 'error');
    comp.deleteTask("");
    expect(console.error).toHaveBeenCalled();
  });

  it('be able to navigate to update component', () => {
    router.navigate([]).then(data=>{
      expect(data).toBe(true);
    })
  });

});

