  const getStatusBadge = (status: string) => {
    const config: Record<string, { color: string; icon: any }> = {
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