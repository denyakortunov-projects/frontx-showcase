"""Package only the allowlisted demo source and generate a public fingerprint."""
from pathlib import Path
import hashlib,json,zipfile
base=Path(__file__).resolve().parent.parent
files=[base/p for p in ['package.json','package-lock.json','tsconfig.json','vite.config.ts','astro.config.mjs','index.html','README.md','.gitignore']]
files += sorted((base/'src').rglob('*'))
files += sorted((base/'docs'/'calendar').glob('*.md'))
files += [base/p for p in ['qa/verify-event-calendar.mjs','qa/verify-calendar-accessibility.mjs','qa/event-calendar/model.test.ts','qa/event-calendar/async.html','qa/event-calendar/async.tsx','qa/event-calendar/verify-async.mjs','qa/event-calendar/REPORT.md']]
files += [base/p for p in ['qa/verify-calendar-refresh.mjs','qa/calendar-refresh/model.test.ts','qa/calendar-refresh/verify-async.mjs','qa/calendar-refresh/verify-accessibility.mjs','qa/calendar-refresh/REPORT.md','qa/calendar-refresh/verify-final-layout.mjs']]
files += [base/p for p in ['qa/calendar-polish/REPORT.md','qa/calendar-polish/verify.mjs']]
files += [base/p for p in ['src/showcase/README.md','scripts/package-calendar-components.py','qa/component-handoff/REPORT.md','qa/component-handoff/verify.mjs','qa/component-handoff/verify-segments.mjs','qa/component-handoff/consumer.html','qa/component-handoff/consumer.tsx','public/handoff/EVENT-CALENDAR.md','public/handoff/DATE-PICKER.md','public/handoff/ControlledCalendar.tsx','public/handoff/frontx-calendar-components.zip']]
files += sorted((base/'qa/date-picker-refresh').glob('*.md'))
files += sorted((base/'qa/date-picker-refresh').glob('*.mjs'))
files += sorted((base/'qa/date-picker-refresh').glob('*.py'))
files += [base/'qa/date-picker-refresh/consumer.tsx',base/'qa/date-picker-refresh/consumer.html',base/'qa/date-picker-refresh/model.test.ts']
files += [base/'public/favicon.svg',base/'public/handoff/README.md',base/'public/handoff/CONTRACT.md']
files += [base/'public/handoff/CHART-AXES.md',base/'scripts/package-handoff.py']
files += sorted((base/'qa/axis-rules').glob('*.ts'))
files += sorted((base/'qa/axis-rules').glob('*.mjs'))
files += sorted((base/'qa/axis-rules').glob('*.md'))
# Astro build inputs and the licensed static template example, not build output.
files += sorted((base/'scripts').glob('*.mjs'))
files += [base/'scripts/template-example-adapter.js', base/'scripts/package-deploy.py']
for directory in ['public/template-source', 'public/examples/shell-mfe']:
 files += sorted((base/directory).rglob('*'))
for directory in ['astro-site', 'quickstart-2026-10-06', 'template-explorer-2026-10-06', 'first-change-2026-10-06']:
 files += sorted((base/'qa'/directory).glob('*.md'))
files = [p for p in files if not p.is_symlink() and not any(part.startswith('.') for part in p.relative_to(base).parts if part != '.gitignore')]
files=list(dict.fromkeys(p for p in files if p.is_file()))
manifest={str(p.relative_to(base)):hashlib.sha256(p.read_bytes()).hexdigest() for p in files}
fingerprint=hashlib.sha256(json.dumps(manifest,sort_keys=True).encode()).hexdigest()
out=base/'public/handoff/frontx-showcase-source.zip'
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as z:
 for p in files:
  info=zipfile.ZipInfo('frontx-showcase/'+str(p.relative_to(base)),date_time=(2026,9,25,0,0,0))
  info.compress_type=zipfile.ZIP_DEFLATED
  z.writestr(info,p.read_bytes())
(base/'public/release.json').write_text(json.dumps({'name':'frontx-showcase','version':json.loads((base/'package.json').read_text())['version'],'sourceFingerprint':fingerprint,'files':manifest,'archiveSha256':hashlib.sha256(out.read_bytes()).hexdigest()},indent=2)+'\n')
print(json.dumps({'sourceFingerprint':fingerprint,'files':len(files),'archiveBytes':out.stat().st_size}))
