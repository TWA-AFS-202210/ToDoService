import { TestBed } from '@angular/core/testing';
import { CreateTodoitemComponent } from './create-todoitem.component';
import { TodoService } from '../../service/todo.service';
import { ToDoItem } from '../../model/ToDoItem';
import { HttpClient } from '@angular/common/http';
import { mockHttpClient } from 'src/app/test/util.spec';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('CreateTodoitemComponent', () => {
  let fixture;
  let component: CreateTodoitemComponent;
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
        TodoService, {
          provide: HttpClient,
          useValue: httpClientSpy,
        }
      ],
      imports: [],
      declarations: [CreateTodoitemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTodoitemComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService)
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should create todo-item via mockhttp', () => {
    // given
    const newTodoItem = new ToDoItem(10, 'new todo', 'new todo description', false);
    component.todoItem = newTodoItem;
    httpClientSpy.post.and.returnValue(of(newTodoItem))

    // when
    component.createToDoItem();
    // then
    expect(httpClientSpy.post).toHaveBeenCalledWith(
      'https://localhost:5001/ToDos', newTodoItem);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/todos']);
  });

  it('should create todo-item failed when mockhttp response error code', () => {
    // given
    const newTodoItem = new ToDoItem(10, 'new todo', 'new todo description', false);
    component.todoItem = newTodoItem;
    httpClientSpy.post.and.returnValue(throwError(() => ({error: 'error message'})))

    // when
    component.createToDoItem();
    // then
    expect(httpClientSpy.post).toHaveBeenCalledWith(
      'https://localhost:5001/ToDos', newTodoItem);
    expect(routerSpy.navigate).not.toHaveBeenCalledWith(['/todos']);
  });
});
