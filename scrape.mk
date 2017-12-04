scrape: $(PY_SENTINAL)
	cd scrape/histology \
	&& ../../$(VE)/bin/scrapy crawl histology
