import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x grid min-h-svh place-content-center gap-8 text-center">
      <p className="label text-accent">Error 404</p>
      <h1 className="display text-[clamp(3rem,10vw,9rem)]">Off the map.</h1>
      <Link href="/" className="label underline underline-offset-8 hover:text-accent">
        Back home
      </Link>
    </section>
  );
}
