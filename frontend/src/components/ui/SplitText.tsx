import { Fragment, type ElementType, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type SplitBy = "chars" | "words";

type SplitTextProps<T extends ElementType> = {
  as?: T;
  children: string;
  by?: SplitBy;
  /** Wrap each unit in an overflow-hidden mask (for slide-up reveals). */
  mask?: boolean;
  charClassName?: string;
} & Omit<ComponentPropsWithoutRef<T>, "children">;

/**
 * Server-renderable text splitter. Renders accessible text (aria-label on the
 * parent, split spans aria-hidden) so screen readers read the sentence once.
 * Animate the `.split-char` / `.split-word` nodes with GSAP.
 */
export function SplitText<T extends ElementType = "span">({
  as,
  children,
  by = "chars",
  mask = false,
  className,
  charClassName,
  ...rest
}: SplitTextProps<T>) {
  const Tag = (as ?? "span") as ElementType;
  const words = children.split(" ");

  return (
    <Tag className={className} aria-label={children} {...rest}>
      {words.map((word, wi) => {
        const content =
          by === "words" ? (
            <span className={cn("split-word split-char", charClassName)}>{word}</span>
          ) : (
            <span className="split-word">
              {Array.from(word).map((ch, ci) => (
                <span key={ci} className={cn("split-char", charClassName)}>
                  {ch}
                </span>
              ))}
            </span>
          );

        return (
          <Fragment key={wi}>
            <span aria-hidden="true" className={mask ? "split-mask" : "inline-block"}>
              {content}
            </span>
            {wi < words.length - 1 && <span aria-hidden="true"> </span>}
          </Fragment>
        );
      })}
    </Tag>
  );
}
