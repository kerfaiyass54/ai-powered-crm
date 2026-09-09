import { useMemo, useState } from 'react';
import './NotesPage.css';

const initialNotes = [
    {
        id: 1,
        content:
            'Renewal conversation with Soylent — likely to expand seats next quarter.',
        contact: 'Chloe Park',
        linked: true,
        pinned: true,
        date: '8 days ago',
    },
    {
        id: 2,
        content:
            'Champion at Wayne Enterprises is pushing internally; legal review remains the biggest blocker right now.',
        contact: 'Abigail Diaz',
        linked: true,
        pinned: false,
        date: 'about 1 month ago',
    },
    {
        id: 3,
        content:
            'Umbrella Co comparing us against a competitor on price. Emphasise support SLA and onboarding.',
        contact: 'Amelia Khan',
        linked: true,
        pinned: false,
        date: 'about 2 months ago',
    },
    {
        id: 4,
        content:
            'Renewal conversation with Wayne Tech — likely to expand seats next quarter.',
        contact: 'Ruby Bennett',
        linked: true,
        pinned: true,
        date: '2 months ago',
    },
    {
        id: 5,
        content:
            'Pendant Publishing comparing us against a competitor on price. Emphasise support SLA and onboarding.',
        contact: 'Ava Park',
        linked: true,
        pinned: false,
        date: 'about 1 month ago',
    },
    {
        id: 6,
        content:
            'Procurement at Wernham Hogg confirmed budget. Moving to contract redlines this week.',
        contact: 'Mia Hale',
        linked: true,
        pinned: false,
        date: '2 months ago',
    },
    {
        id: 7,
        content:
            'Nakatomi wants SSO + SCIM provisioning. Confirm timeline with product before committing.',
        contact: 'Noah Khan',
        linked: true,
        pinned: true,
        date: '3 months ago',
    },
    {
        id: 8,
        content:
            'Tyrell Corp requested a security questionnaire and SOC 2 report. Sent to the trust center.',
        contact: 'Harper Frost',
        linked: true,
        pinned: false,
        date: 'about 1 month ago',
    },
    {
        id: 9,
        content:
            'Left a voicemail for Stark Labs. Follow up by email if no response within 48 hours.',
        contact: 'Jackson Bauer',
        linked: true,
        pinned: false,
        date: '2 months ago',
    },
];

const filters = ['All', 'Pinned', 'Linked', 'Unlinked'];

function NotesPage() {
    const [notes, setNotes] = useState(initialNotes);
    const [activeFilter, setActiveFilter] = useState('All');
    const [search, setSearch] = useState('');

    const statistics = useMemo(() => {
        const total = notes.length;
        const pinned = notes.filter((note) => note.pinned).length;
        const linked = notes.filter((note) => note.linked).length;
        const unlinked = notes.filter((note) => !note.linked).length;

        return {
            total,
            pinned,
            linked,
            unlinked,
        };
    }, [notes]);

    const filteredNotes = notes.filter((note) => {
        const matchesSearch = note.content
            .toLowerCase()
            .includes(search.toLowerCase());

        if (!matchesSearch) {
            return false;
        }

        if (activeFilter === 'Pinned') {
            return note.pinned;
        }

        if (activeFilter === 'Linked') {
            return note.linked;
        }

        if (activeFilter === 'Unlinked') {
            return !note.linked;
        }

        return true;
    });

    const togglePinned = (id) => {
        setNotes((currentNotes) =>
            currentNotes.map((note) =>
                note.id === id
                    ? {
                        ...note,
                        pinned: !note.pinned,
                    }
                    : note
            )
        );
    };

    return (
        <section className="notes-page">

            <header className="notes-header">

                <div>
                    <p className="notes-eyebrow">
                        Workspace
                    </p>

                    <h1>Notes</h1>

                    <p className="notes-description">
                        Capture context across your deals and contacts.
                    </p>
                </div>

                <button className="notes-primary-button">
                    <span>+</span>
                    New note
                </button>

            </header>

            <div className="notes-stats">

                <article className="note-stat-card">
                    <div className="note-stat-icon">
                        ▱
                    </div>

                    <div>
                        <span>Total notes</span>
                        <strong>{statistics.total}</strong>
                    </div>
                </article>

                <article className="note-stat-card">
                    <div className="note-stat-icon pinned">
                        ☆
                    </div>

                    <div>
                        <span>Pinned</span>
                        <strong>{statistics.pinned}</strong>
                    </div>
                </article>

                <article className="note-stat-card">
                    <div className="note-stat-icon linked">
                        ↗
                    </div>

                    <div>
                        <span>Linked</span>
                        <strong>{statistics.linked}</strong>
                    </div>
                </article>

                <article className="note-stat-card">
                    <div className="note-stat-icon unlinked">
                        □
                    </div>

                    <div>
                        <span>Unlinked</span>
                        <strong>{statistics.unlinked}</strong>
                    </div>
                </article>

            </div>

            <section className="notes-content-card">

                <div className="notes-search-wrapper">
                    <span>⌕</span>

                    <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search notes..."
                    />

                    {search && (
                        <button
                            type="button"
                            onClick={() => setSearch('')}
                        >
                            ×
                        </button>
                    )}
                </div>

                <div className="notes-toolbar">

                    <div className="notes-filter-tabs">

                        {filters.map((filter) => (
                            <button
                                type="button"
                                key={filter}
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
                                        : filter === 'Pinned'
                                            ? statistics.pinned
                                            : filter === 'Linked'
                                                ? statistics.linked
                                                : statistics.unlinked}
                                </span>
                            </button>
                        ))}

                    </div>

                    <span className="notes-result-count">
                        {filteredNotes.length} of {statistics.total}
                    </span>

                </div>

            </section>

            <section className="notes-grid">

                {filteredNotes.map((note, index) => (
                    <article
                        className={`note-card ${
                            note.pinned ? 'is-pinned' : ''
                        }`}
                        key={note.id}
                        style={{
                            '--note-delay': `${index * 45}ms`,
                        }}
                    >

                        <div className="note-card-header">

                            <span className="note-type-icon">
                                ▱
                            </span>

                            <button
                                type="button"
                                className={
                                    note.pinned
                                        ? 'note-pin active'
                                        : 'note-pin'
                                }
                                onClick={() => togglePinned(note.id)}
                                aria-label={
                                    note.pinned
                                        ? 'Unpin note'
                                        : 'Pin note'
                                }
                            >
                                {note.pinned ? '★' : '☆'}
                            </button>

                        </div>

                        <p className="note-content">
                            {note.content}
                        </p>

                        <div className="note-card-footer">

                            <div className="note-contact">

                                <span className="note-contact-icon">
                                    ↗
                                </span>

                                <strong>
                                    {note.contact}
                                </strong>

                            </div>

                            <span className="note-date">
                                {note.date}
                            </span>

                            <button
                                type="button"
                                className="note-more"
                                aria-label="More options"
                            >
                                ⋯
                            </button>

                        </div>

                    </article>
                ))}

                {filteredNotes.length === 0 && (
                    <div className="notes-empty">
                        <div>⌕</div>
                        <h3>No notes found</h3>
                        <p>
                            Try another search or filter.
                        </p>
                    </div>
                )}

            </section>

        </section>
    );
}

export default NotesPage;