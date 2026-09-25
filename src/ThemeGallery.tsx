import { Button } from "@gears-frontx/ui-kit/button";
import { Card } from "@gears-frontx/ui-kit/card";
import { Check, Copy, Palette } from "lucide-react";
import { useState } from "react";
import { themes, paletteFor, type ThemeName } from "./themes";
export function Themes({
  current,
  dark,
  select,
}: {
  current: string;
  dark: boolean;
  select: (id: ThemeName) => void;
}) {
  const [notice, setNotice] = useState("");
  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setNotice(`Copied ${value}`);
    } catch {
      setNotice("Select the color code to copy it.");
    }
  }
  return (
    <>
      <div className="detail-heading">
        <div>
          <h1>Color & themes</h1>
          <p>Five palettes. Shared components. Your product’s character.</p>
        </div>
        <Palette size={26} />
      </div>
      <div className="palette-grid">
        {themes.map((t) => (
          <Card
            key={t.id}
            className={`palette-card ${current === t.id ? "selected" : ""}`}
          >
            <div className="palette-strip" aria-hidden="true">
              {paletteFor(t.id, dark).map((c) => (
                <span key={c} style={{ background: c }} />
              ))}
            </div>
            <div className="palette-content">
              <div className="palette-title">
                <h2>{t.name}</h2>
                {current === t.id && (
                  <span>
                    <Check size={14} /> Active
                  </span>
                )}
              </div>
              <p>{t.description}</p>
              <div className="color-tokens">
                {paletteFor(t.id, dark).map((c, i) => (
                  <Button
                    key={c}
                    variant="ghost"
                    className="color-token"
                    aria-label={`Copy ${t.name} color ${i + 1}: ${c}`}
                    onClick={() => copy(c)}
                  >
                    <i style={{ background: c }} />
                    <span>
                      <small>Series {i + 1}</small>
                      <code>{c}</code>
                    </span>
                    <Copy size={12} />
                  </Button>
                ))}
              </div>
              <Button
                variant={current === t.id ? "secondary" : "outline"}
                onClick={() => select(t.id)}
                icon={current === t.id ? <Check size={15} /> : undefined}
              >
                {current === t.id ? "Selected theme" : `Apply ${t.name}`}
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <div className="color-guidance">
        <section>
          <h2>Keep color meaningful</h2>
          <p>
            Assign a color to a series once and keep it across widgets, filters
            and views. Charts also use labels, legends and a Data view; color is
            never the only way to identify a value.
          </p>
        </section>
        <section>
          <h2>Series are not statuses</h2>
          <p>
            Chart palettes identify categories. Success, warning and error
            states use separate semantic tokens, so “series 4” never implies
            “approved”.
          </p>
        </section>
        <section>
          <h2>Light and dark</h2>
          <p>
            {dark
              ? "Dark palettes are shown above."
              : "Light palettes are shown above."}{" "}
            The header switch previews the alternate mode. Terminal stays dark;
            every other theme supports both.
          </p>
        </section>
      </div>
      <div className="theme-contract">
        <div>
          <h2>Token handoff</h2>
          <p>
            Chart colors resolve from <code>--viz-1</code> through{" "}
            <code>--viz-6</code>. Surface, text, focus and status tokens stay
            independent.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() =>
            copy(
              JSON.stringify(
                {
                  theme: current,
                  mode: dark ? "dark" : "light",
                  series: paletteFor(current, dark),
                },
                null,
                2,
              ),
            )
          }
          icon={<Copy size={16} />}
        >
          Copy palette JSON
        </Button>
      </div>
      <p className="palette-notice" role="status">
        {notice}
      </p>
    </>
  );
}
