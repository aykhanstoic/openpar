import { getCollection, type CollectionEntry } from "astro:content";
import type { Locale } from "../i18n/ui";
import { DEPARTMENTS, DEPARTMENT_NAMES, type DepartmentKey } from "./department-fields";

export type DepartmentMember = CollectionEntry<"departments">;

export interface Department {
  key: DepartmentKey;
  /** Name in the page's language. */
  name: string;
  /** Anchor id on the About page. */
  id: string;
  members: DepartmentMember[];
}

/**
 * Department members, grouped by department, in the fixed order of
 * DEPARTMENTS; within one, by each member's position number. Departments
 * nobody has been added to are left out.
 */
export async function departmentGroups(locale: Locale): Promise<Department[]> {
  const all = await getCollection("departments");
  return DEPARTMENTS.map((key) => ({
    key,
    name: DEPARTMENT_NAMES[key][locale],
    id: `department-${key}`,
    members: all.filter((m) => m.data.department === key).sort((a, b) => a.data.order - b.data.order),
  })).filter((d) => d.members.length > 0);
}
