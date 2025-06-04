import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Zap, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  BarChart3,
  Droplets,
  Factory,
  Users,
  DollarSign,
  Calendar,
  Settings
} from 'lucide-react';

export default function DashboardPage() {
  const kpiData = [
    {
      title: "Total Energy Consumption",
      value: "2,847 kWh",
      change: "+5.2%",
      changeType: "increase" as const,
      icon: Zap,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Water Usage",
      value: "15,230 m³",
      change: "-2.1%",
      changeType: "decrease" as const,
      icon: Droplets,
      color: "text-teal-600",
      bgColor: "bg-teal-50"
    },
    {
      title: "STP Efficiency",
      value: "94.8%",
      change: "+0.3%",
      changeType: "increase" as const,
      icon: Factory,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Active Contractors",
      value: "12",
      change: "2 new",
      changeType: "neutral" as const,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: "warning",
      title: "High Energy Consumption",
      description: "Zone 3A showing 15% above normal usage",
      time: "2 hours ago",
      status: "active"
    },
    {
      id: 2,
      type: "info",
      title: "Maintenance Scheduled",
      description: "STP Plant maintenance planned for tomorrow",
      time: "4 hours ago",
      status: "scheduled"
    },
    {
      id: 3,
      type: "success",
      title: "Water Loss Reduced",
      description: "Distribution efficiency improved by 2.3%",
      time: "1 day ago",
      status: "resolved"
    }
  ];

  const quickActions = [
    { label: "Generate Report", icon: BarChart3, href: "#" },
    { label: "View Analytics", icon: TrendingUp, href: "#" },
    { label: "Settings", icon: Settings, href: "#" },
    { label: "Schedule Maintenance", icon: Calendar, href: "#" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-muscat-bay-primary">Operations Dashboard</h1>
          <p className="text-slate-600 mt-1">Welcome back! Here's what's happening at Muscat Bay today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <CheckCircle className="w-3 h-3 mr-1" />
            All Systems Operational
          </Badge>
          <Button className="bg-muscat-bay-primary hover:bg-muscat-bay-primary-dark">
            <Activity className="w-4 h-4 mr-2" />
            Real-time Monitor
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="hover:shadow-muscat transition-all duration-300 border-slate-200 hover:border-muscat-bay-accent">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">{kpi.title}</CardTitle>
              <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{kpi.value}</div>
              <div className="flex items-center space-x-1 text-sm">
                <span className={
                  kpi.changeType === 'increase' ? 'text-green-600' :
                  kpi.changeType === 'decrease' ? 'text-red-600' : 'text-slate-600'
                }>
                  {kpi.change}
                </span>
                <span className="text-slate-500">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Alerts */}
        <Card className="lg:col-span-2 border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-muscat-bay-primary">
              <AlertTriangle className="h-5 w-5" />
              Recent Alerts & Notifications
            </CardTitle>
            <CardDescription>Stay updated with the latest system alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.type === 'warning' ? 'bg-yellow-500' :
                  alert.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
                }`} />
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900">{alert.title}</h4>
                  <p className="text-sm text-slate-600 mt-1">{alert.description}</p>
                  <p className="text-xs text-slate-500 mt-2">{alert.time}</p>
                </div>
                <Badge variant={
                  alert.status === 'active' ? 'destructive' :
                  alert.status === 'scheduled' ? 'secondary' : 'default'
                }>
                  {alert.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-muscat-bay-primary">Quick Actions</CardTitle>
            <CardDescription>Frequently used operations and tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start hover:bg-muscat-bay-accent hover:text-muscat-bay-primary hover:border-muscat-bay-accent transition-all duration-200"
              >
                <action.icon className="h-4 w-4 mr-3" />
                {action.label}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* System Status Overview */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-muscat-bay-primary">System Status Overview</CardTitle>
          <CardDescription>Current operational status across all Muscat Bay systems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { system: "Electricity Grid", status: "Operational", uptime: "99.8%", color: "green" },
              { system: "Water Distribution", status: "Operational", uptime: "99.5%", color: "green" },
              { system: "STP Plant", status: "Maintenance", uptime: "95.2%", color: "yellow" },
              { system: "IoT Sensors", status: "Operational", uptime: "98.9%", color: "green" }
            ].map((system, index) => (
              <div key={index} className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-900">{system.system}</h4>
                  <div className={`w-3 h-3 rounded-full ${
                    system.color === 'green' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                </div>
                <p className="text-sm text-slate-600">{system.status}</p>
                <div className="mt-2 text-xs text-slate-500">
                  Uptime: {system.uptime}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
