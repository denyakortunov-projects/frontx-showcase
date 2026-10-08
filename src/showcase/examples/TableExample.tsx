import { useState } from 'react';
import { Input, Table, TableHeader, TableHead, TableBody, TableRow, TableCell, Badge } from '@gears-frontx/ui-kit';
import '@gears-frontx/ui-kit/theme.css';

const projects = [{name:'Overview', status:'Ready'}, {name:'Directory', status:'Draft'}];
export default function TableExample({ empty = false }: { empty?: boolean }) {
  const [query, setQuery] = useState('');
  const rows = empty ? [] : projects.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  return <div style={{display:'grid', gap:16, width:'100%'}}>
    <Input aria-label="Find a project" placeholder="Find a project" value={query} onChange={e => setQuery(e.target.value)}/>
    <Table label="Projects">
      <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
      <TableBody>{rows.length ? rows.map(p => <TableRow key={p.name}>
        <TableCell>{p.name}</TableCell><TableCell><Badge variant="outline">{p.status}</Badge></TableCell>
      </TableRow>) : <TableRow><TableCell colSpan={2}>No projects match.</TableCell></TableRow>}</TableBody>
    </Table>
  </div>;
}
