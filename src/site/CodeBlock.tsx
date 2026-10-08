import './code-block.css';
import { useEffect, useState } from 'react';
import { Button } from '@gears-frontx/ui-kit/button';
import { Check, Copy } from 'lucide-react';

/** Documentation composition. The command stays readable without JavaScript. */
export default function CodeBlock({ code, label, kind = 'commands' }: { code: string; label: string; kind?: 'commands' | 'source' }) {
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  useEffect(() => setReady(true), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus('copied');
    } catch {
      setStatus('error');
    }
  }
  return (
    <div className="command-block">
      <div className="command-toolbar">
        <span>{label}</span>
        <Button variant="ghost" size="sm" disabled={!ready} onClick={copy}
          aria-label={`Copy ${label}`} icon={status === 'copied' ? <Check size={14}/> : <Copy size={14}/>}>
          {status === 'copied' ? 'Copied' : 'Copy'}
        </Button>
      </div>
      <pre tabIndex={0} aria-label={`${label} ${kind}`}><code>{code}</code></pre>
      <span className={status === 'error' ? 'copy-feedback' : 'visually-hidden'} role="status">
        {status === 'copied' ? `${label} copied.` : status === 'error' ? `Could not copy. Select and copy the ${kind} directly.` : ''}
      </span>
    </div>
  );
}
