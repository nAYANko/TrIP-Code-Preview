
import { LogOut } from "lucide-react";

interface DashboardHeaderProps {
  onSignOut: () => void;
}

export const DashboardHeader = ({ onSignOut }: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-center p-6">
      <div>
        <h1 className="text-4xl font-bold text-white">Welcome Back!</h1>
        <p className="text-blue-500 mt-2">Ready to plan your next adventure?</p>
      </div>
      
      <div className="flex items-center mr-10 gap-4">
        <img 
          src="/more-uploads/c0a41224-f8bb-4974-b751-1401d2545013.png" 
          alt="TriP Logo" 
          className="w-8 h-8"
        />
      </div>
      <div>
        <button onClick={onSignOut} className="trip-button-outline flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
};
