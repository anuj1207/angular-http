/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {RouterModule, RouterOutletMap, Router} from '@angular/router';
import {AppService} from "../app.singletonService";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {CreateTaskComponent} from "./createTask.component";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

describe('CreateTaskComponent', function () {
  let de: DebugElement;
  let comp: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;
  let service: AppService;
  let router: Router;

  class MockRouter {
    navigate() {
      return Promise.resolve(true);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTaskComponent ],
      providers: [ RouterOutletMap,AppService, {provide: Router, useClass: MockRouter}],
      imports: [RouterTestingModule,HttpModule,FormsModule, CommonModule]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h1'));
    service = fixture.debugElement.injector.get(AppService)
    router = fixture.debugElement.injector.get(Router)
  });

  it('be able to add data to DB', () => {
    spyOn(service, 'addTask').and.returnValue(
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
    comp.addTask();
    expect(console.log).toHaveBeenCalled();
    expect(comp.task).toEqual([{
      date: 'aa',
      title: '',
      description : '',
      priority : ''
    }])

    router.navigate([]).then(data=>{
      expect(data).toBe(true);
    })
  });

  it('be able to show error on adding the data to DB', () => {
    spyOn(service, 'addTask').and.returnValue(
      Observable.throw(new Error("hello i m error"))
    );
    spyOn(console, 'error');
    comp.addTask();
    expect(console.error).toHaveBeenCalled();
  });

});
