import './DashboardPage.css';

const metrics = [
    {
        label: 'Total leads',
        value: '248',
        change: '+12.5%',
        description: 'vs. last month',
        trend: 'up',
    },
    {
        label: 'Qualified leads',
        value: '86',
        change: '+8.2%',
        description: 'vs. last month',
        trend: 'up',
    },
    {
        label: 'Open deals',
        value: '34',
        change: '+4.7%',
        description: 'vs. last month',
        trend: 'up',
    },
    {
        label: 'Revenue',
        value: '€84.6K',
        change: '+18.4%',
        description: 'vs. last month',
        trend: 'up',
    },
];

const recentLeads = [
    {
        name: 'Amine Ben Salah',
        company: 'TechVision',
        status: 'Qualified',
        value: '€12,500',
    },
    {
        name: 'Sami Trabelsi',
        company: 'Northstar',
        status: 'New',
        value: '€8,200',
    },
    {
        name: 'Sarah Martin',
        company: 'Nova Systems',
        status: 'Contacted',
        value: '€15,800',
    },
    {
        name: 'Youssef Mansour',
        company: 'Digital Works',
        status: 'Qualified',
        value: '€21,400',
    },
];

const activities = [
    {
        title: 'New lead added',
        description: 'Amine Ben Salah was added to your leads.',
        time: '12 min ago',
        type: 'lead',
    },
    {
        title: 'Deal moved',
        description: 'TechVision moved to Proposal.',
        time: '42 min ago',
        type: 'deal',
    },
    {
        title: 'Follow-up completed',
        description: 'Call with Sarah Martin completed.',
        time: '1h ago',
        type: 'followup',
    },
    {
        title: 'Note added',
        description: 'A note was added to Northstar.',
        time: '2h ago',
        type: 'note',
    },
];

function DashboardPage() {
    return (
        <section className="dashboard-page">

            <header className="dashboard-header">
                <div>
                    <p className="dashboard-eyebrow">Overview</p>

                    <h1>Dashboard</h1>

                    <p className="dashboard-description">
                        Track your sales activity and keep your pipeline moving.
                    </p>
                </div>

                <div className="dashboard-actions">
                    <button className="dashboard-button dashboard-button-secondary">
                        Export
                    </button>

                    <button className="dashboard-button dashboard-button-primary">
                        + Add lead
                    </button>
                </div>
            </header>

            <div className="dashboard-metrics">
                {metrics.map((metric) => (
                    <article
                        className="metric-card"
                        key={metric.label}
                    >
                        <div className="metric-card-top">
                            <span className="metric-label">
                                {metric.label}
                            </span>

                            <span className="metric-indicator" />
                        </div>

                        <div className="metric-value">
                            {metric.value}
                        </div>

                        <div className="metric-footer">
                            <span className="metric-change">
                                {metric.change}
                            </span>

                            <span className="metric-description">
                                {metric.description}
                            </span>
                        </div>
                    </article>
                ))}
            </div>

            <div className="dashboard-grid">

                <section className="dashboard-card pipeline-overview">
                    <div className="dashboard-card-header">
                        <div>
                            <p className="card-eyebrow">Sales</p>
                            <h2>Pipeline overview</h2>
                        </div>

                        <button className="card-action">
                            View pipeline
                        </button>
                    </div>

                    <div className="pipeline-chart">
                        <div className="chart-axis">
                            <span>€100K</span>
                            <span>€75K</span>
                            <span>€50K</span>
                            <span>€25K</span>
                            <span>€0</span>
                        </div>

                        <div className="chart-area">
                            <div className="chart-grid-lines">
                                <span />
                                <span />
                                <span />
                                <span />
                                <span />
                            </div>

                            <div className="chart-bars">
                                <div className="chart-column">
                                    <span style={{ height: '38%' }} />
                                    <small>New</small>
                                </div>

                                <div className="chart-column">
                                    <span style={{ height: '55%' }} />
                                    <small>Contacted</small>
                                </div>

                                <div className="chart-column">
                                    <span style={{ height: '72%' }} />
                                    <small>Qualified</small>
                                </div>

                                <div className="chart-column">
                                    <span style={{ height: '61%' }} />
                                    <small>Proposal</small>
                                </div>

                                <div className="chart-column">
                                    <span style={{ height: '43%' }} />
                                    <small>Negotiation</small>
                                </div>

                                <div className="chart-column">
                                    <span style={{ height: '28%' }} />
                                    <small>Won</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="dashboard-card activity-card">
                    <div className="dashboard-card-header">
                        <div>
                            <p className="card-eyebrow">Workspace</p>
                            <h2>Recent activity</h2>
                        </div>

                        <button className="card-action">
                            View all
                        </button>
                    </div>

                    <div className="activity-list">
                        {activities.map((activity) => (
                            <div
                                className="activity-item"
                                key={`${activity.title}-${activity.time}`}
                            >
                                <span
                                    className={`activity-dot activity-dot-${activity.type}`}
                                />

                                <div className="activity-content">
                                    <strong>{activity.title}</strong>

                                    <p>{activity.description}</p>
                                </div>

                                <time>{activity.time}</time>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

            <section className="dashboard-card leads-card">

                <div className="dashboard-card-header">
                    <div>
                        <p className="card-eyebrow">CRM</p>
                        <h2>Recent leads</h2>
                    </div>

                    <button className="card-action">
                        View all leads
                    </button>
                </div>

                <div className="leads-table-wrapper">
                    <table className="leads-table">
                        <thead>
                        <tr>
                            <th>Lead</th>
                            <th>Company</th>
                            <th>Status</th>
                            <th>Potential value</th>
                        </tr>
                        </thead>

                        <tbody>
                        {recentLeads.map((lead) => (
                            <tr key={lead.name}>
                                <td>
                                    <div className="lead-name">
                                            <span className="lead-avatar">
                                                {lead.name
                                                    .split(' ')
                                                    .map((name) => name[0])
                                                    .join('')
                                                    .slice(0, 2)}
                                            </span>

                                        <strong>{lead.name}</strong>
                                    </div>
                                </td>

                                <td>{lead.company}</td>

                                <td>
                                        <span
                                            className={`lead-status lead-status-${lead.status.toLowerCase()}`}
                                        >
                                            {lead.status}
                                        </span>
                                </td>

                                <td className="lead-value">
                                    {lead.value}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </section>

        </section>
    );
}

export default DashboardPage;