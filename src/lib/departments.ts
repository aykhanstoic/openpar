import { getCollection, type CollectionEntry } from "astro:content";
import type { Locale } from "../i18n/ui";

export type DepartmentMember = CollectionEntry<"departments">;

export interface Department {
  /** Name in the page's language. */
  name: string;
  /** Anchor-safe id, from the English name. */
  id: string;
  members: DepartmentMember[];
}

/**
 * Department members, grouped by department. Members belong together when
 * their English department name matches (ignoring case and extra spaces).
 * Departments are listed alphabetically in the page's language; within one,
 * by each member's position number.
 */
export async function departmentGroups(locale: Locale): Promise<Department[]> {
  const all = await getCollection("departments");
  const groups = new Map<string, DepartmentMember[]>();
  for (const m of all) {
    const key = m.data.department.trim().replace(/\s+/g, " ").toLowerCase();
    groups.set(key, [...(groups.get(key) ?? []), m]);
  }

  const collator = new Intl.Collator(locale === "az" ? "az" : "en");
  return [...groups.entries()]
    .map(([key, members]) => {
      members.sort((a, b) => a.data.order - b.data.order);
      const en = members[0].data.department.trim();
      /* The first member with an Azerbaijani name supplies it for the group. */
      const az = members.find((m) => m.data.departmentAz?.trim())?.data.departmentAz?.trim();
      return {
        name: locale === "az" && az ? az : en,
        id: `department-${key.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
        members,
      };
    })
    .sort((a, b) => collator.compare(a.name, b.name));
}
