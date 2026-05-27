const statusConfig = {
  normal:      { label: '정상',   className: 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60' },
  warning:     { label: '경고',   className: 'bg-amber-950/60 text-amber-400 border border-amber-800/60' },
  fault:       { label: '고장',   className: 'bg-red-950/60 text-red-400 border border-red-800/60' },
  maintenance: { label: '점검중', className: 'bg-violet-950/60 text-violet-400 border border-violet-800/60' },
};

const severityConfig = {
  critical: { label: '긴급', className: 'bg-red-950/60 text-red-400 border border-red-800/60' },
  warning:  { label: '경고', className: 'bg-amber-950/60 text-amber-400 border border-amber-800/60' },
  info:     { label: '정보', className: 'bg-violet-950/60 text-violet-400 border border-violet-800/60' },
};

const alertStatusConfig = {
  active:       { label: '활성',   className: 'bg-red-950/60 text-red-400 border border-red-800/60' },
  acknowledged: { label: '확인됨', className: 'bg-amber-950/60 text-amber-400 border border-amber-800/60' },
  resolved:     { label: '해제됨', className: 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60' },
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
