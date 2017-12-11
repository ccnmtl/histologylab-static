import scrapy
from scrapy.linkextractors import LinkExtractor
import re
import os
import unicodedata


def slugify(value):
    """
    Convert to ASCII. Convert spaces to hyphens.
    Remove characters that aren't alphanumerics, underscores, or hyphens.
    Convert to lowercase. Also strip leading and trailing whitespace.

    Borrowed from Django:
    https://github.com/django/django/blob/master/django/utils/text.py#L403
    """
    value = str(value)
    value = unicodedata.normalize('NFKD', value)\
        .encode('ascii', 'ignore').decode('ascii')
    value = re.sub(r'[^\w\s-]', '', value).strip().lower()
    return re.sub(r'[-\s]+', '-', value)


class HistologySpider(scrapy.Spider):
    name = "histology"
    extractor = LinkExtractor(allow_domains='pathologylab.ccnmtl.columbia.edu')
    match_lab_topic = re.compile('/lab\d{2}/$')
    match_lab_activity = re.compile('/lab\d{2}/\w*.html$')
    match_hist_technique = re.compile('/histological_techniques/\w*.html$')

    def start_requests(self):
        urls = [
            'http://pathologylab.ccnmtl.columbia.edu/'
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        if (self.match_lab_topic.search(response.url)):
            self.render_lab_topic(response)
        elif (self.match_lab_activity.search(response.url)):
            self.render_lab_activity(response)
        elif (self.match_hist_technique.search(response.url)):
            self.render_hist_technique(response)
        else:
            self.render_page(response)

        links = self.extractor.extract_links(response)
        for link in links:
            yield response.follow(link)

    def render_lab_topic(self, response):
        title = slugify(response.css('.entrytitle::text')
                        .extract_first()) + '.md'
        path = 'content/lab_topic/'
        if not os.path.exists(path):
            os.makedirs(path)

        filename = os.path.join(path, title)
        with open(filename, 'w') as f:
            f.write(title)

    def render_lab_activity(self, response):
        title = slugify(response.css('.entrytitle::text')
                        .extract_first()) + '.md'
        path = 'content/lab_activity/'
        if not os.path.exists(path):
            os.makedirs(path)

        filename = os.path.join(path, title)
        with open(filename, 'w') as f:
            f.write(title)

    def render_hist_technique(self, response):
        title = slugify(response.css('.entrytitle::text')
                        .extract_first()) + '.md'
        path = 'content/histological_technique/'
        if not os.path.exists(path):
            os.makedirs(path)

        filename = os.path.join(path, title)
        with open(filename, 'w') as f:
            f.write(title)

    def render_page(self, response):
        title = slugify(response.css('.pagetitle::text')
                        .extract_first()) + '.md'
        path = 'content/'
        if not os.path.exists(path):
            os.makedirs(path)

        filename = os.path.join(path, title)
        with open(filename, 'w') as f:
            f.write(title)
