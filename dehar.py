# script used for crawling pages
# use the network tab in chrome devtools, clear it before loading the game, and when all assets have finished being requested, press the Export HAR button (looks like download)
# then, use this script like so (this is an example): python3 dehar.py example.com.har outputdirectory/

import os, sys, subprocess

banned = [] #[".php", ".asp"]

infile = sys.argv[1]
outdir = sys.argv[2]

input = open(infile, "r").read().splitlines()

lis2 = []
for x in input:
	if ('"url"' in x) and not(any(i in x for i in banned)):
		lis2.append(x.split('"')[3].split("?")[0])

lis2 = list(dict.fromkeys(lis2))

open("./wgettemp.txt", "w").write("\n".join(lis2))
subprocess.call("wget -x -i ./wgettemp.txt -P %s" % outdir, shell=True)
os.remove("./wgettemp.txt")