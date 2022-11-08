import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TodoService } from '../../service/todo.service';
import { UpdateTodoItemComponent } from './update-todo-item.component';
import { FormsModule } from '@angular/forms';
import { ToDoItem } from 'src/app/model/ToDoItem';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { mockHttpClient } from 'src/app/test/util.spec';

describe('UpdateTodoItemComponent', () => {
  let fixture: ComponentFixture<UpdateTodoItemComponent>;
  let component: UpdateTodoItemComponent;
  let todoService: TodoService;
  let httpClientSpy: any;
  let routerSpy: any;
  beforeEach(async () => {
    httpClientSpy = mockHttpClient()
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: Router, useValue: routerSpy
        },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: {
                get: () => '3'
              }
            }
          }
        },
        TodoService, {
          provide: HttpClient,
          useValue: httpClientSpy,
        }
      ],
      imports: [FormsModule],
      declarations: [UpdateTodoItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateTodoItemComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should update todoItem via mockHttp', () => {
    // given 
    const todoItem = new ToDoItem(3, 'Title test', 'description test', true);
    component.todoItem = todoItem;
    httpClientSpy.put.and.returnValue(of(todoItem))
    // when
    component.update();
    // then
    expect(httpClientSpy.put).toHaveBeenCalledWith('https://localhost:5001/ToDos/3', todoItem);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/todos'])
  });
});
