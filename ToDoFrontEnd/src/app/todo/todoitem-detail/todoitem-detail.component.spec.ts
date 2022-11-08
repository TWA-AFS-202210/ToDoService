import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoService } from '../../service/todo.service';
import { TodoitemDetailComponent } from './todoitem-detail.component';
import { HttpClient } from '@angular/common/http';
import { ToDoItem } from 'src/app/model/ToDoItem';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { mockHttpClient } from 'src/app/test/util.spec';

describe('TodoitemDetailComponent', () => {
  let fixture: ComponentFixture<TodoitemDetailComponent>;
  let component: TodoitemDetailComponent;
  let todoService: TodoService;
  
  let httpClientSpy: any;
  beforeEach(async () => {
    httpClientSpy = mockHttpClient()
    await TestBed.configureTestingModule({
      providers:[
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: {
                get: () => '3'
              }
            }
          }
        },
        TodoService, 
        {
          provide: HttpClient,
          useValue: httpClientSpy,
        }
      ],
      imports: [],
      declarations: [TodoitemDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoitemDetailComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);

  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should get special todo item', () => {
    // given
    const todoItem = new ToDoItem(3, 'Title test', 'description test', true) ;
    httpClientSpy.get.and.returnValue(of(todoItem))
    // when
    component.ngOnInit();
    fixture.detectChanges();
    // then
    expect(httpClientSpy.get).toHaveBeenCalledWith('https://localhost:5001/ToDos/3');
    const todoTitle = fixture.nativeElement.querySelector('[data-test="todoTitle"]');
    expect(todoTitle.textContent).toBe('Title test');
  });
  
});
