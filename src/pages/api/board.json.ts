import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { jsonResponse } from "../../i18n/pages";
import { departmentGroups } from "../../lib/departments";
import { DEPARTMENT_NAMES } from "../../lib/department-fields";

/**
 * GET /api/board.json — executive and supervisory boards, and department members.
 * Emails here are role-based addresses already published on the site;
 * never add a volunteer's personal address to the collection.
 */
export const GET: APIRoute = async ({ site }) => {
  const origin = site?.origin ?? "https://eyp.az";

  const members = (await getCollection("board"))
    .sort((a, b) => a.data.order - b.data.order)
    .map(({ id, data }) => ({
      id,
      name: data.name,
      role: data.role,
      roleAz: data.roleAz ?? null,
      body: data.group,
      email: data.email ?? null,
      term: data.term ?? null,
      year: data.year ?? null,
      linkedin: data.linkedin ?? null,
    }));

  /* Department members, grouped by department in the site's fixed order. */
  const departments = (await departmentGroups("en")).map((d) => ({
    key: d.key,
    department: DEPARTMENT_NAMES[d.key].en,
    departmentAz: DEPARTMENT_NAMES[d.key].az,
    members: d.members.map(({ id, data }) => ({
      id,
      name: data.name,
      role: data.role,
      roleAz: data.roleAz ?? null,
      email: data.email ?? null,
      linkedin: data.linkedin ?? null,
    })),
  }));

  return jsonResponse({
    site: origin,
    executive: members.filter((m) => m.body === "executive"),
    supervisory: members.filter((m) => m.body === "supervisory"),
    departments,
  });
};
