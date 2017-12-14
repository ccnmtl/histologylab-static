scrape: $(PY_SENTINAL)
	rm -rf scrape/histology/content/
	cd scrape/histology \
	&& ../../$(VE)/bin/scrapy crawl histology

scrape-replace: $(PY_SENTINAL)
	rm -rf content && cp -r scrape/histology/content .

.PHONY: scrape scrape-replace
