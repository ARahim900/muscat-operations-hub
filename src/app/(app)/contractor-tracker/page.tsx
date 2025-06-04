'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  DollarSign, 
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  FileText,
  Eye,
  Edit,
  MoreHorizontal,
  Building,
  Activity
} from 'lucide-react';

// Contractor data based on your operational requirements
const contractorData = [
  {
    id: 1,
    contractor: "KONE Assarain LLC",
    service: "Lift Maintenance Services",
    status: "Active",
    contractType: "Contract",
    startDate: "2025-01-01",
    endDate: null,
    monthlyRate: 525,
    yearlyTotal: 11550,
    vatStatus: "Excl VAT",
    notes: "",
    category: "Maintenance"
  },
  {
    id: 2,
    contractor: "Oman Water Treatment Company (OWATCO)",
    service: "Comprehensive STP Operation and Maintenance",
    status: "Active",
    contractType: "Contract",
    startDate: null,
    endDate: null,
    monthlyRate: 3103.8,
    yearlyTotal: 37245.4,
    vatStatus: "Inc VAT",
    notes: "New contract due to early termination of previous Contract with Celar Company",
    category: "Water Treatment"
  },
  {
    id: 3,
    contractor: "Kalhat",
    service: "Facility Management (FM)",
    status: "Active",
    contractType: "Contract",
    startDate: "2024-05-07",
    endDate: "2030-05-06",
    monthlyRate: 32200.8,
    yearlyTotal: 386409.718,
    vatStatus: "Inc VAT",
    notes: "New contract overlapping with COMO",
    category: "Facility Management"
  },
  {
    id: 4,
    contractor: "Future Cities S.A.O.C (Tadoom)",
    service: "Supply and Installation of Smart Water Meters, Billing for Water Consumption",
    status: "Active",
    contractType: "Contract",
    startDate: null,
    endDate: null,
    monthlyRate: 2.7, // Per meter collection
    yearlyTotal: 184.3,
    vatStatus: "Inc VAT",
    notes: "New contract replacing OIFC - 2.7 Per Meter Collection",
    category: "Technology"
  },
  {
    id: 5,
    contractor: "Muna Noor International LLC",
    service: "Pest Control Services",
    status: "Active",
    contractType: "Contract",
    startDate: "2024-07-01",
    endDate: null,
    monthlyRate: 1400,
    yearlyTotal: 16000,
    vatStatus: "Inc VAT",
    notes: "",
    category: "Maintenance"
  },
  {
    id: 6,
    contractor: "Celar Water",
    service: "Comprehensive STP Operation and Maintenance",
    status: "Expired",
    contractType: "Contract",
    startDate: null,
    endDate: null,
    monthlyRate: 4439,
    yearlyTotal: 0,
    vatStatus: "Inc VAT",
    notes: "Transitioned to OWATCO before contract end",
    category: "Water Treatment"
  },
  {
    id: 7,
    contractor: "Gulf Expert",
    service: "Chillers, BMS & Pressurisation Units",
    status: "Active",
    contractType: "Contract",
    startDate: "2024-06-03",
    endDate: "2025-06-02",
    monthlyRate: 770,
    yearlyTotal: 9240,
    vatStatus: "Inc VAT",
    notes: "",
    category: "HVAC"
  },
  {
    id: 8,
    contractor: "Advanced Technology and Projects Company",
    service: "BMS Non-Comprehensive Annual Maintenance",
    status: "Expired",
    contractType: "PO",
    startDate: null,
    endDate: null,
    monthlyRate: 0,
    yearlyTotal: 3800,
    vatStatus: "Inc VAT",
    notes: "",
    category: "Technology"
  },
  {
    id: 9,
    contractor: "Al Naba Services LLC",
    service: "Garbage Removal Services",
    status: "Expired",
    contractType: "Contract",
    startDate: "2023-04-02",
    endDate: "2024-04-01",
    monthlyRate: 0, // Per skip trip pricing
    yearlyTotal: 0,
    vatStatus: "Inc VAT",
    notes: "32 OMR per Skip Trip",
    category: "Maintenance"
  },
  {
    id: 10,
    contractor: "Bahwan Engineering Company LLC",
    service: "Maintenance of Fire Alarm & Fire Fighting Equipment",
    status: "Active",
    contractType: "Contract",
    startDate: null,
    endDate: null,
    monthlyRate: 743.8,
    yearlyTotal: 8925,
    vatStatus: "Inc VAT",
    notes: "",
    category: "Safety"
  },
  {
    id: 11,
    contractor: "COMO",
    service: "Facility Management (FM)",
    status: "Expired",
    contractType: "Contract",
    startDate: "2022-03-01",
    endDate: null,
    monthlyRate: 44382,
    yearlyTotal: 0,
    vatStatus: "Inc VAT",
    notes: "Transitioned to Kalhat before contract end",
    category: "Facility Management"
  },
  {
    id: 12,
    contractor: "Muscat Electronics LLC",
    service: "Daikin AC Chillers (Sale Center) Maintenance Services",
    status: "Expired",
    contractType: "Contract",
    startDate: null,
    endDate: null,
    monthlyRate: 199.5,
    yearlyTotal: 0,
    vatStatus: "Inc VAT",
    notes: "199.5 OMR per Service Quarter - Nearing expiration, review for renewal needed",
    category: "HVAC"
  }
];

const COLORS = {
  primary: '#4E4456',
  primaryLight: '#7E708A',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6'
};

export default function ContractorTrackerPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedContractor, setSelectedContractor] = useState(null);

  // Get unique categories for filter
  const categories = useMemo(() => 
    [...new Set(contractorData.map(item => item.category))].sort(), 
    []
  );

  // Filter contractors based on search and filters
  const filteredContractors = useMemo(() => {
    return contractorData.filter(contractor => {
      const matchesSearch = contractor.contractor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           contractor.service.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || contractor.status.toLowerCase() === statusFilter;
      const matchesCategory = categoryFilter === 'all' || contractor.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchTerm, statusFilter, categoryFilter]);

  // Calculate summary statistics
  const stats = useMemo(() => {
    const active = filteredContractors.filter(c => c.status === 'Active');
    const expired = filteredContractors.filter(c => c.status === 'Expired');
    const totalMonthly = active.reduce((sum, c) => sum + (c.monthlyRate || 0), 0);
    const totalYearly = active.reduce((sum, c) => sum + (c.yearlyTotal || 0), 0);

    return {
      total: filteredContractors.length,
      active: active.length,
      expired: expired.length,
      totalMonthly,
      totalYearly
    };
  }, [filteredContractors]);

  const getStatusBadge = (status: string) => {
    const config = {
      'Active': { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
      'Expired': { color: 'bg-red-100 text-red-800 border-red-200', icon: AlertTriangle }
    };
    
    const { color, icon: Icon } = config[status] || config['Active'];
    return (
      <Badge variant="outline" className={`${color} flex items-center gap-1`}>
        <Icon size={12} />
        {status}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    if (!amount) return 'N/A';
    return `${amount.toLocaleString()} OMR`;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'TBD';
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
          <CardTitle className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Building className="h-8 w-8 text-blue-600" />
            Contractor Tracker
          </CardTitle>
          <CardDescription className="text-gray-600 text-lg">
            Manage and monitor contractor performance, schedules, and compliance for Muscat Bay operations.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Contractors</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Contracts</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Expired Contracts</p>
              <p className="text-2xl font-bold text-red-600">{stats.expired}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Monthly Cost</p>
              <p className="text-xl font-bold text-yellow-600">{formatCurrency(stats.totalMonthly)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Activity className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Annual Cost</p>
              <p className="text-xl font-bold text-purple-600">{formatCurrency(stats.totalYearly)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Contractors</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by contractor name or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setCategoryFilter('all');
            }}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Reset
          </Button>

          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </Card>

      {/* Contractors Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Contractor Details
            <Badge variant="outline" className="text-sm">
              {filteredContractors.length} contractors
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-700">Contractor</th>
                  <th className="text-left p-4 font-medium text-gray-700">Service</th>
                  <th className="text-left p-4 font-medium text-gray-700">Status</th>
                  <th className="text-left p-4 font-medium text-gray-700">Category</th>
                  <th className="text-left p-4 font-medium text-gray-700">Contract Period</th>
                  <th className="text-right p-4 font-medium text-gray-700">Monthly Rate</th>
                  <th className="text-right p-4 font-medium text-gray-700">Annual Total</th>
                  <th className="text-center p-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredContractors.map((contractor) => (
                  <tr key={contractor.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-gray-900">{contractor.contractor}</p>
                        <p className="text-sm text-gray-500">{contractor.contractType}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-gray-900 max-w-[200px] truncate" title={contractor.service}>
                        {contractor.service}
                      </p>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(contractor.status)}
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="text-xs">
                        {contractor.category}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <p className="text-gray-900">Start: {formatDate(contractor.startDate)}</p>
                        <p className="text-gray-600">End: {formatDate(contractor.endDate)}</p>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <p className="font-medium text-gray-900">
                        {formatCurrency(contractor.monthlyRate)}
                      </p>
                      <p className="text-xs text-gray-500">{contractor.vatStatus}</p>
                    </td>
                    <td className="p-4 text-right">
                      <p className="font-medium text-gray-900">
                        {formatCurrency(contractor.yearlyTotal)}
                      </p>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredContractors.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No contractors found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notes Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Contract Notes & Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {contractorData
              .filter(c => c.notes && c.notes.trim() !== '')
              .map(contractor => (
                <div key={contractor.id} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-blue-100 rounded">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{contractor.contractor}</p>
                      <p className="text-sm text-gray-600 mt-1">{contractor.notes}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
