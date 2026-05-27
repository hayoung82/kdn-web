export const equipmentList = [
  { id: 'TR-001', name: '주변압기 1호', type: '변압기', location: '154kV 변전소 A', status: 'fault', voltage: '154kV', capacity: '100MVA', lastCheck: '2026-05-20', temp: 92, load: 105 },
  { id: 'TR-002', name: '주변압기 2호', type: '변압기', location: '154kV 변전소 A', status: 'normal', voltage: '154kV', capacity: '100MVA', lastCheck: '2026-05-22', temp: 65, load: 78 },
  { id: 'CB-001', name: '차단기 1번', type: '차단기', location: '154kV 변전소 A', status: 'normal', voltage: '154kV', capacity: '2000A', lastCheck: '2026-05-21', temp: 42, load: 60 },
  { id: 'CB-002', name: '차단기 2번', type: '차단기', location: '22.9kV 배전반 B', status: 'warning', voltage: '22.9kV', capacity: '1200A', lastCheck: '2026-05-18', temp: 78, load: 88 },
  { id: 'GEN-001', name: '발전기 1호', type: '발전기', location: '발전소 1동', status: 'normal', voltage: '11kV', capacity: '50MW', lastCheck: '2026-05-24', temp: 55, load: 72 },
  { id: 'GEN-002', name: '발전기 2호', type: '발전기', location: '발전소 1동', status: 'maintenance', voltage: '11kV', capacity: '50MW', lastCheck: '2026-05-25', temp: 0, load: 0 },
  { id: 'DP-001', name: '배전반 A-1', type: '배전반', location: '22.9kV 배전반 A', status: 'normal', voltage: '22.9kV', capacity: '800A', lastCheck: '2026-05-23', temp: 38, load: 55 },
  { id: 'DP-002', name: '배전반 B-1', type: '배전반', location: '22.9kV 배전반 B', status: 'warning', voltage: '22.9kV', capacity: '800A', lastCheck: '2026-05-19', temp: 82, load: 92 },
  { id: 'MOT-001', name: '펌프 모터 1', type: '모터', location: '냉각설비동', status: 'normal', voltage: '3.3kV', capacity: '200kW', lastCheck: '2026-05-22', temp: 48, load: 65 },
  { id: 'MOT-002', name: '펌프 모터 2', type: '모터', location: '냉각설비동', status: 'fault', voltage: '3.3kV', capacity: '200kW', lastCheck: '2026-05-20', temp: 98, load: 0 },
  { id: 'CAB-001', name: '154kV 케이블 1', type: '케이블', location: '지중 구간 A', status: 'normal', voltage: '154kV', capacity: '500A', lastCheck: '2026-05-15', temp: 45, load: 70 },
  { id: 'CAB-002', name: '22.9kV 케이블 2', type: '케이블', location: '지중 구간 B', status: 'normal', voltage: '22.9kV', capacity: '300A', lastCheck: '2026-05-16', temp: 40, load: 58 },
];

export const alerts = [
  { id: 1, equipmentId: 'TR-001', equipmentName: '주변압기 1호', type: '과부하', severity: 'critical', message: '부하율 105% 초과 - 즉시 조치 필요', timestamp: '2026-05-26 14:32:15', status: 'active', location: '154kV 변전소 A' },
  { id: 2, equipmentId: 'MOT-002', equipmentName: '펌프 모터 2', type: '온도 이상', severity: 'critical', message: '권선 온도 98°C 초과 - 운전 정지됨', timestamp: '2026-05-26 13:15:42', status: 'active', location: '냉각설비동' },
  { id: 3, equipmentId: 'CB-002', equipmentName: '차단기 2번', type: '절연저항 저하', severity: 'warning', message: '절연저항 기준치 80% 수준으로 저하', timestamp: '2026-05-26 11:08:30', status: 'active', location: '22.9kV 배전반 B' },
  { id: 4, equipmentId: 'DP-002', equipmentName: '배전반 B-1', type: '과부하', severity: 'warning', message: '부하율 92% 경보 발생', timestamp: '2026-05-26 10:45:22', status: 'active', location: '22.9kV 배전반 B' },
  { id: 5, equipmentId: 'GEN-002', equipmentName: '발전기 2호', type: '정기점검', severity: 'info', message: '정기 예방점검 진행 중 (예정 완료: 05/28)', timestamp: '2026-05-25 09:00:00', status: 'acknowledged', location: '발전소 1동' },
  { id: 6, equipmentId: 'TR-002', equipmentName: '주변압기 2호', type: '온도 경보', severity: 'warning', message: '오일 온도 경보 발생 (65°C)', timestamp: '2026-05-25 22:14:07', status: 'resolved', location: '154kV 변전소 A' },
  { id: 7, equipmentId: 'CB-001', equipmentName: '차단기 1번', type: '동작 횟수', severity: 'info', message: '누적 동작 횟수 5,000회 도달 - 점검 권고', timestamp: '2026-05-24 16:30:00', status: 'acknowledged', location: '154kV 변전소 A' },
  { id: 8, equipmentId: 'CAB-001', equipmentName: '154kV 케이블 1', type: '부분방전', severity: 'warning', message: '부분방전 감지 - 정밀진단 필요', timestamp: '2026-05-24 08:22:55', status: 'resolved', location: '지중 구간 A' },
];

export const hourlyLoadData = [
  { time: '00:00', 부하율: 62, 기준선: 80 },
  { time: '02:00', 부하율: 55, 기준선: 80 },
  { time: '04:00', 부하율: 50, 기준선: 80 },
  { time: '06:00', 부하율: 63, 기준선: 80 },
  { time: '08:00', 부하율: 78, 기준선: 80 },
  { time: '10:00', 부하율: 88, 기준선: 80 },
  { time: '12:00', 부하율: 92, 기준선: 80 },
  { time: '14:00', 부하율: 95, 기준선: 80 },
  { time: '16:00', 부하율: 90, 기준선: 80 },
  { time: '18:00', 부하율: 85, 기준선: 80 },
  { time: '20:00', 부하율: 76, 기준선: 80 },
  { time: '22:00', 부하율: 68, 기준선: 80 },
];

export const alertTrendData = [
  { date: '05/20', 긴급: 1, 경고: 3, 정보: 2 },
  { date: '05/21', 긴급: 0, 경고: 2, 정보: 4 },
  { date: '05/22', 긴급: 2, 경고: 1, 정보: 1 },
  { date: '05/23', 긴급: 1, 경고: 4, 정보: 3 },
  { date: '05/24', 긴급: 0, 경고: 3, 정보: 2 },
  { date: '05/25', 긴급: 1, 경고: 2, 정보: 3 },
  { date: '05/26', 긴급: 2, 경고: 2, 정보: 1 },
];
