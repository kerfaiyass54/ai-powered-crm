import { useMemo, useState } from 'react';
import './PipelinePage.css';

const stages = [
    {
        id: 'new',
        name: 'New',
        description: 'Fresh opportunities',
    },
    {
        id: 'qualified',
        name: 'Qualified',
        description: 'Validated opportunities',
    },
    {
        id: 'proposal',
        name: 'Proposal',
        description: 'Proposal sent',
    },
    {
        id: 'negotiation',
        name: 'Negotiation',
        description: 'Closing opportunities',
    },
];

const initialDeals = [
    {
        id: 1,
        name: 'Enterprise CRM Platform',
        company: 'Nova Technologies',
        contact: 'Sarah Johnson',
        value: 12500,
        stage: 'new',
        priority: 'High',
        days: 2,
    },
    {
        id: 2,
        name: 'Cloud Infrastructure',
        company: 'Vertex Labs',
        contact: 'Michael Chen',
        value: 18400,
        stage: 'new',
        priority: 'Medium',
        days: 5,
    },
    {
        id: 3,
        name: 'Analytics Platform',
        company: 'Bright Solutions',
        contact: 'Emma Williams',
        value: 8600,
        stage: 'new',
        priority: 'Low',
        days: 7,
    },
    {
        id: 4,
        name: 'AI Customer Assistant',
        company: 'Orbit Systems',
        contact: 'David Miller',
        value: 22000,
        stage: 'qualified',
        priority: 'High',
        days: 4,
    },
    {
        id: 5,
        name: 'Data Migration',
        company: 'CloudWorks',
        contact: 'Olivia Brown',
        value: 14800,
        stage: 'qualified',
        priority: 'Medium',
        days: 8,
    },
    {
        id: 6,
        name: 'DevOps Automation',
        company: 'Peak Digital',
        contact: 'James Wilson',
        value: 19500,
        stage: 'qualified',
        priority: 'High',
        days: 3,
    },
    {
        id: 7,
        name: 'Customer Intelligence',
        company: 'Northstar',
        contact: 'Sophia Davis',
        value: 27600,
        stage: 'proposal',
        priority: 'High',
        days: 6,
    },
    {
        id: 8,
        name: 'Sales Automation',
        company: 'BluePeak',
        contact: 'Lucas Martin',
        value: 11200,
        stage: 'proposal',
        priority: 'Medium',
        days: 9,
    },
    {
        id: 9,
        name: 'Enterprise Integration',
        company: 'Apex Group',
        contact: 'Daniel Wilson',
        value: 32000,
        stage: 'negotiation',
        priority: 'High',
        days: 3,
    },
    {
        id: 10,
        name: 'Support Automation',
        company: 'FlowWorks',
        contact: 'Mia Taylor',
        value: 16800,
        stage: 'negotiation',
        priority: 'Medium',
        days: 11,
    },
    {
        id: 11,
        name: 'Marketing Intelligence',
        company: 'DigitalCore',
        contact: 'Noah Anderson',
        value: 9300,
        stage: 'negotiation',
        priority: 'Low',
        days: 14,
    },
];

function PipelinePage() {
    const [deals, setDeals] = useState(initialDeals);
    const [searchTerm, setSearchTerm] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('All');
    const [draggedDealId, setDraggedDealId] = useState(null);
    const [dragOverStage, setDragOverStage] = useState(null);

    const filteredDeals = useMemo(() => {
        const search = searchTerm.trim().toLowerCase();

        return deals.filter((deal) => {
            const matchesSearch =
                search === '' ||
                deal.name.toLowerCase().includes(search) ||
                deal.company.toLowerCase().includes(search) ||
                deal.contact.toLowerCase().includes(search);

            const matchesPriority =
                priorityFilter === 'All' ||
                deal.priority === priorityFilter;

            return matchesSearch && matchesPriority;
        });
    }, [deals, searchTerm, priorityFilter]);

    const pipelineValue = deals.reduce(
        (total, deal) => total + deal.value,
        0
    );

    const activeDeals = deals.length;

    const averageDeal = Math.round(
        pipelineValue / activeDeals
    );

    const handleDragStart = (event, dealId) => {
        setDraggedDealId(dealId);

        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData(
            'text/plain',
            String(dealId)
        );
    };

    const handleDragEnd = () => {
        setDraggedDealId(null);
        setDragOverStage(null);
    };

    const handleDragOver = (event, stageId) => {
        event.preventDefault();

        event.dataTransfer.dropEffect = 'move';

        if (dragOverStage !== stageId) {
            setDragOverStage(stageId);
        }
    };

    const handleDragLeave = (event, stageId) => {
        if (
            !event.currentTarget.contains(
                event.relatedTarget
            )
        ) {
            if (dragOverStage === stageId) {
                setDragOverStage(null);
            }
        }
    };

    const handleDrop = (event, targetStage) => {
        event.preventDefault();

        const dealId = Number(
            event.dataTransfer.getData('text/plain')
        );

        if (!dealId) {
            handleDragEnd();
            return;
        }

        setDeals((currentDeals) =>
            currentDeals.map((deal) =>
                deal.id === dealId
                    ? {
                        ...deal,
                        stage: targetStage,
                    }
                    : deal
            )
        );

        handleDragEnd();
    };

    return (
        <section className="pipeline-page">
            <header className="pipeline-header">
                <div>
                    <span className="pipeline-eyebrow">
                        SALES PIPELINE
                    </span>

                    <h1>Pipeline</h1>

                    <p>
                        See every opportunity and understand what is
                        moving toward a close.
                    </p>
                </div>

                <button
                    className="pipeline-add-button"
                    type="button"
                >
                    <span>+</span>
                    Add opportunity
                </button>
            </header>

            <section className="pipeline-overview">
                <div className="pipeline-overview-main">
                    <span>Total pipeline value</span>

                    <strong>
                        ${pipelineValue.toLocaleString('en-US')}
                    </strong>

                    <small>
                        Across {activeDeals} active opportunities
                    </small>
                </div>

                <div className="pipeline-overview-item">
                    <span>Active deals</span>
                    <strong>{activeDeals}</strong>
                </div>

                <div className="pipeline-overview-item">
                    <span>Average deal</span>

                    <strong>
                        ${averageDeal.toLocaleString('en-US')}
                    </strong>
                </div>

                <div className="pipeline-overview-item">
                    <span>Win probability</span>
                    <strong>68%</strong>
                </div>
            </section>

            <div className="pipeline-toolbar">
                <div className="pipeline-search">
                    <span>⌕</span>

                    <input
                        type="search"
                        placeholder="Search opportunities..."
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(event.target.value)
                        }
                    />
                </div>

                <div className="pipeline-filters">
                    {['All', 'High', 'Medium', 'Low'].map(
                        (priority) => (
                            <button
                                key={priority}
                                type="button"
                                className={
                                    priorityFilter === priority
                                        ? 'pipeline-filter active'
                                        : 'pipeline-filter'
                                }
                                onClick={() =>
                                    setPriorityFilter(priority)
                                }
                            >
                                {priority === 'All'
                                    ? 'All priorities'
                                    : priority}
                            </button>
                        )
                    )}
                </div>
            </div>

            <section className="pipeline-board">
                {stages.map((stage) => {
                    const stageDeals = filteredDeals.filter(
                        (deal) => deal.stage === stage.id
                    );

                    const stageValue = stageDeals.reduce(
                        (total, deal) => total + deal.value,
                        0
                    );

                    const isDragTarget =
                        dragOverStage === stage.id;

                    return (
                        <div
                            className={
                                isDragTarget
                                    ? 'pipeline-column drag-target'
                                    : 'pipeline-column'
                            }
                            key={stage.id}
                            onDragOver={(event) =>
                                handleDragOver(
                                    event,
                                    stage.id
                                )
                            }
                            onDragLeave={(event) =>
                                handleDragLeave(
                                    event,
                                    stage.id
                                )
                            }
                            onDrop={(event) =>
                                handleDrop(
                                    event,
                                    stage.id
                                )
                            }
                        >
                            <div className="pipeline-column-header">
                                <div>
                                    <div className="pipeline-column-title">
                                        <span
                                            className={`stage-indicator stage-${stage.id}`}
                                        />

                                        <h2>{stage.name}</h2>

                                        <span className="deal-count">
                                            {stageDeals.length}
                                        </span>
                                    </div>

                                    <p>
                                        {stage.description}
                                    </p>
                                </div>

                                <button
                                    className="column-menu"
                                    type="button"
                                    aria-label={`Options for ${stage.name}`}
                                >
                                    •••
                                </button>
                            </div>

                            <div className="column-value">
                                ${stageValue.toLocaleString('en-US')}
                            </div>

                            <div className="pipeline-deals">
                                {stageDeals.map((deal) => {
                                    const isDragging =
                                        draggedDealId === deal.id;

                                    return (
                                        <article
                                            className={
                                                isDragging
                                                    ? 'deal-card dragging'
                                                    : 'deal-card'
                                            }
                                            key={deal.id}
                                            draggable
                                            onDragStart={(event) =>
                                                handleDragStart(
                                                    event,
                                                    deal.id
                                                )
                                            }
                                            onDragEnd={
                                                handleDragEnd
                                            }
                                        >
                                            <div className="deal-card-top">
                                                <span
                                                    className={`deal-priority priority-${deal.priority.toLowerCase()}`}
                                                >
                                                    {deal.priority}
                                                </span>

                                                <button
                                                    type="button"
                                                    className="deal-more"
                                                    aria-label={`More options for ${deal.name}`}
                                                >
                                                    •••
                                                </button>
                                            </div>

                                            <h3>{deal.name}</h3>

                                            <span className="deal-company">
                                                {deal.company}
                                            </span>

                                            <div className="deal-value">
                                                $
                                                {deal.value.toLocaleString(
                                                    'en-US'
                                                )}
                                            </div>

                                            <div className="deal-card-footer">
                                                <div className="deal-contact">
                                                    <span className="deal-avatar">
                                                        {deal.contact
                                                            .split(' ')
                                                            .map(
                                                                (
                                                                    part
                                                                ) =>
                                                                    part[0]
                                                            )
                                                            .join(
                                                                ''
                                                            )}
                                                    </span>

                                                    <span>
                                                        {
                                                            deal.contact
                                                        }
                                                    </span>
                                                </div>

                                                <span className="deal-days">
                                                    {deal.days}d
                                                </span>
                                            </div>
                                        </article>
                                    );
                                })}

                                {stageDeals.length === 0 && (
                                    <div className="empty-column">
                                        Drop an opportunity here
                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
                                className="add-column-deal"
                            >
                                + Add opportunity
                            </button>
                        </div>
                    );
                })}
            </section>
        </section>
    );
}

export default PipelinePage;