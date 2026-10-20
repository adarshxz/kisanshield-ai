import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { taskService } from '../services/taskService';
import { FarmTask } from '../types';
import { 
  CalendarCheck, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Filter, 
  ChevronRight, 
  RotateCcw, 
  X,
  FileCheck,
  Calendar,
  Sparkles
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';

export const ActionPlannerPage: React.FC = () => {
  const { selectedFarm, t, showToast } = useApp();
  const [tasks, setTasks] = useState<FarmTask[]>(() => taskService.getTasks());
  const [viewTab, setViewTab] = useState<'today' | 'week' | 'completed' | 'all'>('today');
  const [selectedFieldFilter, setSelectedFieldFilter] = useState<string>('all');
  
  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [outcomeModalTask, setOutcomeModalTask] = useState<FarmTask | null>(null);
  const [outcomeNotes, setOutcomeNotes] = useState('');
  
  const [skipModalTask, setSkipModalTask] = useState<FarmTask | null>(null);
  const [skipReason, setSkipReason] = useState('');

  // Add Task form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newFieldId, setNewFieldId] = useState(selectedFarm.fields[0]?.id || 'field-a');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [newDueDate, setNewDueDate] = useState('2026-10-19');
  const [newReason, setNewReason] = useState('');

  const refreshList = () => {
    setTasks(taskService.getTasks());
  };

  const handleToggle = (task: FarmTask) => {
    if (!task.isCompleted) {
      // Prompt for optional outcome note
      setOutcomeModalTask(task);
      setOutcomeNotes('');
    } else {
      taskService.toggleComplete(task.id);
      refreshList();
    }
  };

  const confirmCompleteWithOutcome = () => {
    if (outcomeModalTask) {
      taskService.toggleComplete(outcomeModalTask.id, outcomeNotes || undefined);
      refreshList();
      showToast({
        type: 'success',
        title: 'Task Completed & Outcome Logged',
        message: `${outcomeModalTask.title} moved to completed audit history.`
      });
      setOutcomeModalTask(null);
    }
  };

  const handleConfirmSkip = () => {
    if (skipModalTask && skipReason.trim()) {
      taskService.skipTask(skipModalTask.id, skipReason);
      refreshList();
      showToast({
        type: 'info',
        title: 'Task Marked Skipped',
        message: `Reason recorded: ${skipReason}`
      });
      setSkipModalTask(null);
      setSkipReason('');
    }
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const targetField = selectedFarm.fields.find(f => f.id === newFieldId) || selectedFarm.fields[0];

    taskService.addTask({
      fieldId: targetField.id,
      fieldName: targetField.name,
      crop: targetField.currentCrop,
      title: newTitle,
      description: newDesc,
      reason: newReason || 'Farmer-scheduled farm management action',
      priority: newPriority,
      dueDate: newDueDate,
      estimatedMinutes: 45,
      source: 'farmer_created'
    });

    refreshList();
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDesc('');
    setNewReason('');
    showToast({ type: 'success', title: 'Task Scheduled', message: 'Added to your daily action planner.' });
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (selectedFieldFilter !== 'all' && task.fieldId !== selectedFieldFilter) return false;
    if (viewTab === 'completed') return task.isCompleted || task.skipped;
    if (viewTab === 'today') return !task.isCompleted && !task.skipped && task.dueDate <= '2026-10-18';
    if (viewTab === 'week') return !task.isCompleted && !task.skipped;
    return true; // all
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Page Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-forest-950 border border-surface-border dark:border-forest-900 shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-forest-700 dark:text-fresh" />
            <h2 className="text-xl font-black text-kisan-text dark:text-white">
              {t.planner.title}
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
              Weather-Adaptive
            </span>
          </div>
          <p className="text-xs text-kisan-muted dark:text-gray-400 mt-1 max-w-xl">
            {t.planner.subtitle} Tasks automatically reschedule when heavy rainfall or wetness windows are forecasted.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsAddModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          {t.planner.addNewTask}
        </Button>
      </div>

      {/* View Tabs & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex items-center bg-white dark:bg-forest-950 p-1.5 rounded-2xl border border-surface-border dark:border-forest-900 shadow-card overflow-x-auto">
          {[
            { id: 'today', label: t.planner.todayTab },
            { id: 'week', label: t.planner.weekTab },
            { id: 'completed', label: t.planner.completedTab },
            { id: 'all', label: t.planner.allTab },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setViewTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                viewTab === tab.id
                  ? 'bg-forest-700 text-white shadow-xs'
                  : 'text-kisan-muted hover:text-kisan-text dark:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Field Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-kisan-muted" />
          <select
            value={selectedFieldFilter}
            onChange={(e) => setSelectedFieldFilter(e.target.value)}
            className="text-xs font-semibold px-3 py-2 rounded-xl border border-surface-border dark:border-forest-800 bg-white dark:bg-forest-950 text-kisan-text dark:text-white"
          >
            <option value="all">All Fields</option>
            {selectedFarm.fields.map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <Card className="p-12 text-center text-kisan-muted">
            <CheckCircle2 className="w-12 h-12 text-forest-700/40 mx-auto mb-3" />
            <h4 className="font-bold text-sm text-kisan-text dark:text-white">No tasks found for this view</h4>
            <p className="text-xs text-kisan-muted mt-1">All scheduled field operations are up to date.</p>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <Card
              key={task.id}
              className={`p-6 transition-all ${
                task.isCompleted ? 'opacity-70 bg-surface-warm/60 dark:bg-forest-950/40' : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                
                {/* Left check & info */}
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => handleToggle(task)}
                    className="mt-1 w-5 h-5 text-forest-700 rounded focus:ring-forest-700 cursor-pointer shrink-0"
                  />

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className={`text-sm sm:text-base font-bold text-kisan-text dark:text-white ${
                        task.isCompleted ? 'line-through text-kisan-muted dark:text-gray-400' : ''
                      }`}>
                        {task.title}
                      </h3>
                      <Badge variant={task.priority === 'high' ? 'high' : 'neutral'}>
                        {task.priority.toUpperCase()}
                      </Badge>
                      {task.skipped && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                          Skipped by Farmer
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-kisan-muted dark:text-gray-300 leading-relaxed max-w-2xl">
                      {task.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-kisan-muted dark:text-gray-400 pt-1">
                      <span className="font-bold text-forest-700 dark:text-fresh">
                        {task.fieldName} · {task.crop}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> Due: {task.dueDate}
                      </span>
                      {task.estimatedMinutes && (
                        <>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {task.estimatedMinutes} mins
                          </span>
                        </>
                      )}
                    </div>

                    {/* Reason box */}
                    <div className="mt-3 p-3 rounded-xl bg-surface-warm dark:bg-forest-900/60 border border-surface-border dark:border-forest-800 text-xs">
                      <span className="font-bold text-kisan-text dark:text-white block mb-0.5">
                        {t.planner.reasonForTask}
                      </span>
                      <p className="text-kisan-muted dark:text-gray-300 text-[11px] leading-relaxed">
                        {task.reason}
                      </p>
                    </div>

                    {/* Adaptive history if dynamically changed */}
                    {task.recommendationHistory && task.recommendationHistory.length > 0 && (
                      <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 text-xs text-purple-900 dark:text-purple-200">
                        <span className="font-bold block text-[11px] mb-0.5 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                          Dynamic Adaptation Triggered:
                        </span>
                        <p className="text-[11px]">{task.recommendationHistory[0].reason}</p>
                      </div>
                    )}

                    {/* Recorded outcome */}
                    {task.outcomeNotes && (
                      <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 text-xs text-emerald-900 dark:text-emerald-200">
                        <span className="font-bold block text-[11px] mb-0.5">Observed Field Outcome:</span>
                        <p className="text-[11px]">{task.outcomeNotes}</p>
                      </div>
                    )}

                    {/* Skip Reason */}
                    {task.skipReason && (
                      <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 text-xs text-amber-900 dark:text-amber-200">
                        <span className="font-bold block text-[11px]">Reason for Skipping:</span>
                        <p className="text-[11px]">{task.skipReason}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right controls */}
                {!task.isCompleted && !task.skipped && (
                  <div className="flex sm:flex-col items-center gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleToggle(task)}
                      leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                    >
                      {t.planner.markDone}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSkipModalTask(task)}
                    >
                      {t.planner.markSkipped}
                    </Button>
                  </div>
                )}

              </div>
            </Card>
          ))
        )}
      </div>

      {/* Outcome Recording Modal */}
      {outcomeModalTask && (
        <Modal
          isOpen={true}
          onClose={() => setOutcomeModalTask(null)}
          title="Record Field Outcome for Completed Task"
          subtitle={outcomeModalTask.title}
        >
          <div className="space-y-4 text-xs">
            <p className="text-kisan-muted leading-relaxed">
              Recording what you observed in the field helps measure whether this recommendation worked and refines future advisory accuracy.
            </p>

            <div>
              <label className="block font-semibold mb-1 text-kisan-text dark:text-white">
                What did you observe? (Optional)
              </label>
              <textarea
                rows={3}
                value={outcomeNotes}
                onChange={(e) => setOutcomeNotes(e.target.value)}
                placeholder="e.g., Inspected 10 plants; found no fungal spread; soil water drained cleanly..."
                className="w-full rounded-xl border border-surface-border dark:border-forest-800 p-3 text-xs"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOutcomeModalTask(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={confirmCompleteWithOutcome}
              >
                Complete Task
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Skip Task Reason Modal */}
      {skipModalTask && (
        <Modal
          isOpen={true}
          onClose={() => setSkipModalTask(null)}
          title="Provide Reason for Skipping Task"
          subtitle={skipModalTask.title}
        >
          <div className="space-y-4 text-xs">
            <p className="text-kisan-muted">
              Why did you choose not to execute this recommended action?
            </p>

            <div>
              <label className="block font-semibold mb-1">Reason for Skip *</label>
              <input
                type="text"
                value={skipReason}
                onChange={(e) => setSkipReason(e.target.value)}
                placeholder="e.g., Labor unavailable, Already applied previous day, Waiting for sunny sky..."
                className="w-full rounded-xl border border-surface-border p-3 text-xs"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSkipModalTask(null)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                disabled={!skipReason.trim()}
                onClick={handleConfirmSkip}
              >
                Confirm Skip
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add New Task Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Farming Task"
          subtitle="Schedule a prioritized operational activity"
        >
          <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold mb-1">Task Title *</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Inspect boundary furrows after rain"
                className="w-full rounded-xl border border-surface-border p-2.5 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Task Description</label>
              <textarea
                rows={2}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Details of what needs to be checked or applied..."
                className="w-full rounded-xl border border-surface-border p-2.5 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">Field</label>
                <select
                  value={newFieldId}
                  onChange={(e) => setNewFieldId(e.target.value)}
                  className="w-full rounded-xl border border-surface-border p-2.5 bg-white text-xs"
                >
                  {selectedFarm.fields.map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Priority</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as any)}
                  className="w-full rounded-xl border border-surface-border p-2.5 bg-white text-xs"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">Due Date</label>
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full rounded-xl border border-surface-border p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Reason / Trigger</label>
                <input
                  type="text"
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  placeholder="e.g. Routine weekly scouting"
                  className="w-full rounded-xl border border-surface-border p-2.5 text-xs"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-surface-border flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
              >
                Add Task
              </Button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
};
