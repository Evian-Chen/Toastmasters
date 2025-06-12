from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import json

chrome_browser = webdriver.Chrome()

chrome_browser.get("https://www.nr-ok.com/page.php?page_type=club_list&ver=tw")

# 等一下讓網頁載入
time.sleep(2)

elements = chrome_browser.find_element(By.CLASS_NAME, "c-content-box")
table = elements.find_element(By.TAG_NAME, "table")
clubs = table.find_elements(By.TAG_NAME, "tr")

valid_maps_url = "https://www.google.com/maps/place"
tw = "zh-TW"

all_data = []

count = 0
for club in clubs:
    club_data = club.text.split("\n")
    print(club_data)
    for idx, a in enumerate(club.find_elements(By.TAG_NAME, "a")):
        href = a.get_attribute("href")
        if valid_maps_url in href and tw in href:
            address_url = href
            break
    data = {
        "name": club_data[0],
        "type": club_data[1].split()[0],
        "clubId": club_data[1].split()[2][4:],
        "date": club_data[2],
        "time": club_data[3],
        "address": club_data[-1],
        "addressGoogleMaps": href,
        "fee": "",
        "president": "",
        "phoneNumber": ""
    }
    print(data)
    all_data.append(data)
    print("==============")
    count += 1
    if count == 10: break
    
with open("testData.json", "w", encoding="utf-8") as f:
    json.dump(all_data, f, indent=4, ensure_ascii=False)

## Close down the website
chrome_browser.close()
