"""Package only the allowlisted demo source and generate a public fingerprint."""
from pathlib import Path
import hashlib,json,zipfile
base=Path(__file__).resolve().parent.parent
files=[base/p for p in ['package.json','package-lock.json','tsconfig.json','vite.config.ts','index.html','README.md','.gitignore']]
files += sorted((base/'src').rglob('*'))
files += [base/'public/favicon.svg',base/'public/handoff/README.md',base/'public/handoff/CONTRACT.md']
files=[p for p in files if p.is_file()]
manifest={str(p.relative_to(base)):hashlib.sha256(p.read_bytes()).hexdigest() for p in files}
fingerprint=hashlib.sha256(json.dumps(manifest,sort_keys=True).encode()).hexdigest()
out=base/'public/handoff/frontx-showcase-source.zip'
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as z:
 for p in files:
  info=zipfile.ZipInfo('frontx-showcase/'+str(p.relative_to(base)),date_time=(2026,9,25,0,0,0))
  info.compress_type=zipfile.ZIP_DEFLATED
  z.writestr(info,p.read_bytes())
(base/'public/release.json').write_text(json.dumps({'name':'frontx-showcase','version':'0.1.0','sourceFingerprint':fingerprint,'files':manifest,'archiveSha256':hashlib.sha256(out.read_bytes()).hexdigest()},indent=2)+'\n')
print(json.dumps({'sourceFingerprint':fingerprint,'files':len(files),'archiveBytes':out.stat().st_size}))
