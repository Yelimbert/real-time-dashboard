'use client';
import './styles.css';
import useWebSocketAlerts from './components/hooks/useWebSocketAlerts';
import AlertList from './components/AlertList';
import dynamic from 'next/dynamic';
import ChatPanel from '../components/ChatPanel';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import useClientId from '../hooks/useClientId';
import ThemeToggle from '../components/ThemeToggle';

const MapComponent = dynamic(() => import('@/app/components/Map'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

export default function AlertFeedPage() {
  useWebSocketAlerts();
  useClientId();
  
  //get state from redux
  const alerts = useSelector((state: RootState) => state.alerts.items);
  const activeId = useSelector((state: RootState) => state.alerts.activeId);
  const activeAlert = alerts.find(alert => alert.id === activeId) || alerts[0];

  return (
    <main className="alert-feed">
      {/* <ThemeToggle /> */}
      <div className='alert-container'>
        <AlertList alerts={alerts} />
      </div>
      <div className='map-container'>
        <MapComponent alert={activeAlert} />
        <ChatPanel />
      </div>
    </main>
  );
}
