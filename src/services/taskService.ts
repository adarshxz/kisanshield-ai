import { FarmTask } from '../types';
import { INITIAL_TASKS } from '../data/demoData';

const TASKS_STORAGE_KEY = 'kisanshield_tasks_v1';

export const taskService = {
  getTasks: (): FarmTask[] => {
    try {
      const stored = localStorage.getItem(TASKS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse tasks', e);
    }
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
    return INITIAL_TASKS;
  },

  saveAll: (tasks: FarmTask[]): void => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  },

  addTask: (task: Omit<FarmTask, 'id' | 'isCompleted'>): FarmTask => {
    const tasks = taskService.getTasks();
    const newTask: FarmTask = {
      ...task,
      id: `task-${Date.now().toString(36)}`,
      isCompleted: false,
    };
    tasks.unshift(newTask);
    taskService.saveAll(tasks);
    return newTask;
  },

  toggleComplete: (id: string, outcomeNotes?: string): FarmTask | undefined => {
    const tasks = taskService.getTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.isCompleted = !task.isCompleted;
      if (task.isCompleted) {
        task.completedAt = new Date().toISOString();
        if (outcomeNotes) task.outcomeNotes = outcomeNotes;
        task.skipped = false;
        task.skipReason = undefined;
      } else {
        task.completedAt = undefined;
      }
      taskService.saveAll(tasks);
    }
    return task;
  },

  skipTask: (id: string, reason: string): FarmTask | undefined => {
    const tasks = taskService.getTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.skipped = true;
      task.skipReason = reason;
      task.isCompleted = false;
      task.completedAt = undefined;
      taskService.saveAll(tasks);
    }
    return task;
  },

  rescheduleTask: (id: string, newDate: string): FarmTask | undefined => {
    const tasks = taskService.getTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.dueDate = newDate;
      taskService.saveAll(tasks);
    }
    return task;
  },

  deleteTask: (id: string): void => {
    const tasks = taskService.getTasks().filter(t => t.id !== id);
    taskService.saveAll(tasks);
  },

  resetTasks: (): FarmTask[] => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
    return INITIAL_TASKS;
  }
};
