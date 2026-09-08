import { NavLink, Outlet } from 'react-router-dom';

function AppLayout() {
    return (
        <div className="app-shell">

            <aside className="app-sidebar">

                <div className="app-logo">
                    <span className="app-logo-mark">✦</span>
                    <span>CRM AI</span>
                </div>

                <nav className="app-navigation">

                    <NavLink to="/" end>
                        Dashboard
                    </NavLink>

                    <NavLink to="/leads">
                        Leads
                    </NavLink>

                    <NavLink to="/pipeline">
                        Pipeline
                    </NavLink>

                    <NavLink to="/contacts">
                        Contacts
                    </NavLink>

                    <NavLink to="/follow-ups">
                        Follow-ups
                    </NavLink>

                    <NavLink to="/notes">
                        Notes
                    </NavLink>

                </nav>

                <div className="app-sidebar-bottom">

                    <NavLink to="/settings">
                        Settings
                    </NavLink>

                </div>

            </aside>

            <main className="app-main">
                <Outlet />
            </main>

        </div>
    );
}

export default AppLayout;