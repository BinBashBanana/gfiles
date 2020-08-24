import os, glob

# Set strings
indir = "gstore"
h5gamesin = "html5games/"
gbagamesin = "gba/"
nesgamesin = "nes/"
snesgamesin = "snes/"
romdir = "roms/"
outdir = "./gfiles/"
outindex = "list.html"
urlprefix = "https://cdn.jsdelivr.net/gh/BinBashBanana/gstore/"
floc = "f.html"
fcon = '''<!DOCTYPE html><html><head><title>Flash Game</title><link rel="stylesheet" href="../css/style.css"><script>function loadswf(){var a,b,c; a="%s"; b=window.location.hash.substring(1)+".swf"; c=document.body; c.innerHTML='<object class="gembed" data="'+a+b+'" type="application/x-shockwave-flash"><param name="wmode" value="direct" /></object>';};</script></head><body onload="loadswf();" class="gbody"></body></html>'''
index = '''<!DOCTYPE html>\n<html>\n<head>\n<title>Games List</title>\n<link rel="stylesheet" href="./css/style.css">\n</head>\n<body class="fbody">\n<div class="container">\n<div class="box">\n<input type="text" id="gsearchbar" onkeyup="gsearch()" autocomplete="off" placeholder="Search" />\n<div id="glist">\n%s\n</div>\n</div>\n</div>\n<script>function gsearch(){var e,t,n,a;for(e=document.getElementById("gsearchbar").value.toUpperCase(),t=document.getElementById("glist"),a=0;a<t.querySelectorAll("a[href]").length;a++)(n=t.getElementsByTagName("a")[a]).innerHTML.toUpperCase().indexOf(e)>-1?n.style.display="block":n.style.display="none"}</script>\n</body>\n</html>'''
hind = '''<h2>HTML5 Games</h2>'''
find = '''\n<h2>Flash Games</h2>'''
gind = '''\n<h2>Gameboy Advance</h2>'''
nind = '''\n<h2>Nintendo</h2>'''
sind = '''\n<h2>Super Nintendo</h2>'''
ffile = '''<!DOCTYPE html><html><head><link rel="stylesheet" href="../css/style.css"></head><body class="gbody"><embed class="gembed" src="%s"></body></html>'''
alist = '''<a class="glink" href="%s">%s</a>'''

# Make HTML5 lists
lh1 = next(os.walk(outdir + h5gamesin))[1]
lh2 = []
lh3 = [hind]

for x in lh1:
	lh2.append(x.capitalize())

# Generate HTML code for HTML5 list
ite = 0

for x in lh1:
	lh3.append(alist % (outdir + h5gamesin + x, lh2[ite]))
	ite +=1

# Make GBA lists
lg1a = glob.glob(outdir + gbagamesin + romdir + "*.gba")
lg1b = []
for x in lg1a:
	lg1b.append(os.path.basename(x))
lg1c = []
for x in lg1b:
	lg1c.append(os.path.splitext(x)[0])
lg2 = []
lg3 = [gind, alist % (outdir + gbagamesin, "Upload ROM")]

for x in lg1c:
	lg2.append(x.capitalize())

# Generate HTML code for GBA list
ite = 0

for x in lg1c:
	lg3.append(alist % (outdir + gbagamesin + "#" + x, lg2[ite]))
	ite +=1

# Make NES lists
ln1a = glob.glob(outdir + nesgamesin + romdir + "*.nes")
ln1b = []
for x in ln1a:
	ln1b.append(os.path.basename(x))
ln1c = []
for x in ln1b:
	ln1c.append(os.path.splitext(x)[0])
ln2 = []
ln3 = [nind, alist % (outdir + nesgamesin, "Upload ROM")]

for x in ln1c:
	ln2.append(x.capitalize())

# Generate HTML code for NES list
ite = 0

for x in ln1c:
	ln3.append(alist % (outdir + nesgamesin + "#" + x, ln2[ite]))
	ite +=1

# Make SNES lists
ls1a = glob.glob(outdir + snesgamesin + romdir + "*.smc")
ls1b = []
for x in ls1a:
	ls1b.append(os.path.basename(x))
ls1c = []
for x in ls1b:
	ls1c.append(os.path.splitext(x)[0])
ls2 = []
ls3 = [sind, alist % (outdir + snesgamesin, "Upload ROM")]

for x in ls1c:
	ls2.append(x.capitalize())

# Generate HTML code for SNES list
ite = 0

for x in ls1c:
	ls3.append(alist % (outdir + snesgamesin + "#" + x, ls2[ite]))
	ite +=1

# Make flash lists
li1a = glob.glob(indir+"/*")
li1b = []
for x in li1a:
	li1b.append(os.path.basename(x))
li1c = []
for x in li1b:
	li1c.append(os.path.splitext(x)[0])
li2 = []
li3 = [find]

for x in li1c:
	li2.append(x.capitalize())

# Generate HTML code for flash list
ite = 0

for x in li1c:
	li3.append(alist % (outdir + floc + "#" + x, li2[ite]))
	ite +=1

# Make flash dynamic html file
with open(outdir + floc, "w") as file:
	file.write(fcon % urlprefix)

# Write to list file
def st(x):
	return "\n".join(x)

lcon = index % (st(lh3) + st(lg3) + st(ln3) + st(ls3) + st(li3))

with open(outindex, "w") as file:
	file.write(lcon)

for x in lcon.splitlines():
	print(x)

print("\nDone!")