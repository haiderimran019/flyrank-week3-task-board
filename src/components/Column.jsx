import TaskCard from "./TaskCard.jsx";

export default function Column({ title, status, tasks, onMove, onDelete, onEdit }) {
  return (
    <div className="column">
      <div className="column-header">
        <h2>{title}</h2>
        <span className="count">{tasks.length}</span>
      </div>
      <div className="column-body">
        {tasks.length === 0 && <p className="empty-hint">Nothing here</p>}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onMove={onMove}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}
