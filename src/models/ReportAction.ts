export default interface ReportAction {
  action: ActionValue;
  reason?: string;
}

export const enum ActionValue {
  CLOSED,
  UPDATED_SEVERITY,
  REASIGNED,
  CHANGED_DUE_DATE,
  UPDATED_OTHER,
}
