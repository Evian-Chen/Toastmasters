"""
這個檔案使用 python + selenium 爬取全台 Toastmasters 的分會資訊 
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import json

chrome_browser = webdriver.Chrome()

chrome_browser.get("https://www.nr-ok.com/page.php?page_type=club_list&ver=tw")

time.sleep(2)

# 確認地圖導航網址是對的
valid_maps_url = "https://www.google.com/maps/place"
tw = "zh-TW"

cities = [
    "台北市", "新北市", "基隆市", "桃園市", "新竹市", "新竹縣",
    "苗栗縣", "台中市", "彰化縣", "南投縣", "雲林縣", "嘉義市", "嘉義縣",
    "台南市", "高雄市", "屏東縣", "宜蘭縣", "花蓮縣", "花蓮市", "台東縣",
    "澎湖縣", "金門縣", "連江縣"
]

all_langs = [
    "英語", "華語", "台語", "日語", "客語"
]

elements = chrome_browser.find_element(By.CLASS_NAME, "c-content-box")
table = elements.find_element(By.TAG_NAME, "table")
clubs = table.find_elements(By.TAG_NAME, "tr")

# 確認地圖導航網址是對的
valid_maps_url = "https://www.google.com/maps/place"
tw = "zh-TW"

all_data = []
count = 0
for club in clubs:
    tds = club.find_elements(By.TAG_NAME, "td")
    club_data = tds[0].text.strip().split("\n")
    print(club_data)
    
    for idx, a in enumerate(tds[0].find_elements(By.TAG_NAME, "a")):
        href = a.get_attribute("href")
        if valid_maps_url in href and tw in href:
            address_url = href
            break
    
    if len(tds) >= 2:
        html = tds[1].get_attribute("innerHTML")
        all_lang = []
        if "、" in html:
            lang = html.strip().split()[-1].split("、")
            lang[0] = lang[0][1:]
            lang[-1] = lang[-1][:-1]
        else:
            lang = html.split()[-1]
            
        if not lang:  # lang == []
            for l in all_langs:
                if l in club_data[0]: lang.append(l)
    
    addr = club_data[-1]
    if addr[:3] in cities:
        city = addr[:3] 
    elif club_data[-3][:3] in cities:
        city = club_data[-3][:3]
    else:
        city = ""
    
    fee_line = ''
    for item in club_data:
        if '場地費' in item:
            fee_line = item
            break
        
    data = {
        "name": club_data[0],
        "clubId": club_data[1].split()[2][7:],
        "type": club_data[1].split()[0],
        "meetingDate": club_data[2],
        "meetingTime": club_data[3],
        "address": club_data[-1],
        "addressGoogleMaps": href,
        "language": lang,
        "fee": fee_line,
        "president": "",
        "phoneNumber": "",
        "city": city
    }
    print(data["name"])
    all_data.append(data)
    # count += 1
    # if count == 10: exit()
    
# 寫入本地 json
with open("testData.json", "w", encoding="utf-8") as f:
    json.dump(all_data, f, indent=4, ensure_ascii=False)

# Close down the website
chrome_browser.close()
