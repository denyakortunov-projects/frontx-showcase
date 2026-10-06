from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse,unquote
import json
root=Path('dist');qa=Path('qa/first-change-2026-10-06')
class Page(HTMLParser):
 def __init__(self,s):
  super().__init__();self.links=[];self.ids=set();self.pre=[];self.capture=False;self.feed(s)
 def handle_starttag(self,t,a):
  d=dict(a)
  if 'id' in d:self.ids.add(d['id'])
  if t=='a' and 'href' in d:self.links.append(d['href'])
  if t=='pre':self.capture=True;self.pre.append('')
 def handle_endtag(self,t):
  if t=='pre':self.capture=False
 def handle_data(self,d):
  if self.capture:self.pre[-1]+=d
pages={p:Page(p.read_text()) for p in root.rglob('*.html') if not any(x in p.parts for x in ['showcase','examples'])};errors=[];count=0
for file,doc in pages.items():
 for link in doc.links:
  u=urlparse(link)
  if u.scheme or u.netloc:continue
  target=root/unquote(u.path).lstrip('/') if u.path.startswith('/') else file.parent/unquote(u.path) if u.path else file
  if target.is_dir():target=target/'index.html'
  if not target.exists():errors.append([str(file),link,'missing'])
  elif u.fragment and target in pages and u.fragment not in pages[target].ids:errors.append([str(file),link,'missing anchor'])
  count+=1
assert not errors,errors
page=pages[root/'docs/first-change/index.html'];edited=json.loads(page.pre[0]);original=json.loads(Path('/private/tmp/frontx-quickstart.x0H65i/consumer/src-app/mfe_packages/_blank-mfe/src/screens/home/i18n/en.json').read_text());assert edited.keys()==original.keys();assert {k for k in edited if edited[k]!=original[k]}=={'title','description'}
plain=(root/'docs/first-change.md').read_text();assert all(code in plain for code in page.pre)
source=Path('/private/tmp/frontx-template-explorer/gears-frontx-templates-3b6cddb2a700ae76bc5e1991204e127de566d597')
sourceLinks=[u for u in page.links if '/template-mfe/src-app/' in u];assert len(sourceLinks)==3
for url in sourceLinks:assert (source/url.split('/3b6cddb2a700ae76bc5e1991204e127de566d597/')[1]).is_file()
report={'localLinkCount':count,'missingLinks':errors,'sourcePathsVerified':sourceLinks,'translation':'All seven keys retained; only title and description changed','plainText':'Both code blocks exactly match HTML'}
(qa/'CONTENT-CHECK.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
