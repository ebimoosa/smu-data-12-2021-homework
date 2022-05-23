from splinter import Browser
from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
from datetime import datetime

class ScrapingHelper():
    def __init__(self):
        pass

    def getData(self):
        # Setup splinter INSTEAD
        executable_path = {'executable_path': ChromeDriverManager().install()}
        browser = Browser('chrome', **executable_path, headless=False)

        url = "https://redplanetscience.com/"
        browser.visit(url)

        html = browser.html
        soup = BeautifulSoup(html)

        news_title = soup.find_all("div", {"class":"content_title"})[0].text
        news_p = soup.find_all("div", {"class":"article_teaser_body"})[0].text

        url = "https://spaceimages-mars.com/"
        browser.visit(url)

        html = browser.html
        soup = BeautifulSoup(html)

        featured_image_url = url + soup.find("img", {"class":"headerimage"})["src"]

        url = "https://galaxyfacts-mars.com/"
        browser.visit(url)

        html = browser.html
        dfs = pd.read_html(html)

        # find table
        df = dfs[1]
        df.columns=["Statistic", "Value"]

        url = "https://marshemispheres.com/"
        browser.visit(url)

        html = browser.html
        soup = BeautifulSoup(html)
        items = soup.find_all("div", {"class": "item"})

        hemi_info = []

        for item in items:
            # parse page 1
            item_link = item.find("div", {"class", "description"}).find("a")
            item_url = url + item_link["href"]
            item_title = item_link.text.strip().strip("Enhanced").strip()
            
            # visit the found URL
            browser.visit(item_url)
            html2 = browser.html
            soup2 = BeautifulSoup(html2)
            hemi_url = url + soup2.find("img", {"class": "wide-image"})["src"]
            
            data = {"title": item_title, "img_url": hemi_url}
            hemi_info.append(data)

        data_scraped = {}
        data_scraped["news_p"] = news_p
        data_scraped["news_title"] = news_title
        data_scraped["featured_image_url"] = featured_image_url
        data_scraped["mars_facts"] = df.to_html(header=False)
        data_scraped["hemispheres"] = hemi_info
        data_scraped["last_updated"] = datetime.now()

        browser.quit()

        return(data_scraped)


