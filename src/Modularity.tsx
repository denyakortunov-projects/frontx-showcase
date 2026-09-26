import { useState, type CSSProperties } from "react";
import { Button } from "@gears-frontx/ui-kit/button";
import { NativeSelect } from "@gears-frontx/ui-kit/native-select";
import { Plus, Check, Trash2, Copy, Grid2X2, Code2 } from "lucide-react";
import {
  WidgetFrame,
  WidgetDensitySwitch,
  widgetHeight,
  type WidgetDensity,
} from "./WidgetFrame";
import { WidgetChart, widgets, type WidgetKind } from "./widgets";
import "./modularity.css";
type Module = { id: number; kind: WidgetKind; width: number; rows: number };
const presets: Record<string, Module[]> = {
  balanced: [
    { id: 1, kind: "area", width: 2, rows: 3 },
    { id: 2, kind: "donut", width: 2, rows: 3 },
    { id: 3, kind: "bar", width: 1, rows: 2 },
    { id: 4, kind: "radar", width: 1, rows: 2 },
    { id: 5, kind: "line", width: 2, rows: 2 },
  ],
  focus: [
    { id: 1, kind: "area", width: 3, rows: 3 },
    { id: 2, kind: "radial", width: 1, rows: 3 },
    { id: 3, kind: "bar", width: 4, rows: 2 },
  ],
  compact: [
    { id: 1, kind: "donut", width: 1, rows: 2 },
    { id: 2, kind: "radar", width: 1, rows: 2 },
    { id: 3, kind: "radial", width: 1, rows: 2 },
    { id: 4, kind: "pie", width: 1, rows: 2 },
  ],
};
export function Modularity({
  query,
  update,
}: {
  query: URLSearchParams;
  update: (v: Record<string, string>) => void;
}) {
  let modules: Module[] = presets.balanced;
  try {
    const parsed = JSON.parse(query.get("modules") || "null");
    if (
      Array.isArray(parsed) &&
      parsed.length > 0 &&
      parsed.length <= 8 &&
      new Set(parsed.map((m) => m.id)).size === parsed.length &&
      parsed.every(
        (m) =>
          Number.isInteger(m.id) &&
          widgets.some((w) => w.id === m.kind) &&
          [1, 2, 3, 4].includes(m.width) &&
          [2, 3, 4].includes(m.rows),
      )
    )
      modules = parsed;
  } catch {}
  const selected =
    modules.find((m) => m.id === Number(query.get("selected"))) || modules[0];
  const density: WidgetDensity =
    query.get("density") === "compact" ? "compact" : "standard";
  const [notice, setNotice] = useState("");
  const change = (patch: Partial<Module>) =>
    update({
      modules: JSON.stringify(
        modules.map((m) => (m.id === selected.id ? { ...m, ...patch } : m)),
      ),
      selected: String(selected.id),
    });
  const recipe = {
    schemaVersion: "0.1-demo",
    density,
    grid: {
      columns: 12,
      gap: density === "compact" ? 10 : 16,
      rowHeight: density === "compact" ? 94 : 144,
    },
    widgets: modules.map((m) => ({
      kind: m.kind,
      columns: m.width * 3,
      rowSpan: m.rows,
      height: widgetHeight(m.rows * 144 + (m.rows - 1) * 16, density),
    })),
  };
  async function copy() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(recipe, null, 2));
      setNotice("Layout JSON copied");
    } catch {
      setNotice("Select and copy the JSON below.");
    }
  }
  return (
    <>
      <div className="detail-heading">
        <div>
          <h1>Modularity</h1>
          <p>One block, two, three or four. Height is a separate choice.</p>
        </div>
        <Grid2X2 size={26} />
      </div>
      <div className="module-presets">
        <span>Start with</span>
        {Object.keys(presets).map((name) => (
          <Button
            key={name}
            variant="outline"
            size="sm"
            onClick={() =>
              update({ modules: JSON.stringify(presets[name]), selected: "1" })
            }
          >
            {name[0].toUpperCase() + name.slice(1)}
          </Button>
        ))}
        <WidgetDensitySwitch
          value={density}
          onChange={(value) => update({ density: value })}
        />
      </div>
      <div className="module-controls">
        <label>
          <span>Selected widget</span>
          <NativeSelect
            aria-label="Module chart"
            value={selected.kind}
            onChange={(e) => change({ kind: e.target.value as WidgetKind })}
          >
            {widgets.map((w) => (
              <option key={w.id} value={w.id}>
                {w.title}
              </option>
            ))}
          </NativeSelect>
        </label>
        <fieldset>
          <legend>Width in blocks</legend>
          <div className="module-segments">
            {[1, 2, 3, 4].map((n) => (
              <Button
                key={n}
                size="sm"
                variant={selected.width === n ? "default" : "outline"}
                aria-pressed={selected.width === n}
                aria-label={`${n} ${n === 1 ? "block" : "blocks"} wide`}
                onClick={() => change({ width: n })}
              >
                {n}
              </Button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Height in rows</legend>
          <div className="module-segments">
            {[2, 3, 4].map((n) => (
              <Button
                key={n}
                size="sm"
                variant={selected.rows === n ? "default" : "outline"}
                aria-pressed={selected.rows === n}
                aria-label={`${n} rows tall`}
                onClick={() => change({ rows: n })}
              >
                {n}
              </Button>
            ))}
          </div>
        </fieldset>
        <div className="module-actions">
          <Button
            variant="outline"
            icon={<Plus size={15} />}
            disabled={modules.length >= 8}
            title={modules.length >= 8 ? "Maximum 8 demo widgets" : undefined}
            onClick={() => {
              const id = Math.max(...modules.map((m) => m.id)) + 1;
              update({
                modules: JSON.stringify([
                  ...modules,
                  { id, kind: "bar", width: 2, rows: 2 },
                ]),
                selected: String(id),
              });
            }}
          >
            Add widget
          </Button>
          <Button
            variant="ghost"
            aria-label="Remove selected widget"
            disabled={modules.length === 1}
            title={
              modules.length === 1 ? "Keep at least one widget" : undefined
            }
            icon={<Trash2 size={16} />}
            onClick={() =>
              update({
                modules: JSON.stringify(
                  modules.filter((m) => m.id !== selected.id),
                ),
                selected: "",
              })
            }
          />
        </div>
      </div>
      <div className="module-scale" aria-hidden="true">
        {[1, 2, 3, 4].map((n) => (
          <span key={n}>
            Block {n}
            <small>3 columns</small>
          </span>
        ))}
      </div>
      <div className={`module-canvas module-canvas--${density}`}>
        {modules.map((m, i) => (
          <section
            key={m.id}
            className={`module-cell ${selected.id === m.id ? "is-selected" : ""}`}
            style={
              {
                "--module-columns": m.width * 3,
                "--module-rows": m.rows,
              } as CSSProperties
            }
          >
            <WidgetFrame
              density={density}
              height={m.rows * 144 + (m.rows - 1) * 16}
              title={widgets.find((w) => w.id === m.kind)!.title}
              action={
                <Button
                  size="sm"
                  variant="ghost"
                  className="module-select"
                  aria-label={`Select widget ${i + 1}`}
                  aria-pressed={selected.id === m.id}
                  onClick={() => update({ selected: String(m.id) })}
                  icon={selected.id === m.id ? <Check size={14} /> : undefined}
                >
                  {m.width} × {m.rows}
                </Button>
              }
            >
              <WidgetChart kind={m.kind} />
            </WidgetFrame>
          </section>
        ))}
      </div>
      <div className="module-explanation">
        <p>
          <strong>Width:</strong> 1 block = 3 of 12 columns.{" "}
          <strong>Height:</strong> rows are {density === "compact" ? 94 : 144}
          px, with {density === "compact" ? 10 : 16}px gaps. Widget order stays
          stable; smaller screens stack cards without changing the saved
          configuration.
        </p>
        <span>Demo layout · Select a card with its size button</span>
      </div>
      <details className="recipe-details">
        <summary>
          <Code2 size={17} /> Layout configuration
        </summary>
        <Button
          variant="outline"
          size="sm"
          icon={<Copy size={14} />}
          onClick={copy}
        >
          Copy layout JSON
        </Button>
        <pre>{JSON.stringify(recipe, null, 2)}</pre>
        <p>
          Proposed showcase contract for developers and AI. A drag-and-resize
          editor is a separate integration.
        </p>
      </details>
      <p role="status" className="palette-notice">
        {notice}
      </p>
    </>
  );
}
