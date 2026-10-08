import { Badge } from '@gears-frontx/ui-kit';
import '@gears-frontx/ui-kit/theme.css';

export default function BadgesExample() {
  return <div style={{display:'flex', flexWrap:'wrap', gap:10}}>
    <Badge>Published</Badge>
    <Badge variant="secondary">In review</Badge>
    <Badge variant="outline">Draft</Badge>
    <Badge variant="destructive">Action needed</Badge>
  </div>;
}
