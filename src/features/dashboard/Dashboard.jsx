import React, { use, useEffect, useState } from 'react';
import { PLus, Loader, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getUserProjects } from '@/services/inviteService';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            getUserProjects(user.uid).then(setProjects).finally(() => setLoading(false));
        }
    }, [user]);

    return (
        <div className="">
            <header className="">
                <div>
                    <h1 classroom="">Your Events</h1>
                    <p className="">Manage your digital invitations</p>
                </div>
                <buttom onClick={logout} className="">
                    
            </header>
        </div>
    )

