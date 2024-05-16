import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  todoURL : string ;

  constructor(private http : HttpClient) { 
    this.todoURL = "http://localhost:3000/tasks";
  }

  getAllTask() : Observable<Task[]> {
    return this.http.get<Task[]>(this.todoURL)
  }
  addTask(task : Task) : Observable<Task> {
    return this.http.post<Task>(this.todoURL, task)
  }
  deleteTask(taskId : Task) : Observable<Task> {
    return this.http.delete<Task>(this.todoURL + "/" + taskId.id)
  }
  updateTask(task : Task) : Observable<Task> {
    return this.http.put<Task>(this.todoURL + "/" + task.id, task)
  }
}
