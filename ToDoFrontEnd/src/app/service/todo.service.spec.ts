import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TodoApiService } from '../api/todo.api.service';
import { ToDoItem } from '../model/ToDoItem';
import { TodoStoreService } from './todo-store.service';
import { TodoService } from './todo.service';

describe('TodoService', () => {

  let service: TodoService;
  let todoStoreService: TodoStoreService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'put', 'get', 'delete'])
    todoStoreService = new TodoStoreService();
    TestBed.configureTestingModule({
      providers: [TodoApiService, {
        provide: HttpClient,
        useValue: httpClientSpy,
      }]
    });
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create todoItem via mockHttp', () => {
    // given 
    const todoItem = new ToDoItem(3, 'Title test', 'description test', true);
    httpClientSpy.post.and.returnValue(of({}))
    // when
    service.create(todoItem);
    // then
    expect(httpClientSpy.post).toHaveBeenCalledWith('https://635fc244ca0fe3c21aa3d012.mockapi.io/api/todos', todoItem);
  });

  it('should create todoItem via mockHttp', () => {
    // given 
    const todoItem = new ToDoItem(3, 'Title test', 'description test', true);
    httpClientSpy.put.and.returnValue(of({}))
    // when
    service.update(todoItem);
    // then
    expect(httpClientSpy.put).toHaveBeenCalledWith('https://635fc244ca0fe3c21aa3d012.mockapi.io/api/todos/3', todoItem);
  });
});
