/**
 * Allowed values for session fields. Shared by the content schema
 * (src/content.config.ts) and the /admin form, so the two cannot drift apart.
 */
export const SESSION_STATUSES = ["announced", "call-open", "call-closed", "completed"] as const;
export const SESSION_TYPES = ["nsc", "rsc", "members-weekend", "international", "training", "other"] as const;
export const SESSION_LANGS = ["both", "en", "az"] as const;

export const STATUS_LABELS: Record<(typeof SESSION_STATUSES)[number], string> = {
  announced: "Announced",
  "call-open": "Call open",
  "call-closed": "Call closed",
  completed: "Completed",
};

export const TYPE_LABELS: Record<(typeof SESSION_TYPES)[number], string> = {
  nsc: "National Selection Conference",
  rsc: "Regional Selection Conference",
  "members-weekend": "Members' Weekend",
  international: "International Session",
  training: "Training",
  other: "Other",
};

export const LANG_LABELS: Record<(typeof SESSION_LANGS)[number], string> = {
  both: "Both languages",
  en: "English pages only",
  az: "Azerbaijani pages only",
};
