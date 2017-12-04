# -*- coding: utf-8 -*-
import scrapy


class HistologySpider(scrapy.Spider):
    name = 'histology'
    allowed_domains = ['pathologylab.ccnmtl.columbia.edu']
    start_urls = ['http://pathologylab.ccnmtl.columbia.edu/']

    def parse(self, response):
        pass
