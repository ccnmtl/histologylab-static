import scrapy
from scrapy.linkextractors import LinkExtractor


class HistologySpider(scrapy.Spider):
    name = "histology"
    extractor = LinkExtractor(allow_domains='pathologylab.ccnmtl.columbia.edu')

    def start_requests(self):
        urls = [
            'http://pathologylab.ccnmtl.columbia.edu/'
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        print("The response is here: %s" % response.url)
        links = self.extractor.extract_links(response)

        for link in links:
            yield response.follow(link)
