import './LeadsPage.css';

const leads = [
    {
        id: 1,
        name: 'Sarah Johnson',
        company: 'TechNova',
        email: 'sarah@technova.com',
        status: 'New',
        source: 'Website',
        value: '$12,500',
    },
    {
        id: 2,
        name: 'Michael Chen',
        company: 'CloudPeak',
        email: 'michael@cloudpeak.com',
        status: 'Contacted',
        source: 'LinkedIn',
        value: '$8,900',
    },
    {
        id: 3,
        name: 'Emma Williams',
        company: 'BrightLabs',
        email: 'emma@brightlabs.com',
        status: 'Qualified',
        source: 'Referral',
        value: '$18,200',
    },
    {
        id: 4,
        name: 'Daniel Smith',
        company: 'FlowWorks',
        email: 'daniel@flowworks.com',
        status: 'New',
        source: 'Website',
        value: '$6,750',
    },
    {
        id: 5,
        name: 'Olivia Brown',
        company: 'Vertex',
        email: 'olivia@vertex.com',
        status: 'Negotiation',
        source: 'LinkedIn',
        value: '$24,500',
    },
];

function LeadsPage() {
    return (
        <section className="leads-page">
            <div className="leads-header">
                <div className="leads-header-content">
                    <span className="page-eyebrow">SALES MANAGEMENT</span>

                    <h1>Leads</h1>

                    <p>
                        Capture, organize and manage your potential customers.
                    </p>
                </div>

                <button className="leads-primary-button">
                    <span>+</span>
                    Add lead
                </button>
            </div>

            <div className="leads-stats">
                <div className="lead-stat-card">
                    <div className="lead-stat-icon">◎</div>

                    <div>
                        <span>Total leads</span>
                        <strong>248</strong>
                    </div>

                    <small>+12.5%</small>
                </div>

                <div className="lead-stat-card">
                    <div className="lead-stat-icon">◌</div>

                    <div>
                        <span>New leads</span>
                        <strong>42</strong>
                    </div>

                    <small>+8.2%</small>
                </div>

                <div className="lead-stat-card">
                    <div className="lead-stat-icon">✓</div>

                    <div>
                        <span>Qualified</span>
                        <strong>86</strong>
                    </div>

                    <small>+14.8%</small>
                </div>

                <div className="lead-stat-card">
                    <div className="lead-stat-icon">$</div>

                    <div>
                        <span>Pipeline value</span>
                        <strong>$184K</strong>
                    </div>

                    <small>+21.4%</small>
                </div>
            </div>

            <div className="leads-toolbar">
                <div className="leads-search">
                    <span>⌕</span>

                    <input
                        type="text"
                        placeholder="Search leads..."
                    />
                </div>

                <div className="leads-filters">
                    <button className="filter-button active">
                        All leads
                    </button>

                    <button className="filter-button">
                        New
                    </button>

                    <button className="filter-button">
                        Contacted
                    </button>

                    <button className="filter-button">
                        Qualified
                    </button>
                </div>
            </div>

            <div className="leads-card">
                <div className="leads-card-header">
                    <div>
                        <h2>All leads</h2>
                        <p>Manage your current sales opportunities.</p>
                    </div>

                    <button className="view-button">
                        View pipeline →
                    </button>
                </div>

                <div className="leads-table-wrapper">
                    <table className="leads-table">
                        <thead>
                        <tr>
                            <th>Lead</th>
                            <th>Company</th>
                            <th>Status</th>
                            <th>Source</th>
                            <th>Value</th>
                            <th></th>
                        </tr>
                        </thead>

                        <tbody>
                        {leads.map((lead) => (
                            <tr key={lead.id}>
                                <td>
                                    <div className="lead-person">
                                        <div className="lead-avatar">
                                            {lead.name
                                                .split(' ')
                                                .map((namePart) => namePart[0])
                                                .join('')}
                                        </div>

                                        <div>
                                            <strong>{lead.name}</strong>
                                            <span>{lead.email}</span>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                        <span className="company-name">
                                            {lead.company}
                                        </span>
                                </td>

                                <td>
                                        <span
                                            className={`status-badge status-${lead.status
                                                .toLowerCase()
                                                .replace(' ', '-')}`}
                                        >
                                            {lead.status}
                                        </span>
                                </td>

                                <td>
                                        <span className="source-label">
                                            {lead.source}
                                        </span>
                                </td>

                                <td>
                                    <strong className="lead-value">
                                        {lead.value}
                                    </strong>
                                </td>

                                <td>
                                    <button
                                        className="lead-action"
                                        aria-label={`Open ${lead.name}`}
                                    >
                                        →
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="leads-card-footer">
                    <span>Showing 5 of 248 leads</span>

                    <div className="pagination">
                        <button disabled>←</button>
                        <button className="current">1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>...</button>
                        <button>50</button>
                        <button>→</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LeadsPage;