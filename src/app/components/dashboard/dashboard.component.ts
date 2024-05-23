import { Component, OnInit} from '@angular/core';
import { Task } from '../../model/task';
import { ToDoService } from '../../service/to-do.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { error } from 'node:console';
import { response } from 'express';

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
    this.todoService.getAllTask().subscribe(response => {
      this.taskArr = response;
    }, (error) => {
      console.log('Unable to get list of tasks', error);
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
  deleteTask(task: Task) {
    this.todoService.deleteTask(task).subscribe(res=> {
      this.ngOnInit();
      },
      err => {
        console.log("Unable to delete task");
      });
  }

  call(task : Task) {
    this.taskObj = task;
    this.editTaskValue = task.task_name;
  }
}
