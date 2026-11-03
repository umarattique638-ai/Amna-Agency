const paths = {
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 4 4",
  pen: "M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Zm9-13 4 4",
  code: "m8 8-4 4 4 4m8-8 4 4-4 4M14 5l-4 14",
  bolt: "M13 3 5 13h6l-1 8 8-10h-6l1-8Z",
  rocket: "M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2m-1-3 3 3m-3-3 5.5-8.5A8 8 0 0 1 21 3a8 8 0 0 1-3.5 8.5L9 17m-2-2-3-1 3-4h4m2 9 1 3 4-3v-4",
  layers: "M12 3 3 8l9 5 9-5-9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5",
  stack: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Zm0 0v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  play: "M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm5 4.5v7l6-3.5-6-3.5Z",
  check: "m5 12 5 5 9-10",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0",
  building: "M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16m0-10h2a2 2 0 0 1 2 2v8M3 21h18M8 7h4m-4 4h4m-4 4h4",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  phone: "M6.6 3h3l1.5 4.2-2 1.3a11 11 0 0 0 6.4 6.4l1.3-2 4.2 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3Z",
  pin: "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4l3 2",
  shield: "M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Zm-3 9 2 2 4-4",
} as const;

export type LineIconName = keyof typeof paths;

/** Small stroke icon set used by the hero card and chips. */
export function LineIcon({ name, className = "size-5" }: { name: string; className?: string }) {
  const d = paths[name as LineIconName] ?? paths.check;
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}
