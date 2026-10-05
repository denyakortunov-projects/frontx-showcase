from pathlib import Path
import hashlib,json,zipfile,shutil
base=Path(__file__).resolve().parents[2]
release=json.loads((base/'public/release.json').read_text())
archive=base/'public/handoff/frontx-showcase-source.zip'
checks=[]
def check(name, value):
 checks.append({'name':name,'passed':bool(value)})
 assert value, name
with zipfile.ZipFile(archive) as z:
 names=z.namelist()
 check('only manifest files archived',set(names)=={'frontx-showcase/'+f for f in release['files']})
 for f,digest in release['files'].items():
  check('matching '+f,hashlib.sha256(z.read('frontx-showcase/'+f)).hexdigest()==digest==hashlib.sha256((base/f).read_bytes()).hexdigest())
 check('no private configuration or repository state',not any(any(part in {'.git','.env','.secrets','node_modules','.claude','.codex'} for part in Path(f).parts) for f in names))
 check('calendar implementation included',all('frontx-showcase/'+f in names for f in ['src/calendar/EventCalendar.tsx','src/calendar/EventEditor.tsx','src/calendar/CalendarGrid.tsx','src/calendar/calendar.css','src/calendar/types.ts','src/calendar/model.ts','src/CalendarShowcase.tsx']))
check('archive hash matches',hashlib.sha256(archive.read_bytes()).hexdigest()==release['archiveSha256'])
check('source fingerprint matches',hashlib.sha256(json.dumps(release['files'],sort_keys=True).encode()).hexdigest()==release['sourceFingerprint'])
runtime=json.loads((base/'qa/calendar-polish/source-manifest.json').read_text())
check('tested runtime files unchanged',all(hashlib.sha256((base/f).read_bytes()).hexdigest()==h for f,h in runtime['files'].items()))
# The production JS/CSS build is unchanged; refresh only static local download assets.
shutil.copytree(base/'public/handoff',base/'dist/handoff',dirs_exist_ok=True)
shutil.copyfile(base/'public/release.json',base/'dist/release.json')
report={'sourceFingerprint':release['sourceFingerprint'],'runtimeFingerprint':runtime['runtimeFingerprint'],'archiveSha256':release['archiveSha256'],'checks':checks,'publication':'none; local preview only'}
(base/'qa/calendar-polish/archive-report.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'passed':len(checks),'files':len(release['files']),'sourceFingerprint':release['sourceFingerprint']}))
