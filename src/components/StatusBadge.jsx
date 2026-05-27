const statusConfig = {
  normal:      { label: '정상',   className: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  warning:     { label: '경고',   className: 'bg-amber-50 text-amber-700 border border-amber-200' },
  fault:       { label: '고장',   className: 'bg-red-50 text-red-700 border border-red-200' },
  maintenance: { label: '점검중', className: 'bg-[#EFF6FF] text-[#3D6FE0] border border-[#BFDBFE]' },
};

const severityConfig = {
  critical: { label: '긴급', className: 'bg-red-50 text-red-700 border border-red-200' },
  warning:  { label: '경고', className: 'bg-amber-50 text-amber-700 border border-amber-200' },
  info:     { label: '정보', className: 'bg-[#EFF6FF] text-[#3D6FE0] border border-[#BFDBFE]' },
};

const alertStatusConfig = {
  active:       { label: '활성',   className: 'bg-red-50 text-red-700 border border-red-200' },
  acknowledged: { label: '확인됨', className: 'bg-amber-50 text-amber-700 border border-amber-200' },
  resolved:     { label: '해제됨', className: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
};

export function EquipmentStatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.normal;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}

export function SeverityBadge({ severity }) {
  const cfg = severityConfig[severity] || severityConfig.info;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}

export function AlertStatusBadge({ status }) {
  const cfg = alertStatusConfig[status] || alertStatusConfig.active;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}
