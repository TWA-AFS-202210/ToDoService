import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ToDoItem } from 'src/app/model/ToDoItem';
import { mockHttpClient } from 'src/app/test/util.spec';
import { TodoService } from '../../service/todo.service';
import { ListTodoitemComponent } from './list-todoitem.component';

describe('ListTodoitemComponent', () => {
  let fixture;
  let component: ListTodoitemComponent;
  let httpClientSpy: any;
  beforeEach(async () => {
    httpClientSpy = mockHttpClient()
    await TestBed.configureTestingModule({
      providers:[
        TodoService, {
          provide: HttpClient,
          useValue: httpClientSpy,
        }
      ],
      imports: [],
      declarations: [ListTodoitemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListTodoitemComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should get all todoitems', () => {
    // given
    const todoItem = new ToDoItem(3, 'Title test', 'description test', true);
    httpClientSpy.get.and.returnValue(of([todoItem, todoItem, todoItem]))
    // when
    component.ngOnInit()
    // then
    expect(component.todoItems.length).toBe(3);
  });

  it('should delete todo item', () => {
    // given
    const id = 3;
    const todoItem = new ToDoItem(id, 'Title test', 'description test', true);
    component.todoItems = [todoItem]
    httpClientSpy.delete.and.returnValue(of({}))

    // when
    component.doDelete(id);
    // then
    expect(httpClientSpy.delete).toHaveBeenCalledWith('https://localhost:5001/ToDos/3');
  });

  it('should create todoItem via mockHttp', () => {
    // given 
    const todoItem = new ToDoItem(3, 'Title test', 'description test', true);
    httpClientSpy.get.and.returnValue(of([todoItem]))
    // when
    component.ngOnInit();
    // then
    expect(component.todoItems).toEqual([todoItem]);
  });
});
