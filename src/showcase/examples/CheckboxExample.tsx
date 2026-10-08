import { useId, useState } from 'react';
import { Checkbox } from '@gears-frontx/ui-kit';
import '@gears-frontx/ui-kit/theme.css';

export default function CheckboxExample({ disabled = false }: { disabled?: boolean }) {
  const id = useId();
  const [checked, setChecked] = useState(true);
  return <div style={{display:'grid', gap:12}}>
    <div style={{display:'flex', alignItems:'center', gap:8}}>
      <Checkbox id={id} checked={checked} disabled={disabled}
        onCheckedChange={value => setChecked(value === true)} />
      <label htmlFor={id}>Include a summary</label>
    </div>
    <p role="status">{checked ? 'Summary included.' : 'Summary excluded.'}</p>
  </div>;
}
