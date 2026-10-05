"""Source-only handoff of the existing compositions. No application scaffold."""
from pathlib import Path
import json,hashlib,zipfile,shutil
base=Path(__file__).resolve().parent.parent
names=['index.ts','EventCalendar.tsx','CalendarGrid.tsx','CalendarToolbar.tsx','CalendarYear.tsx','EventEditor.tsx','appearance.tsx','model.ts','types.ts','calendar.css','examples/ControlledCalendar.tsx']
files={'calendar/'+n:base/'src/calendar'/n for n in names}
files.update({'date-picker/'+n:base/'src/date-picker'/n for n in ['ResponsiveDatePicker.tsx','date-picker.css']})
files.update({n:base/'public/handoff'/n for n in ['EVENT-CALENDAR.md','DATE-PICKER.md']})
content={name:p.read_bytes() for name,p in files.items()}
deps=json.loads((base/'package.json').read_text())['dependencies']
content['dependencies.json']=(json.dumps({k:v for k,v in deps.items() if k!='recharts'},indent=2)+'\n').encode()
manifest={name:hashlib.sha256(data).hexdigest() for name,data in content.items()}
content['manifest.json']=(json.dumps(manifest,indent=2)+'\n').encode()
out=base/'public/handoff/frontx-calendar-components.zip'
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as archive:
 for name,data in content.items():
  info=zipfile.ZipInfo(name,date_time=(2026,10,5,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;archive.writestr(info,data)
shutil.copyfile(base/'src/calendar/examples/ControlledCalendar.tsx',base/'public/handoff/ControlledCalendar.tsx')
print(json.dumps({'files':len(content),'archiveSha256':hashlib.sha256(out.read_bytes()).hexdigest()}))
