// Add a new subject here whenever you start a new course.
// slug = folder name inside /content
// address = the "memory segment" label shown in the nav (keep it short, hex-style)
// semester = groups subjects together on the homepage

export type Subject = {
  slug: string;
  name: string;
  code?: string; // official subject code, e.g. CS303
  address: string;
  description: string;
  color: string;
  semester: number;
};

export const subjects: Subject[] = [
  {
    slug: "c-programming",
    name: "C Programming",
    address: "0x1000",
    description: "Pointers, memory, syntax — from logic to code.",
    color: "#5fb3a3",
    semester: 2,
  },
  {
    slug: "energy-environmental-engineering",
    name: "Energy & Environmental Engineering",
    code: "ES301",
    address: "0x3000",
    description: "Energy systems, sustainability, environmental impact.",
    color: "#8fc79f",
    semester: 3,
  },
  {
    slug: "discrete-structure",
    name: "Discrete Structure",
    code: "CS302",
    address: "0x3010",
    description: "Sets, relations, graphs, logic — the math behind CS.",
    color: "#c9a876",
    semester: 3,
  },
  {
    slug: "data-structure",
    name: "Data Structure",
    code: "CS303",
    address: "0x3020",
    description: "Arrays, linked lists, trees, stacks, queues.",
    color: "#5fb3a3",
    semester: 3,
  },
  {
    slug: "digital-systems",
    name: "Digital Systems",
    code: "CS304",
    address: "0x3030",
    description: "Logic gates, boolean algebra, circuit design.",
    color: "#8fc7e0",
    semester: 3,
  },
  {
    slug: "oop-methodology",
    name: "Object Oriented Programming & Methodology",
    code: "CS305",
    address: "0x3040",
    description: "Classes, objects, inheritance, polymorphism.",
    color: "#c99b5f",
    semester: 3,
  },
];

export function getSubject(slug: string) {
  return subjects.find((s) => s.slug === slug);
}

export function getSemesters() {
  const sems = Array.from(new Set(subjects.map((s) => s.semester))).sort(
    (a, b) => a - b
  );
  return sems.map((sem) => ({
    semester: sem,
    subjects: subjects.filter((s) => s.semester === sem),
  }));
}
