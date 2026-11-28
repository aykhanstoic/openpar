/**
 * The departments of EYP Azerbaijan. Shared by the content schema
 * (src/content.config.ts), the /admin form and the About page, so they
 * cannot drift apart. Entries store the key; the site shows the name in the
 * page's language. The About page lists departments in this order.
 *
 * To add or rename a department, change it here. Renaming a key needs every
 * entry that uses it updated too, or the build stops with an error.
 */
export const DEPARTMENTS = [
  "national-coordination",
  "human-resources",
  "international-relations",
  "public-relations",
  "fundraising-cooperations",
  "members-coordination",
] as const;

export type DepartmentKey = (typeof DEPARTMENTS)[number];

export const DEPARTMENT_NAMES: Record<DepartmentKey, { en: string; az: string }> = {
  "national-coordination": { en: "National coordination", az: "Milli koordinasiya" },
  "human-resources": { en: "Human resources", az: "İnsan resursları" },
  "international-relations": { en: "International relations", az: "Beynəlxalq əlaqələr" },
  "public-relations": { en: "Public relations", az: "İctimaiyyətlə əlaqələr" },
  "fundraising-cooperations": { en: "Fundraising and cooperations", az: "Vəsait cəlbi və əməkdaşlıqlar" },
  "members-coordination": {
    en: "Members coordination and outreach and inclusion",
    az: "Üzvlərin koordinasiyası, təşviqat və inklüzivlik",
  },
};
