from bs4 import BeautifulSoup
from flask import request
import requests

def fetch_results():
    data = request.get_json()
    usn = data.get('usn')
    captcha = data.get('captcha')
    cookie = data.get('cookie')
    token = data.get('token')
    print(cookie)
    print(token)
    print(usn)
    print(captcha)
    headers={
        'Cookie':cookie,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.1.2222.33 Safari/537.36",
        "Accept-Encoding": "*",
        "Connection": "keep-alive"
    }

    payload = {
        "Token": token,
        "lns": usn,
        "captchacode": captcha
    }

    result_url = "https://results.vtu.ac.in/DJcbcs24/resultpage.php"
    result_response = requests.post(result_url,headers=headers, data=payload, verify=False)

    soup = BeautifulSoup(result_response.text, 'html.parser')

    table = soup.find('div', {'class': 'divTableBody'})

    name=soup.find("td",{"style":"padding-left:15px"})
    student=name.text.split(":")[1]
    results = {}

    for row in table.find_all('div', {'class': 'divTableRow'})[1:]:
        cells = row.find_all('div', {'class': 'divTableCell'})
        if len(cells) >= 5:
            subject_name = cells[1].get_text(strip=True)
            internal_marks = int(cells[2].get_text(strip=True))
            external_marks = int(cells[3].get_text(strip=True))
            total = int(cells[4].get_text(strip=True))
            results[subject_name] = {
                'Internal Marks': internal_marks,
                'External Marks': external_marks,
                'Total': total
            }
    return results,student.strip()
