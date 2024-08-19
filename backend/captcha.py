import requests
from bs4 import BeautifulSoup
import base64

def fetch_data():
    url = "https://results.vtu.ac.in/DJcbcs24/index.php"
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    try:
        with requests.Session() as session:
            response = session.get(url, headers=headers, verify=False)
            if response.status_code != 200:
                print(f"Failed to fetch page: Status code {response.status_code}")
                return None

            page_1 = BeautifulSoup(response.text, "html.parser")

            img_tag = page_1.find("img", {"alt": "CAPTCHA code"})
            if not img_tag:
                print("CAPTCHA image not found on the page")
                return None
            
            img_url = img_tag.get("src")
            full_img_url = "https://results.vtu.ac.in" + img_url

            token_tag = page_1.find('input', {'name': 'Token'})
            token = token_tag.get("value") if token_tag else None

            img_response = session.get(full_img_url, headers=headers, verify=False)
            if img_response.status_code != 200:
                print(f"Failed to fetch CAPTCHA image: Status code {img_response.status_code}")
                return None
            
            img_data = img_response.content
            base64_data = base64.b64encode(img_data).decode('utf-8')

            cookie_value = response.headers.get('Set-Cookie').split(';')[0]
            response_data = {
                'cookie': cookie_value,
                'token': token,
                'image_data': base64_data
            }
            return response_data

    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None
    except Exception as e:
        print(f"Error: {e}")
        return None