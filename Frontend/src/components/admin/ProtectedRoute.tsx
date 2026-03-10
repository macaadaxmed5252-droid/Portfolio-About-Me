import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { admin, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-8">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                        </div>
                    </div>
                    <p className="text-slate-500 font-bold text-xs tracking-[0.3em] uppercase opacity-70">Securing Access...</p>
                </div>
            </div>
        );
    }

    if (!admin) {
        return <Navigate to="/admin/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
