import { useMemo, useState } from 'react';
import './ContactsPage.css';

const initialContacts = [
    {
        id: 1,
        name: 'James Miller',
        initials: 'JM',
        role: 'Chief Technology Officer',
        company: 'Nova Technologies',
        email: 'james.miller@novatech.com',
        phone: '+1 415 555 0182',
        location: 'San Francisco, CA',
        status: 'Customer',
        lastContact: 'Today',
        tags: ['Enterprise', 'Technology'],
        activity: [
            {
                type: 'meeting',
                title: 'Meeting scheduled',
                description: 'Product strategy discussion',
                time: 'Today · 10:30',
            },
            {
                type: 'proposal',
                title: 'Proposal sent',
                description: 'Enterprise CRM Platform',
                time: 'Yesterday · 16:20',
            },
            {
                type: 'note',
                title: 'Note added',
                description: 'Interested in AI automation',
                time: 'Sep 5 · 14:15',
            },
        ],
    },
    {
        id: 2,
        name: 'Emma Williams',
        initials: 'EW',
        role: 'Product Director',
        company: 'Bright Solutions',
        email: 'emma.williams@brightsolutions.com',
        phone: '+1 212 555 0134',
        location: 'New York, NY',
        status: 'Lead',
        lastContact: 'Yesterday',
        tags: ['SaaS', 'Product'],
        activity: [
            {
                type: 'call',
                title: 'Call completed',
                description: 'Discussed product requirements',
                time: 'Yesterday · 11:40',
            },
            {
                type: 'note',
                title: 'Note added',
                description: 'Follow up next week',
                time: 'Sep 6 · 09:20',
            },
        ],
    },
    {
        id: 3,
        name: 'Michael Chen',
        initials: 'MC',
        role: 'VP of Engineering',
        company: 'Vertex Labs',
        email: 'michael.chen@vertexlabs.com',
        phone: '+1 646 555 0198',
        location: 'Austin, TX',
        status: 'Lead',
        lastContact: '3 days ago',
        tags: ['Engineering', 'Cloud'],
        activity: [
            {
                type: 'email',
                title: 'Email received',
                description: 'Requested technical documentation',
                time: 'Sep 6 · 15:05',
            },
        ],
    },
    {
        id: 4,
        name: 'Sarah Johnson',
        initials: 'SJ',
        role: 'Head of Sales',
        company: 'Orbit Systems',
        email: 'sarah.johnson@orbitsystems.com',
        phone: '+1 312 555 0166',
        location: 'Chicago, IL',
        status: 'Customer',
        lastContact: '5 days ago',
        tags: ['Sales', 'Enterprise'],
        activity: [
            {
                type: 'meeting',
                title: 'Meeting completed',
                description: 'Quarterly account review',
                time: 'Sep 4 · 13:00',
            },
            {
                type: 'note',
                title: 'Note added',
                description: 'Expansion opportunity identified',
                time: 'Sep 4 · 15:30',
            },
        ],
    },
    {
        id: 5,
        name: 'David Miller',
        initials: 'DM',
        role: 'Founder',
        company: 'Peak Digital',
        email: 'david.miller@peakdigital.com',
        phone: '+1 202 555 0118',
        location: 'Washington, DC',
        status: 'Prospect',
        lastContact: '1 week ago',
        tags: ['Startup', 'AI'],
        activity: [
            {
                type: 'call',
                title: 'Call attempted',
                description: 'No answer',
                time: 'Sep 2 · 10:15',
            },
        ],
    },
    {
        id: 6,
        name: 'Olivia Brown',
        initials: 'OB',
        role: 'Operations Manager',
        company: 'CloudWorks',
        email: 'olivia.brown@cloudworks.com',
        phone: '+1 718 555 0175',
        location: 'Boston, MA',
        status: 'Customer',
        lastContact: '2 weeks ago',
        tags: ['Operations', 'Cloud'],
        activity: [
            {
                type: 'email',
                title: 'Email sent',
                description: 'Shared onboarding information',
                time: 'Aug 28 · 12:10',
            },
        ],
    },
];

function ContactsPage() {
    const [contacts] = useState(initialContacts);
    const [selectedId, setSelectedId] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredContacts = useMemo(() => {
        const search = searchTerm.trim().toLowerCase();

        return contacts.filter((contact) => {
            const matchesSearch =
                search === '' ||
                contact.name.toLowerCase().includes(search) ||
                contact.company.toLowerCase().includes(search) ||
                contact.role.toLowerCase().includes(search);

            const matchesStatus =
                statusFilter === 'All' ||
                contact.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [contacts, searchTerm, statusFilter]);

    const selectedContact =
        contacts.find(
            (contact) => contact.id === selectedId
        ) || contacts[0];

    return (
        <section className="contacts-page">
            <header className="contacts-header">
                <div>
                    <span className="contacts-eyebrow">
                        RELATIONSHIPS
                    </span>

                    <h1>Contacts</h1>

                    <p>
                        Keep customer relationships organized and
                        always know what happened last.
                    </p>
                </div>

                <button
                    className="contacts-add-button"
                    type="button"
                >
                    <span>+</span>
                    New contact
                </button>
            </header>

            <div className="contacts-workspace">
                <aside className="contacts-sidebar">
                    <div className="contacts-sidebar-top">
                        <div className="contacts-count">
                            <strong>{contacts.length}</strong>

                            <span>people</span>
                        </div>

                        <button
                            className="contacts-filter-button"
                            type="button"
                        >
                            Filter
                        </button>
                    </div>

                    <div className="contacts-search">
                        <span>⌕</span>

                        <input
                            type="search"
                            placeholder="Search people..."
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(
                                    event.target.value
                                )
                            }
                        />
                    </div>

                    <div className="contacts-statuses">
                        {[
                            'All',
                            'Lead',
                            'Customer',
                            'Prospect',
                        ].map((status) => (
                            <button
                                key={status}
                                type="button"
                                className={
                                    statusFilter === status
                                        ? 'contact-status active'
                                        : 'contact-status'
                                }
                                onClick={() =>
                                    setStatusFilter(status)
                                }
                            >
                                {status}

                                <span>
                                    {
                                        status === 'All'
                                            ? contacts.length
                                            : contacts.filter(
                                                (contact) =>
                                                    contact.status ===
                                                    status
                                            ).length
                                    }
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="contacts-list">
                        <span className="contacts-list-label">
                            CONTACT DIRECTORY
                        </span>

                        {filteredContacts.map((contact) => (
                            <button
                                className={
                                    selectedContact.id ===
                                    contact.id
                                        ? 'contact-list-item selected'
                                        : 'contact-list-item'
                                }
                                key={contact.id}
                                type="button"
                                onClick={() =>
                                    setSelectedId(contact.id)
                                }
                            >
                                <span className="contact-list-avatar">
                                    {contact.initials}
                                </span>

                                <span className="contact-list-content">
                                    <strong>
                                        {contact.name}
                                    </strong>

                                    <small>
                                        {contact.company}
                                    </small>
                                </span>

                                <span className="contact-list-status" />
                            </button>
                        ))}

                        {filteredContacts.length === 0 && (
                            <div className="contacts-no-results">
                                No contacts found.
                            </div>
                        )}
                    </div>
                </aside>

                <main className="contact-profile">
                    <div className="profile-cover">
                        <span className="profile-cover-line" />

                        <div className="profile-actions">
                            <button type="button">
                                Edit
                            </button>

                            <button
                                type="button"
                                aria-label="More options"
                            >
                                •••
                            </button>
                        </div>
                    </div>

                    <div className="profile-content">
                        <div className="profile-identity">
                            <div className="profile-avatar">
                                {selectedContact.initials}
                            </div>

                            <div className="profile-name">
                                <div>
                                    <h2>
                                        {selectedContact.name}
                                    </h2>

                                    <span
                                        className={`profile-status status-${selectedContact.status.toLowerCase()}`}
                                    >
                                        {selectedContact.status}
                                    </span>
                                </div>

                                <p>
                                    {selectedContact.role} at{' '}
                                    <strong>
                                        {selectedContact.company}
                                    </strong>
                                </p>
                            </div>
                        </div>

                        <div className="profile-details">
                            <div className="profile-detail">
                                <span>Email</span>

                                <a
                                    href={`mailto:${selectedContact.email}`}
                                >
                                    {selectedContact.email}
                                </a>
                            </div>

                            <div className="profile-detail">
                                <span>Phone</span>

                                <strong>
                                    {selectedContact.phone}
                                </strong>
                            </div>

                            <div className="profile-detail">
                                <span>Location</span>

                                <strong>
                                    {selectedContact.location}
                                </strong>
                            </div>

                            <div className="profile-detail">
                                <span>Last contact</span>

                                <strong>
                                    {selectedContact.lastContact}
                                </strong>
                            </div>
                        </div>

                        <div className="profile-tags">
                            {selectedContact.tags.map((tag) => (
                                <span key={tag}>{tag}</span>
                            ))}
                        </div>

                        <section className="activity-section">
                            <div className="activity-header">
                                <div>
                                    <span>
                                        CUSTOMER JOURNEY
                                    </span>

                                    <h3>Recent activity</h3>
                                </div>

                                <button type="button">
                                    View all
                                </button>
                            </div>

                            <div className="activity-timeline">
                                {selectedContact.activity.map(
                                    (activity, index) => (
                                        <div
                                            className="activity-item"
                                            key={`${activity.title}-${index}`}
                                        >
                                            <div
                                                className={`activity-icon activity-${activity.type}`}
                                            >
                                                {activity.type ===
                                                    'meeting' &&
                                                    '↗'}

                                                {activity.type ===
                                                    'proposal' &&
                                                    '◇'}

                                                {activity.type ===
                                                    'note' &&
                                                    'N'}

                                                {activity.type ===
                                                    'call' &&
                                                    '◌'}

                                                {activity.type ===
                                                    'email' &&
                                                    '@'}
                                            </div>

                                            <div className="activity-line">
                                                {index <
                                                    selectedContact
                                                        .activity
                                                        .length -
                                                    1 && (
                                                        <span />
                                                    )}
                                            </div>

                                            <div className="activity-content">
                                                <strong>
                                                    {
                                                        activity.title
                                                    }
                                                </strong>

                                                <p>
                                                    {
                                                        activity.description
                                                    }
                                                </p>

                                                <time>
                                                    {
                                                        activity.time
                                                    }
                                                </time>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </section>
    );
}

export default ContactsPage;