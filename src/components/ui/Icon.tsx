import type { CSSProperties } from "react";
import type { IconName } from "./icon-registry";

export type { IconName };

/**
 * Site icon. References a symbol in the shared /icons.svg sprite (generated at build time from
 * ./icon-registry.ts), so each icon costs ~80 bytes of HTML and the artwork is downloaded once
 * and cached. Works in Server and Client Components with no icon code in page JavaScript.
 */
export default function Icon({ name, className, style }: { name: IconName; className?: string; style?: CSSProperties }) {
  return (
    <span className={`anticon ${className ?? ""}`} style={style} aria-hidden="true">
      <svg width="1em" height="1em" fill="currentColor" focusable="false">
        <use href={`/icons.svg#i-${name}`} />
      </svg>
    </span>
  );
}
