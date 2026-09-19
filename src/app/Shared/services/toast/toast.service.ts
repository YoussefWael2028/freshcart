import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: number;
  message: string;
  icon: string;
  leaving: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  show(message: string, icon: string): void {
    const id = Date.now();
    this.toastsSubject.next([
      ...this.toastsSubject.value,
      { id, message, icon, leaving: false }
    ]);
    setTimeout(() => this.startLeaving(id), 2700);
  }

  private startLeaving(id: number): void {
    this.toastsSubject.next(
      this.toastsSubject.value.map(toast =>
        toast.id === id ? { ...toast, leaving: true } : toast
      )
    );
    setTimeout(() => this.remove(id), 300);
  }

  private remove(id: number): void {
    this.toastsSubject.next(
      this.toastsSubject.value.filter(toast => toast.id !== id)
    );
  }
}
