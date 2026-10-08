import { useState } from 'react';
import { Button } from '@gears-frontx/ui-kit';
import '@gears-frontx/ui-kit/theme.css';

export default function ButtonsExample({ disabled = false }: { disabled?: boolean }) {
  const [saved, setSaved] = useState(false);
  return <div style={{display:'grid', gap:16}}>
    <div style={{display:'flex', gap:10}}>
      <Button disabled={disabled} onClick={() => setSaved(true)}>Save changes</Button>
      <Button variant="outline" disabled={disabled} onClick={() => setSaved(false)}>Reset</Button>
    </div>
    <p role="status">{saved ? 'Changes saved in this demo.' : 'No changes saved.'}</p>
  </div>;
}
