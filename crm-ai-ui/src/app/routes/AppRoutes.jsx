import { Routes, Route } from 'react-router-dom';

import AppLayout from '../layouts/AppLayout';

import DashboardPage from '../../pages/dashboard/DashboardPage';
import LeadsPage from '../../pages/leads/LeadsPage';
import PipelinePage from '../../pages/pipeline/PipelinePage';
import ContactsPage from '../../pages/contacts/ContactsPage';
import FollowUpsPage from '../../pages/follow-ups/FollowUpsPage';
import NotesPage from '../../pages/notes/NotesPage';
import SettingsPage from '../../pages/settings/SettingsPage';

function AppRoutes() {
    return (
        <Routes>
            <Route element={<AppLayout />}>

                <Route path="/" element={<DashboardPage />} />

                <Route path="/leads" element={<LeadsPage />} />

                <Route path="/pipeline" element={<PipelinePage />} />

                <Route path="/contacts" element={<ContactsPage />} />

                <Route path="/follow-ups" element={<FollowUpsPage />} />

                <Route path="/notes" element={<NotesPage />} />

                <Route path="/settings" element={<SettingsPage />} />

            </Route>
        </Routes>
    );
}

export default AppRoutes;