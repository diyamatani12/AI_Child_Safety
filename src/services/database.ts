// Mock database service - simulates real database operations
export interface Child {
  id: string;
  name: string;
  age: number;
  school: string;
  class: string;
  avatar: string;
  parentId: string;
  currentStatus: 'at_home' | 'in_transit' | 'at_school' | 'unknown';
  currentLocation: string;
  safetyScore: number;
  isOnline: boolean;
}

export interface Journey {
  id: string;
  childId: string;
  date: string;
  startTime: string;
  endTime?: string;
  startLocation: string;
  endLocation: string;
  route: string;
  transportType: string;
  transportId: string;
  status: 'in_progress' | 'completed' | 'delayed';
  safetyScore: number;
  incidents: number;
  duration?: string;
}

export interface Alert {
  id: string;
  childId: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  time: string;
  location?: string;
  isRead: boolean;
}

export interface TransportInfo {
  type: string;
  id: string;
  route: string;
  nextStop: {
    name: string;
    eta: string;
  };
  progress: number;
}

// Mock database
const mockDatabase = {
  children: [
    {
      id: 'child_1',
      name: 'Aarav Sharma',
      age: 12,
      school: 'Delhi Public School',
      class: 'Class 7',
      avatar: 'https://images.pexels.com/photos/1068205/pexels-photo-1068205.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      parentId: 'parent_1',
      currentStatus: 'at_school' as const,
      currentLocation: 'Delhi Public School',
      safetyScore: 98,
      isOnline: true
    },
    {
      id: 'child_2',
      name: 'Priya Patel',
      age: 10,
      school: 'Ryan International School',
      class: 'Class 5',
      avatar: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      parentId: 'parent_2',
      currentStatus: 'in_transit' as const,
      currentLocation: 'Bus #MH-12-AB-1234',
      safetyScore: 95,
      isOnline: true
    },
    {
      id: 'child_3',
      name: 'Arjun Kumar',
      age: 14,
      school: 'Kendriya Vidyalaya',
      class: 'Class 9',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      parentId: 'parent_3',
      currentStatus: 'at_home' as const,
      currentLocation: 'Home',
      safetyScore: 92,
      isOnline: false
    }
  ] as Child[],

  journeys: [
    {
      id: 'journey_1',
      childId: 'child_1',
      date: 'Today',
      startTime: '08:30 AM',
      endTime: '08:45 AM',
      startLocation: 'Home',
      endLocation: 'Delhi Public School',
      route: 'Route 45B',
      transportType: 'Bus',
      transportId: 'DL-1PC-4567',
      status: 'completed' as const,
      safetyScore: 98,
      incidents: 0,
      duration: '25 min'
    },
    {
      id: 'journey_2',
      childId: 'child_1',
      date: 'Yesterday',
      startTime: '03:30 PM',
      endTime: '04:00 PM',
      startLocation: 'Delhi Public School',
      endLocation: 'Home',
      route: 'Route 45B',
      transportType: 'Bus',
      transportId: 'DL-1PC-4567',
      status: 'completed' as const,
      safetyScore: 95,
      incidents: 0,
      duration: '30 min'
    },
    {
      id: 'journey_3',
      childId: 'child_2',
      date: 'Today',
      startTime: '08:15 AM',
      startLocation: 'Home',
      endLocation: 'Ryan International School',
      route: 'Route 23A',
      transportType: 'Bus',
      transportId: 'MH-12-AB-1234',
      status: 'in_progress' as const,
      safetyScore: 95,
      incidents: 0
    }
  ] as Journey[],

  alerts: [
    {
      id: 'alert_1',
      childId: 'child_1',
      type: 'success' as const,
      title: 'Safe Arrival',
      message: 'Aarav arrived at school safely',
      time: '08:45 AM',
      location: 'Delhi Public School',
      isRead: false
    },
    {
      id: 'alert_2',
      childId: 'child_1',
      type: 'info' as const,
      title: 'Journey Started',
      message: 'Boarding Bus #DL-1PC-4567',
      time: '08:30 AM',
      location: 'Home Bus Stop',
      isRead: false
    },
    {
      id: 'alert_3',
      childId: 'child_2',
      type: 'warning' as const,
      title: 'Slight Delay',
      message: 'Bus running 5 minutes late due to traffic',
      time: '08:20 AM',
      location: 'Route 23A',
      isRead: false
    }
  ] as Alert[],

  transportInfo: {
    'child_1': {
      type: 'Bus',
      id: 'DL-1PC-4567',
      route: 'Route 45B',
      nextStop: {
        name: 'School Gate',
        eta: 'Arrived'
      },
      progress: 100
    },
    'child_2': {
      type: 'Bus',
      id: 'MH-12-AB-1234',
      route: 'Route 23A',
      nextStop: {
        name: 'Ryan International School',
        eta: '5 mins'
      },
      progress: 85
    }
  } as Record<string, TransportInfo>
};

// Database service functions
export class DatabaseService {
  // Simulate API delay
  private async delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get child by parent ID
  async getChildByParentId(parentId: string): Promise<Child | null> {
    await this.delay();
    const child = mockDatabase.children.find(c => c.parentId === parentId);
    return child || null;
  }

  // Get child's recent journeys
  async getChildJourneys(childId: string, limit: number = 10): Promise<Journey[]> {
    await this.delay();
    return mockDatabase.journeys
      .filter(j => j.childId === childId)
      .slice(0, limit);
  }

  // Get child's alerts
  async getChildAlerts(childId: string, limit: number = 10): Promise<Alert[]> {
    await this.delay();
    return mockDatabase.alerts
      .filter(a => a.childId === childId)
      .slice(0, limit);
  }

  // Get child's current transport info
  async getChildTransportInfo(childId: string): Promise<TransportInfo | null> {
    await this.delay();
    return mockDatabase.transportInfo[childId] || null;
  }

  // Update child's current status
  async updateChildStatus(childId: string, status: Child['currentStatus'], location: string): Promise<void> {
    await this.delay();
    const child = mockDatabase.children.find(c => c.id === childId);
    if (child) {
      child.currentStatus = status;
      child.currentLocation = location;
    }
  }

  // Mark alert as read
  async markAlertAsRead(alertId: string): Promise<void> {
    await this.delay();
    const alert = mockDatabase.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.isRead = true;
    }
  }

  // Get dashboard stats for a child
  async getChildDashboardStats(childId: string): Promise<{
    todayJourneys: number;
    safeArrivals: number;
    activeAlerts: number;
    safetyScore: number;
  }> {
    await this.delay();
    
    const child = mockDatabase.children.find(c => c.id === childId);
    const todayJourneys = mockDatabase.journeys.filter(j => 
      j.childId === childId && j.date === 'Today'
    ).length;
    
    const completedJourneys = mockDatabase.journeys.filter(j => 
      j.childId === childId && j.status === 'completed'
    ).length;
    
    const unreadAlerts = mockDatabase.alerts.filter(a => 
      a.childId === childId && !a.isRead
    ).length;

    return {
      todayJourneys,
      safeArrivals: completedJourneys,
      activeAlerts: unreadAlerts,
      safetyScore: child?.safetyScore || 0
    };
  }

  // Simulate real-time updates
  async subscribeToChildUpdates(childId: string, callback: (child: Child) => void): Promise<() => void> {
    const child = mockDatabase.children.find(c => c.id === childId);
    if (!child) return () => {};

    // Simulate periodic updates
    const interval = setInterval(() => {
      // Randomly update some properties to simulate real-time changes
      if (Math.random() > 0.8) {
        child.safetyScore = Math.max(85, Math.min(100, child.safetyScore + (Math.random() - 0.5) * 2));
        callback(child);
      }
    }, 5000);

    return () => clearInterval(interval);
  }
}

export const databaseService = new DatabaseService();