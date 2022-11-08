import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToDoItem } from '../../model/ToDoItem';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-create-todoitem',
  templateUrl: './create-todoitem.component.html',
  styleUrls: ['./create-todoitem.component.scss']
})
export class CreateTodoitemComponent implements OnInit {

  public todoItem: ToDoItem = ToDoItem.buildDefault();

  constructor(private todoService: TodoService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  public createToDoItem(): void {
    this.todoService.create(this.todoItem).subscribe({
      next: () => {
        this.router.navigate(['/todos'])
      }, error: err => {
        console.log(err);
        alert('system error');
      }
    });
  }

}
