/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {AppService} from "../app.singletonService";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {UpdateComponent} from "./updateTask.component";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

describe('UpdateComponent', function () {
  let de: DebugElement;
  let comp: UpdateComponent;
  let fixture: ComponentFixture<UpdateComponent>;
  let service: AppService;
  let router: Router;

  class MockRouter {
    navigate() {
      return Promise.resolve(true)
    }
  }

  class MockActivatedRoute {
    params = Observable.of<any>({'id':1})
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateComponent ],
      providers: [ AppService,{provide: Router, useClass: MockRouter},{provide: ActivatedRoute, useClass: MockActivatedRoute}],
      imports: [RouterTestingModule,HttpModule,FormsModule, CommonModule]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h1'));
    service = fixture.debugElement.injector.get(AppService)
    router = fixture.debugElement.injector.get(Router)
  });

  it('be able to update data to DB', () => {
    spyOn(service, 'updateTask').and.returnValue(
      Observable.of<any>(
        [{
          _id: '',
          date: '',
          title: '',
          description : '',
          priority : ''
        }]
      )
    );
    spyOn(console, 'log');
    comp.addTask();
    expect(console.log).toHaveBeenCalled();
    expect(comp.tasks).toEqual([{
      _id: '',
      date: '',
      title: '',
      description : '',
      priority : ''
    }])

    router.navigate([]).then(data=>{
      expect(data).toBe(true);
    })
  });

});

