import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { ToDoItem } from '../../model/ToDoItem';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-todo-item',
  templateUrl: './update-todo-item.component.html',
  styleUrls: ['./update-todo-item.component.scss']
})
export class UpdateTodoItemComponent implements OnInit {

  todoItem: ToDoItem = ToDoItem.buildDefault();

  constructor(public todoService: TodoService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    this.todoService.findById(Number(id))
      .subscribe(todoItem => {
        this.todoItem = todoItem;
      });
  }

  update(): void {
    this.todoService.update(this.todoItem)
      .subscribe(() => {
        this.router.navigate(['/todos'])
      });
  }
}
