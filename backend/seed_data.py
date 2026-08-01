import requests
from app.scraper import scrape_wikipedia_companies, generate_mock_listings

API_URL = "http://127.0.0.1:8000/listings/"
WIKI_URL = "https://en.wikipedia.org/wiki/List_of_largest_companies_in_India"

print("Scraping real data...")
scraped = scrape_wikipedia_companies(WIKI_URL, limit=50)
print(f"Scraped {len(scraped)} real listings")

print("Generating full dataset (550 total)...")
all_listings = generate_mock_listings(550, scraped=scraped)

print("Inserting into database via API...")
success_count = 0
for listing in all_listings:
    response = requests.post(API_URL, json=listing)
    if response.status_code == 200:
        success_count += 1
    else:
        print("Failed:", listing["business_name"], response.text)

print(f"Done. Successfully inserted {success_count}/{len(all_listings)} listings.")