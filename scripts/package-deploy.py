"""Build a source-only deployment archive; does not send anything or read credentials."""
from pathlib import Path
import json,zipfile
base=Path(__file__).resolve().parent.parent
release=json.loads((base/'public/release.json').read_text())
files=[base/p for p in release['files']]
files += [base/'public/release.json',base/'public/handoff/frontx-showcase-source.zip']
out=Path('/private/tmp/frontx-showcase-deploy.zip')
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as archive:
 for file in files: archive.write(file,file.relative_to(base))
print(json.dumps({'path':str(out),'files':len(files),'bytes':out.stat().st_size,'sourceFingerprint':release['sourceFingerprint']}))
