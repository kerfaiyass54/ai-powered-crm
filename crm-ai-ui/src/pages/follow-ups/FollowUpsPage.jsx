import { useMemo, useState } from 'react';
import './FollowUpsPage.css';

const initialTasks = [
    {
        id: 1,
        title: 'Send security docs to Initech',
        description: 'Send the requested security documentation.',
        dueDate: '31 May 2026',
        priority: 'Medium',
        status: 'In Progress',
        contact: 'Olivia Carter',
    },
    {
        id: 2,
        title: 'Schedule technical deep-dive with Cogswell Cogs',
        description: 'Coordinate a technical discovery session.',
        dueDate: '09 Jun 2026',
        priority: 'High',
        status: 'In Progress',
        contact: 'Lucas Brooks',
    },
    {
        id: 3,
        title: 'Quarterly check-in with Sterling Cooper',
        description: 'Reference the latest proposal and pricing.',
        dueDate: '10 Jun 2026',
        priority: 'Low',
        status: 'In Progress',
        contact: 'Aria Carter',
    },
    {
        id: 4,
        title: 'Quarterly check-in with Gekko & Co',
        description: 'Coordinate with the solutions engineering team.',
        dueDate: '13 Jun 2026',
        priority: 'Low',
        status: 'In Progress',
        contact: 'Wyatt Greer',
    },
    {
        id: 5,
        title: 'Send contract documents to Nakatomi',
        description: 'Send final contract documents for review.',
        dueDate: '15 Jun 2026',
        priority: 'High',
        status: 'Pending',
        contact: 'Noah Khan',
    },
    {
        id: 6,
        title: 'Follow up with Wayne Tech',
        description: 'Check whether the proposal has been reviewed.',
        dueDate: '18 Jun 2026',
        priority: 'Medium',
        status: 'Completed',
        contact: 'Ruby Bennett',
    },
];

const filters = ['All', 'Pending', 'In Progress', 'Completed'];

function FollowUpsPage() {
    const [tasks, setTasks] = useState(initialTasks);
    const [activeFilter, setActiveFilter] = useState('All');

    const statistics = useMemo(() => {
        const total = tasks.length;

        const pending = tasks.filter(
            (task) => task.status === 'Pending'
        ).length;

        const inProgress = tasks.filter(
            (task) => task.status === 'In Progress'
        ).length;

        const completed = tasks.filter(
            (task) => task.status === 'Completed'
        ).length;

        return {
            total,
            pending,
            inProgress,
            completed,
        };
    }, [tasks]);

    const progress = statistics.total
        ? Math.round((statistics.completed / statistics.total) * 100)
        : 0;

    const visibleTasks = tasks.filter((task) => {
        if (activeFilter === 'All') {
            return true;
        }

        return task.status === activeFilter;
    });

    const toggleTask = (id) => {
        setTasks((currentTasks) =>
            currentTasks.map((task) => {
                if (task.id !== id) {
                    return task;
                }

                return {
                    ...task,
                    status:
                        task.status === 'Completed'
                            ? 'Pending'
                            : 'Completed',
                };
            })
        );
    };

    return (
        <section className="follow-ups-page">

            <header className="follow-ups-header">
                <div>
                    <p className="follow-ups-eyebrow">
                        Workspace
                    </p>

                    <h1>Follow-ups</h1>

                    <p className="follow-ups-description">
                        Stay on top of every commitment and keep conversations moving.
                    </p>
                </div>

                <button className="follow-ups-primary-button">
                    <span>+</span>
                    Add task
                </button>
            </header>

            <div className="follow-ups-stats">

                <article className="follow-up-stat-card">
                    <div className="follow-up-stat-icon">
                        ✓
                    </div>

                    <div>
                        <span>Total tasks</span>
                        <strong>{statistics.total}</strong>
                    </div>
                </article>

                <article className="follow-up-stat-card">
                    <div className="follow-up-stat-icon pending">
                        ○
                    </div>

                    <div>
                        <span>Pending</span>
                        <strong>{statistics.pending}</strong>
                    </div>
                </article>

                <article className="follow-up-stat-card">
                    <div className="follow-up-stat-icon progress">
                        ◐
                    </div>

                    <div>
                        <span>In progress</span>
                        <strong>{statistics.inProgress}</strong>
                    </div>
                </article>

                <article className="follow-up-stat-card completed">
                    <div className="follow-up-stat-icon">
                        ✓
                    </div>

                    <div>
                        <span>Completed</span>
                        <strong>{statistics.completed}</strong>
                    </div>
                </article>

            </div>

            <section className="follow-up-progress-card">

                <div className="follow-up-progress-header">
                    <div>
                        <strong>
                            {statistics.completed} of {statistics.total} tasks done
                        </strong>

                        <span>
                            Keep your follow-ups under control.
                        </span>
                    </div>

                    <strong>{progress}%</strong>
                </div>

                <div className="follow-up-progress-track">
                    <div
                        className="follow-up-progress-value"
                        style={{ width: `${progress}%` }}
                    />
                </div>

            </section>

            <section className="follow-up-list-card">

                <div className="follow-up-toolbar">

                    <div className="follow-up-tabs">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                type="button"
                                className={
                                    activeFilter === filter
                                        ? 'active'
                                        : ''
                                }
                                onClick={() => setActiveFilter(filter)}
                            >
                                {filter}
                                <span>
                                    {filter === 'All'
                                        ? statistics.total
                                        : tasks.filter(
                                            (task) =>
                                                task.status === filter
                                        ).length}
                                </span>
                            </button>
                        ))}
                    </div>

                    <span className="follow-up-count">
                        {visibleTasks.length} tasks
                    </span>

                </div>

                <div className="follow-up-list">

                    {visibleTasks.map((task, index) => (
                        <article
                            className="follow-up-item"
                            key={task.id}
                            style={{
                                '--follow-up-delay': `${index * 50}ms`,
                            }}
                        >

                            <button
                                type="button"
                                className={
                                    task.status === 'Completed'
                                        ? 'task-check completed'
                                        : 'task-check'
                                }
                                onClick={() => toggleTask(task.id)}
                                aria-label={`Mark ${task.title} as completed`}
                            >
                                {task.status === 'Completed' && '✓'}
                            </button>

                            <div className="follow-up-content">

                                <div className="follow-up-title-row">
                                    <h2 className={
                                        task.status === 'Completed'
                                            ? 'completed-title'
                                            : ''
                                    }>
                                        {task.title}
                                    </h2>

                                    <span
                                        className={`priority-badge priority-${task.priority.toLowerCase()}`}
                                    >
                                        {task.priority}
                                    </span>
                                </div>

                                <p>
                                    {task.description}
                                </p>

                                <div className="follow-up-meta">

                                    <span>
                                        Due {task.dueDate}
                                    </span>

                                    <span>
                                        {task.contact}
                                    </span>

                                    <span
                                        className={`status-badge status-${task.status
                                            .toLowerCase()
                                            .replace(' ', '-')}`}
                                    >
                                        {task.status}
                                    </span>

                                </div>

                            </div>

                            <button
                                type="button"
                                className="follow-up-menu"
                                aria-label="More options"
                            >
                                ⋯
                            </button>

                        </article>
                    ))}

                    {visibleTasks.length === 0 && (
                        <div className="follow-up-empty">
                            <div>✓</div>
                            <h3>No tasks here</h3>
                            <p>
                                There are no follow-ups matching this filter.
                            </p>
                        </div>
                    )}

                </div>

            </section>

        </section>
    );
}

export default FollowUpsPage;