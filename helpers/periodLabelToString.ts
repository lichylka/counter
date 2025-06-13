import { monthLabels } from "./monthsLabels";

export function periodLabelToString(period_label: string) {
  const labelParts = period_label.split("/");
  const month = monthLabels[Number(labelParts[0]) - 1];
  return month + "/" + labelParts[1];
}
