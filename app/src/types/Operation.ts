export type Operation = {
  log_id: string,
  timestamp: Date,
  system: string,
  event_type: string
  details: {
    zone: string,
    duration_minutes: number,
    flow_rate_lpm: number,
  },
}