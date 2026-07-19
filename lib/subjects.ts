// Add a new subject here whenever you start a new course.
// slug = folder name inside /content
// address = the "memory segment" label shown in the nav (keep it short, hex-style)

export type Subject = {
  slug: string;
  name: string;
  address: string;
  description: string;
  color: string; // accent used for this subject's segment
};

export const subjects: Subject[] = [
  {
    slug: "c-programming",
    name: "C Programming",
    address: "0x1000",
    description: "Pointers, memory, syntax — from logic to code.",
    color: "#5fb3a3",
  },
  // Example for later:
  // {
  //   slug: "data-structures",
  //   name: "Data Structures",
  //   address: "0x2000",
  //   description: "Stacks, queues, trees, graphs.",
  //   color: "#c9a876",
  // },
];

export function getSubject(slug: string) {
  return subjects.find((s) => s.slug === slug);
}
