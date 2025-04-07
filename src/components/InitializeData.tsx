
import { useEffect, useState } from 'react';
import { migrateAllData } from '@/services/dataMigration';

export const InitializeData = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      try {
        if (localStorage.getItem('dataMigrated') !== 'true') {
          await migrateAllData();
          localStorage.setItem('dataMigrated', 'true');
        }
        setInitialized(true);
      } catch (error) {
        console.error('Error initializing data:', error);
        setInitialized(true); // Continue anyway to not block the app
      }
    };

    initializeData();
  }, []);

  return null; // Este componente não renderiza nada
};
