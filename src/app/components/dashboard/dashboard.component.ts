import { Component, OnInit} from '@angular/core';
import { Task } from '../../model/task';
import { ToDoService } from '../../service/to-do.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  taskObj : Task = new Task();
  taskArr : Task[] = [];

  addTaskValue : string = '';
  editTaskValue : string = '';

  constructor(private todoService : ToDoService){}

  ngOnInit(): void {

    this.taskObj = new Task();
    this.taskArr = [];
    this.addTaskValue = '';
    this.editTaskValue = '';
    this.viewTasks();

  }

  viewTasks() {
    this.todoService.getAllTask().subscribe(res => {
      this.taskArr = res;
    }, err => {
      console.log("Unable to get list of tasks");
    });
  }
  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.todoService.addTask(this.taskObj).subscribe(res => {
      this.addTaskValue = '';
      this.ngOnInit();
    },
    err => {
      console.log("Unable to add task");
    });
  alert("Task added successfully");
  }
  deleteTask(taskId: Task) {
    this.todoService.deleteTask(taskId).subscribe(res=> {
      this.ngOnInit();
      },
      err => {
        console.log("Unable to delete task");
      });
  }

  call(taskId : Task) {
    this.taskObj = taskId;
    this.editTaskValue = taskId.task_name;
  }
}
