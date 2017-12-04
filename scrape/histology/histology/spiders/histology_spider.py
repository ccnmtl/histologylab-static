import scrapy


class HistologySpider(scrapy.Spider):
    name = "histology"

    def start_requests(self):
        urls = [
            'http://pathologylab.ccnmtl.columbia.edu/'
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        # enter what you want this thing to do in here
        print("The response is here: %s" % response.url)
