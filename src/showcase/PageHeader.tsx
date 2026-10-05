import type { ReactNode } from "react";
import "./page-header.css";

/** Catalogue page structure; component interiors retain their own typography. */
export function PageHeader({ title, description, actions }: {
  title: string; description?: ReactNode; actions?: ReactNode;
}) {
  return <header className="showcase-page-header">
    <div className="showcase-page-heading"><h1>{title}</h1>{description && <p>{description}</p>}</div>
    {actions && <div className="showcase-page-actions">{actions}</div>}
  </header>;
}
