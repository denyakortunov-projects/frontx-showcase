from pathlib import Path
import json,hashlib,zipfile,shutil
base=Path(__file__).resolve().parents[2]
release=json.loads((base/'public/release.json').read_text());runtime=json.loads((base/'qa/date-picker-refresh/source-manifest.json').read_text());checks=[]
def check(n,v):
 checks.append({'name':n,'passed':bool(v)});assert v,n
with zipfile.ZipFile(base/'public/handoff/frontx-showcase-source.zip') as z:
 check('exact full archive allowlist',set(z.namelist())=={'frontx-showcase/'+n for n in release['files']})
 for n,h in release['files'].items():check('source parity '+n,hashlib.sha256(z.read('frontx-showcase/'+n)).hexdigest()==h==hashlib.sha256((base/n).read_bytes()).hexdigest())
check('tested runtime unchanged',all(hashlib.sha256((base/n).read_bytes()).hexdigest()==h for n,h in runtime['files'].items()))
check('source archive hash',hashlib.sha256((base/'public/handoff/frontx-showcase-source.zip').read_bytes()).hexdigest()==release['archiveSha256'])
with zipfile.ZipFile(base/'public/handoff/frontx-calendar-components.zip') as z:
 m=json.loads(z.read('manifest.json'));check('component archive exact contents',set(z.namelist())==set(m)|{'manifest.json'})
 for n,h in m.items():check('component hash '+n,hashlib.sha256(z.read(n)).hexdigest()==h)
 for n in ['date-picker/DateCalendar.tsx','date-picker/date-preferences.ts']:check('shared dependency bundled '+n,n in z.namelist())
check('no private paths',not any(any(p in Path(n).parts for p in ['.git','.env','.secrets','node_modules']) for n in release['files']))
shutil.copytree(base/'public/handoff',base/'dist/handoff',dirs_exist_ok=True);shutil.copyfile(base/'public/release.json',base/'dist/release.json')
(base/'qa/date-picker-refresh/archive-report.json').write_text(json.dumps({'sourceFingerprint':release['sourceFingerprint'],'runtimeFingerprint':runtime['runtimeFingerprint'],'checks':checks},indent=2)+'\n')
print(json.dumps({'passed':len(checks),'sourceFingerprint':release['sourceFingerprint']}))
