import { Injectable } from '@angular/core';
import { Todo } from './models/Todo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private httpclient: HttpClient) {}

  todoList() {
    return this.httpclient.get<Todo[]>(
      'https://jsonplaceholder.typicode.com/todos'
    );
  }
  getlist(id: any) {
    return this.httpclient.get<Todo>(
      'https://jsonplaceholder.typicode.com/todos/' + id
    );
  }
  updateList(id: any, listdata: Todo) {
    return this.httpclient.put<any>(
      'https://jsonplaceholder.typicode.com/todos/' + id,
      listdata
    );
  }
}
