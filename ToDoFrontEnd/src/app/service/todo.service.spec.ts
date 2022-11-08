import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TodoApiService } from '../api/todo.api.service';
import { mockHttpClient } from '../test/util.spec';
import { TodoService } from './todo.service';

describe('TodoService', () => {

  let service: TodoService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = mockHttpClient()
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
});

