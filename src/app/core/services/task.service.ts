import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Task, TaskDialogResult } from "../../shared/interfaces";
import { CdkDragDrop, transferArrayItem } from "@angular/cdk/drag-drop";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    constructor(private store: AngularFirestore) {}

    public createTask(task: Task) {
        this.store.collection('todo').add(task)
    }

    public editTask(list: 'done' | 'todo' | 'inProgress', task: Task, result: TaskDialogResult|undefined) {
        if (!result) {
            return;
            }
            if (result.delete) {
            this.store.collection(list).doc(task.id).delete();
            } else {
            this.store.collection(list).doc(task.id).update(task);
            }
    }

    public moveTask(event: CdkDragDrop<Task[] | null>) {
        if (event.previousContainer.data === null || event.container.data === null) {
            return;
        }
    
        if (event.previousContainer === event.container) {
            return;
        }

        const item = event.previousContainer.data[event.previousIndex];
        this.store.firestore.runTransaction(() => {
        const promise = Promise.all([
            this.store.collection(event.previousContainer.id).doc(item.id).delete(),
            this.store.collection(event.container.id).add(item),
        ]);
        return promise;
        });
        transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
        );
    }

    getTodo() {
        return this.store.collection('todo').valueChanges({ idField: 'id' }) as Observable<Task[]>
    }

    getInProgress() {
        return this.store.collection('inProgress').valueChanges({ idField: 'id' }) as Observable<Task[]>;
    }

    getDone() {
        return this.store.collection('done').valueChanges({ idField: 'id' }) as Observable<Task[]>;
    }
}