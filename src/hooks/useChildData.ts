import { useState, useEffect } from 'react';
import { databaseService, Child, Journey, Alert, TransportInfo } from '../services/database';

interface ChildDashboardData {
  child: Child | null;
  journeys: Journey[];
  alerts: Alert[];
  transportInfo: TransportInfo | null;
  stats: {
    todayJourneys: number;
    safeArrivals: number;
    activeAlerts: number;
    safetyScore: number;
  };
  isLoading: boolean;
  error: string | null;
}

export const useChildData = (parentId: string | undefined) => {
  const [data, setData] = useState<ChildDashboardData>({
    child: null,
    journeys: [],
    alerts: [],
    transportInfo: null,
    stats: {
      todayJourneys: 0,
      safeArrivals: 0,
      activeAlerts: 0,
      safetyScore: 0
    },
    isLoading: true,
    error: null
  });

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (!parentId) {
      setData(prev => ({ ...prev, isLoading: false, error: 'No parent ID provided' }));
      return;
    }

    const fetchChildData = async () => {
      try {
        setData(prev => ({ ...prev, isLoading: true, error: null }));

        // Fetch child information
        const child = await databaseService.getChildByParentId(parentId);
        
        if (!child) {
          setData(prev => ({ 
            ...prev, 
            isLoading: false, 
            error: 'No child found for this parent account' 
          }));
          return;
        }

        // Fetch all child-related data in parallel
        const [journeys, alerts, transportInfo, stats] = await Promise.all([
          databaseService.getChildJourneys(child.id),
          databaseService.getChildAlerts(child.id),
          databaseService.getChildTransportInfo(child.id),
          databaseService.getChildDashboardStats(child.id)
        ]);

        setData({
          child,
          journeys,
          alerts,
          transportInfo,
          stats,
          isLoading: false,
          error: null
        });

      } catch (error) {
        console.error('Error fetching child data:', error);
        setData(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: 'Failed to load child data. Please try again.' 
        }));
      }
    };

    fetchChildData();
  }, [parentId, refreshTrigger]);

  // Set up real-time updates
  useEffect(() => {
    if (!data.child) return;

    const unsubscribe = databaseService.subscribeToChildUpdates(
      data.child.id,
      (updatedChild) => {
        setData(prev => ({
          ...prev,
          child: updatedChild,
          stats: {
            ...prev.stats,
            safetyScore: updatedChild.safetyScore
          }
        }));
      }
    );

    return unsubscribe;
  }, [data.child?.id]);

  const refreshData = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const markAlertAsRead = async (alertId: string) => {
    try {
      await databaseService.markAlertAsRead(alertId);
      setData(prev => ({
        ...prev,
        alerts: prev.alerts.map(alert => 
          alert.id === alertId ? { ...alert, isRead: true } : alert
        )
      }));
    } catch (error) {
      console.error('Error marking alert as read:', error);
    }
  };

  return {
    ...data,
    refreshData,
    markAlertAsRead
  };
};