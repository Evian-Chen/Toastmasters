import json

    
with open("testData.json", "r", encoding="utf-8") as f:
    data = json.load(f)
    print(data)