import { Outlet } from 'react-router-dom';

function AppLayout() {
    return (
        <div className="app-shell">
            <aside className="app-sidebar">
                <div className="app-logo">
                    <span className="app-logo-mark">✦</span>
                    <span>CRM AI</span>
                </div>

                <nav className="app-navigation">
                    <a href="/">Dashboard</a>
                    <a href="/leads">Leads</a>
                    <a href="/pipeline">Pipeline</a>
                    <a href="/contacts">Contacts</a>
                    <a href="/follow-ups">Follow-ups</a>
                    <a href="/notes">Notes</a>
                </nav>

                <div className="app-sidebar-bottom">
                    <a href="/settings">Settings</a>
                </div>
            </aside>

            <main className="app-main">
                <Outlet />
            </main>
        </div>
    );
}

export default AppLayout;