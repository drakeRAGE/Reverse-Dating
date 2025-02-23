import { Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { authService } from '../authentication/authService';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const session = await authService.getSession();
                const hasValidSession = !!session?.user;
                console.log('Protected Route Session:', session); // Debug log
                console.log('Protected Route Auth Status:', hasValidSession); // Debug log
                setIsAuthenticated(hasValidSession);
            } catch (error) {
                console.error('Protected Route Auth check failed:', error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();

        const authListener = authService.onAuthStateChange((event, session) => {
            const hasValidSession = !!session?.user;
            console.log('Protected Route Auth Change:', hasValidSession); // Debug log
            setIsAuthenticated(hasValidSession);
        });

        return () => {
            if (authListener?.subscription) {
                authListener.subscription.unsubscribe();
            }
        };
    }, []);

    if (!isAuthenticated && !isLoading) {
        return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;