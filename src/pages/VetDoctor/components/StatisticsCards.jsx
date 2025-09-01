import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import { vetDoctorApi } from '../../../apis/vetDoctorApi';

const StatisticsCards = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    inClinic: { total: 0, remaining: 0, completed: 0 },
    homeVisit: { total: 0, remaining: 0, completed: 0 },
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await vetDoctorApi.getDashboardStats();
        if (mounted) setStats(data);
      } catch (e) {
        setError('Failed to load stats');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"><div className="animate-pulse h-28 bg-gray-100 rounded" /><div className="animate-pulse h-28 bg-gray-100 rounded" /><div className="animate-pulse h-28 bg-gray-100 rounded" /><div className="animate-pulse h-28 bg-gray-100 rounded" /></div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  const inClinicStats = [
    { title: 'Number Of Appointments', value: stats.inClinic.total, icon: Calendar, color: 'bg-blue-500', to: '/vetdoctor/in-clinic' },
    { title: 'Remaining Appointments', value: stats.inClinic.remaining, icon: Clock, color: 'bg-yellow-500', to: '/vetdoctor/in-clinic' },
    { title: 'Completed Appointments', value: stats.inClinic.completed, icon: CheckCircle, color: 'bg-green-500', to: '/vetdoctor/in-clinic' },
  ];

  const homeVisitStats = [
    { title: 'Number Of Appointments', value: stats.homeVisit.total, icon: Calendar, color: 'bg-blue-500', to: '/vetdoctor/home-visit' },
    { title: 'Remaining Appointments', value: stats.homeVisit.remaining, icon: Clock, color: 'bg-yellow-500', to: '/vetdoctor/home-visit' },
    { title: 'Completed Appointments', value: stats.homeVisit.completed, icon: CheckCircle, color: 'bg-green-500', to: '/vetdoctor/home-visit' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">In-Clinic</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {inClinicStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Link key={index} to={stat.to} className="block">
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                      <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-full`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Home Visit</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homeVisitStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Link key={index} to={stat.to} className="block">
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                      <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-full`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatisticsCards;
