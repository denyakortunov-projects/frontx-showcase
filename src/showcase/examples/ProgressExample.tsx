import { Progress } from '@gears-frontx/ui-kit';
import '@gears-frontx/ui-kit/theme.css';

export default function ProgressExample({ complete = false }: { complete?: boolean }) {
  const value = complete ? 100 : 72;
  return <div style={{display:'grid', gap:10, width:'100%', maxWidth:360}}>
    <span>Workspace setup · {value}%</span>
    <Progress value={value} aria-label="Workspace setup" />
  </div>;
}
