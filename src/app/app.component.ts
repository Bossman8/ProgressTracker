import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { Task, TaskDialogResult } from './shared/interfaces';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { TaskService } from './core/services/task.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public todo: Observable<Task[]>;
  public inProgress: Observable<Task[]>;
  public done: Observable<Task[]>;

  constructor(private dialog: MatDialog, private taskService: TaskService) {
    this.todo = this.taskService.getTodo();
    this.inProgress = this.taskService.getInProgress();
    this.done = this.taskService.getDone();
  }

  public editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult|undefined) => {
      this.taskService.editTask(list, task, result);
    });
  }

  public drop(event: CdkDragDrop<Task[] | null>): void {
    this.taskService.moveTask(event);
  }

  public newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult|undefined) => {
        if (!result) {
          return;
        }
        this.taskService.createTask(result.task)
      });
  }
}
