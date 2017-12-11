scrape: $(PY_SENTINAL)
	rm -rf scrape/histology/content/
	cd scrape/histology \
	&& ../../$(VE)/bin/scrapy crawl histology
