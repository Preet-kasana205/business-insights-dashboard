import random
import requests
from bs4 import BeautifulSoup

CATEGORIES = ["Restaurant", "Electronics", "Retail", "Healthcare", "Education",
              "Automotive", "Real Estate", "Salon & Spa", "Grocery", "IT Services"]

CITIES = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad",
          "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow"]

SOURCES = ["JustDial-Mock", "Sulekha-Mock", "IndiaMART-Mock", "WikipediaScrape"]

BUSINESS_SUFFIXES = ["Traders", "Enterprises", "Solutions", "Store", "Services",
                      "Corner", "Hub", "House", "Mart", "Associates"]


def scrape_wikipedia_companies(url: str, limit: int = 50):
    headers = {"User-Agent": "Mozilla/5.0 (Educational Scraping Project)"}
    response = requests.get(url, headers=headers, timeout=10)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")
    table = soup.find("table", {"class": "wikitable"})

    results = []
    if table:
        rows = table.find_all("tr")[1:]
        for row in rows:
            cells = row.find_all(["td", "th"])
            if len(cells) > 3:
                name = cells[2].get_text(strip=True)
                city = cells[3].get_text(strip=True)
                if name:
                    results.append({"business_name": name, "city": city})
            if len(results) >= limit:
                break

    return results


def generate_mock_listings(count: int, scraped: list[dict] = None):
    listings = []
    scraped = scraped or []

    for i in range(count):
        if i < len(scraped):
            name = scraped[i]["business_name"]
            city = scraped[i]["city"] if scraped[i]["city"] in CITIES else random.choice(CITIES)
            source = "WikipediaScrape"
        else:
            name = f"{random.choice(CITIES)} {random.choice(BUSINESS_SUFFIXES)} {i}"
            city = random.choice(CITIES)
            source = random.choice(SOURCES)

        listings.append({
            "business_name": name,
            "category": random.choice(CATEGORIES),
            "city": city,
            "address": f"{random.randint(1, 200)}, {random.choice(['MG Road', 'Main Street', 'Park Avenue', 'Station Road'])}",
            "phone": f"9{random.randint(100000000, 999999999)}",
            "source": source,
        })

    return listings