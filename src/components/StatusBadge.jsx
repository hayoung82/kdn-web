const statusConfig = {
  normal:      { label: '정상',   className: 'bg-green-100 text-green-700 border border-green-200' },
  warning:     { label: '경고',   className: 'bg-amber-100 text-amber-700 border border-amber-200' },
  fault:       { label: '고장',   className: 'bg-red-100 text-red-700 border border-red-200' },
  maintenance: { label: '점검중', className: 'bg-blue-100 text-blue-700 border border-blue-200' },
};

const severityConfig = {
  critical: { label: '긴급', className: 'bg-red-100 text-red-700 border border-red-200' },
  warning:  { label: '경고', className: 'bg-amber-100 text-amber-700 border border-amber-200' },
  info:     { label: '정보', className: 'bg-blue-100 text-blue-700 border border-blue-200' },
};

const alertStatusConfig = {
  active:       { label: '활성',   className: 'bg-red-100 text-red-700' },
  acknowledged: { label: '확인됨', className: 'bg-amber-100 text-amber-700' },
  resolved:     { label: '해제됨', className: 'bg-green-100 text-green-700' },
};

export function EquipmentStatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.normal;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}

export function SeverityBadge({ severity }) {
  const cfg = severityConfig[severity] || severityConfig.info;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}

export function AlertStatusBadge({ status }) {
  const cfg = alertStatusConfig[status] || alertStatusConfig.active;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}
