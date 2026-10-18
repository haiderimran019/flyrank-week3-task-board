const PRIORITY_LABEL = { low: "Low", medium: "Medium", high: "High" };
const COLUMNS = ["todo", "doing", "done"];
const COLUMN_LABEL = { todo: "To Do", doing: "In Progress", done: "Done" };

export default function TaskCard({ task, onMove, onDelete, onEdit }) {
  const nextColumn = COLUMNS[(COLUMNS.indexOf(task.status) + 1) % COLUMNS.length];

  return (
    <div className={`task-card priority-${task.priority}`}>
      <div className="task-card-top">
        <span className={`priority-dot priority-${task.priority}`} title={PRIORITY_LABEL[task.priority]} />
        <h3>{task.title}</h3>
      </div>
      {task.notes && <p className="task-notes">{task.notes}</p>}
      <div className="task-card-actions">
        <button onClick={() => onMove(task.id, nextColumn)}>
          Move to {COLUMN_LABEL[nextColumn]}
        </button>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button className="danger" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}
