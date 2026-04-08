import type {
  BaseCodeOptions,
  HunkData,
  ExpansionDirections,
} from "@pierre/diffs/react";
import type { FileDiffOptions } from "@pierre/diffs";
import { FileDiff } from "@pierre/diffs";
import "./vercel-themes";

const unsafeCSS = `
  :host {
    display: block;
    max-width: 100%;
    --diffs-bg: var(--background);
    --diffs-fg: var(--foreground);
    --diffs-font-family: var(--font-geist-mono);
    --diffs-tab-size: 2;
    --diffs-gap-inline: 8px;
    --diffs-gap-block: 0px;
    --diffs-addition-color-override: #3dc96a;
    --diffs-deletion-color-override: #f04b78;
    --diffs-bg-addition-override: rgba(61, 201, 106, 0.12);
    --diffs-bg-deletion-override: rgba(240, 75, 120, 0.12);
  }
`;

const theme = {
  dark: "vercel-dark",
  light: "vercel-light",
} as const;

/* ------------------------------------------------------------------ */
/* Custom hunk separator                                               */
/* ------------------------------------------------------------------ */

const separatorClasses = {
  wrapper: "relative",
  root: "absolute top-0 left-0 flex items-center gap-2 pl-[22px] text-[0.75rem] [font-family:var(--diffs-header-font-family,var(--diffs-header-font-fallback))]",
  controls: "inline-flex gap-1",
  button:
    "relative m-0 inline-flex cursor-pointer appearance-none items-center border-0 bg-transparent p-0 text-inherit",
  icon: "[font-family:var(--diffs-font-family,var(--diffs-font-fallback))] text-base leading-none",
  label:
    "ml-3 whitespace-nowrap text-[color:var(--diffs-fg-number)] [font-family:var(--diffs-header-font-family,var(--diffs-header-font-fallback))]",
} as const;

function renderCustomSeparator(
  hunkData: HunkData,
  instance: FileDiff<undefined>,
) {
  const wrapper = document.createElement("div");
  wrapper.className = separatorClasses.wrapper;

  const root = document.createElement("div");
  root.className = separatorClasses.root;

  const controls = document.createElement("div");
  controls.className = separatorClasses.controls;

  if (hunkData.type === "additions") {
    const spacer = document.createElement("span");
    spacer.textContent = " ";
    wrapper.append(spacer, root);
    return wrapper;
  }

  const lineLabel = hunkData.lines === 1 ? "line" : "lines";
  const labelText = `${hunkData.lines} unmodified ${lineLabel}`;

  function createControl(direction: ExpansionDirections) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = separatorClasses.button;
    const icon = document.createElement("span");
    icon.className = separatorClasses.icon;
    icon.textContent =
      direction === "up" ? "↓" : direction === "down" ? "↑" : "↕";
    const label = document.createElement("span");
    label.className = separatorClasses.label;
    label.textContent = labelText;
    button.append(icon, label);
    button.onclick = () => instance.expandHunk(hunkData.hunkIndex, direction);
    return button;
  }

  if (hunkData.expandable?.up && hunkData.expandable?.down) {
    controls.append(createControl("both"));
  } else if (hunkData.expandable?.up) {
    controls.append(createControl("up"));
  } else if (hunkData.expandable?.down) {
    controls.append(createControl("down"));
  }

  // Just the arrow + line count, no "Expand entire hunk" button
  root.append(controls);

  const spacer = document.createElement("span");
  spacer.textContent = " ";
  wrapper.append(spacer, root);
  return wrapper;
}

/* ------------------------------------------------------------------ */
/* Exported option presets                                              */
/* ------------------------------------------------------------------ */

export const defaultDiffOptions: FileDiffOptions<undefined> = {
  theme,
  diffStyle: "unified",
  diffIndicators: "classic",
  overflow: "scroll",
  disableFileHeader: true,
  unsafeCSS,
  hunkSeparators: (
    hunkData: HunkData,
    instance: FileDiff<undefined>,
  ) => renderCustomSeparator(hunkData, instance),
};

export const splitDiffOptions: FileDiffOptions<undefined> = {
  ...defaultDiffOptions,
  diffStyle: "split",
};

export const defaultFileOptions = {
  theme,
  overflow: "scroll",
  disableFileHeader: true,
  unsafeCSS,
} satisfies BaseCodeOptions;
