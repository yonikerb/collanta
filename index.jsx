import React, { useState, useEffect } from 'react';
import { LayoutDashboard, PlusCircle, FileText, UserPlus, TrendingUp, Search } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalSales: 0, target: 60000 });
  const [loading, setLoading] = useState(true);

  // חיבור ל-Backend שמתקשר עם ה-Service Layer של SAP
  useEffect(() => {
    fetch('/api/sales-summary') // הכתובת בשרת שלך
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => console.error("Error fetching SAP data:", err));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="p-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">שלום יונתן</h1>
        <p className="text-gray-500">ניהול הזמנות - SAP Business One</p>
      </header>

      <main className="p-4 space-y-6">
        {/* כרטיס סיכום מכירות */}
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-blue-600" />
            <h2 className="font-bold text-gray-700">ביצועים חודשיים</h2>
          </div>
          {loading ? (
            <div className="animate-pulse h-10 bg-gray-200 rounded w-1/2"></div>
          ) : (
            <>
              <div className="text-4xl font-extrabold text-gray-900">₪ {stats.totalSales.toLocaleString()}</div>
              <div className="w-full bg-gray-100 h-3 rounded-full mt-4 overflow-hidden">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${(stats.totalSales / stats.target) * 100}%` }}></div>
              </div>
            </>
          )}
        </section>

        {/* גריד כפתורי פעולה */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex flex-col items-center justify-center p-6 bg-blue-600 text-white rounded-3xl shadow-lg hover:bg-blue-700 transition-all">
            <PlusCircle size={32} />
            <span className="mt-2 font-semibold">הזמנה חדשה</span>
          </button>
          <button className="flex flex-col items-center justify-center p-6 bg-white text-gray-700 rounded-3xl border border-gray-200 shadow-sm hover:border-blue-500 transition-all">
            <UserPlus size={32} />
            <span className="mt-2 font-semibold">לקוחות</span>
          </button>
        </div>
      </main>

      {/* תפריט ניווט תחתון (Bottom Navigation) */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50">
        <button className="text-blue-600 flex flex-col items-center">
          <LayoutDashboard size={24} />
          <span className="text-[10px] mt-1">בית</span>
        </button>
        <button className="text-gray-400 flex flex-col items-center">
          <FileText size={24} />
          <span className="text-[10px] mt-1">הזמנות</span>
        </button>
        <button className="text-gray-400 flex flex-col items-center">
          <Search size={24} />
          <span className="text-[10px] mt-1">חיפוש</span>
        </button>
      </nav>
    </div>
  );
};

export default Dashboard;
