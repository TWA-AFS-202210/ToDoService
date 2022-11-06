import { Location } from '@angular/common';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { routes } from './app-routing.module';

describe('Router', () => {
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: []
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    router.initialNavigation();
  });

  it('should redirect to /todos when navigate "" ', fakeAsync(() =>{
    router.navigate(['']);
    tick(50)
    expect(location.path()).toEqual('/todos')
  }));

  it('should go to /todos when navigate "todos" ', fakeAsync(() =>{
    router.navigate(['todos']);
    tick(50)
    expect(location.path()).toEqual('/todos')
  }));

  it('should go to /todos/create successful ', fakeAsync(() =>{
    router.navigate(['todos/create']);
    tick(50)
    expect(location.path()).toEqual('/todos/create')
  }));

  it('should go to /todos/edit/1 successful ', fakeAsync(() =>{
    router.navigate(['todos', 'edit', 1]);
    tick(50)
    expect(location.path()).toEqual('/todos/edit/1')
  }));

  it('should go to detail page /todos/2 successful ', fakeAsync(() =>{
    router.navigate(['todos', 2]);
    tick(50)
    expect(location.path()).toEqual('/todos/2')
  }));
});
