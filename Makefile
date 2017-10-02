#STAGING_URL=https://histologylab-static.stage.ctl.columbia.edu/
#PROD_URL=https://histologylab.ctl.columbia.edu/
#STAGING_BUCKET=histologylab-static.stage.ctl.columbia.edu
#PROD_BUCKET=histologylab.ctl.columbia.edu
INTERMEDIATE_STEPS ?= make $(PUBLIC)/js/all.json

JS_FILES=static/js/search.js static/js/srcswap.js static/js/alphalist.js static/js/bgswap.js \
static/js/scrollshrink.js static/js/scrollspy.js static/js/widgets.js

all: eslint

include *.mk

$(PUBLIC)/js/all.json: $(PUBLIC)/json/all/index.html
	mv $< $@ \
	&& ./checkjson.py
