import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task, TaskDialogData } from '../shared/interfaces';
import { TaskTypeLabelMapping } from '../shared/enums';

@Component({
  selector: 'app-task-dialog',
  standalone: false,
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss'
})
export class TaskDialogComponent {
  public TaskTypeLabelMapping = TaskTypeLabelMapping;
  public taskTypes = Object.values(this.TaskTypeLabelMapping);

  private backupTask: Partial<Task> = { ...this.data.task };

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) {}

  cancel(): void {
    this.data.task.title = this.backupTask.title;
    this.data.task.description = this.backupTask.description;
    this.dialogRef.close(this.data);
  }
}
