import { useId, useState } from 'react';
import { Input } from '@gears-frontx/ui-kit';
import '@gears-frontx/ui-kit/theme.css';

export default function InputExample({ invalid = false }: { invalid?: boolean }) {
  const id = useId();
  const [name, setName] = useState('');
  const hasError = invalid && !name.trim();
  return <div style={{display:'grid', gap:8, width:'100%', maxWidth:360}}>
    <label htmlFor={id}>Project name</label>
    <Input id={id} value={name} onChange={e => setName(e.target.value)}
      aria-invalid={hasError} aria-describedby={`${id}-help`} placeholder="My application" />
    <p id={`${id}-help`} role={hasError ? 'alert' : undefined}>
      {hasError ? 'Enter a project name.' : 'A name your team will recognize.'}
    </p>
  </div>;
}
