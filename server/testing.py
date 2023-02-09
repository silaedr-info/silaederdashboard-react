import requests

print(requests.post("http://localhost:5000/api/check",
                    headers={'Referer': 'https://silaeder.ru'},
                    data={'user': 'max1', 'password': 'rjlbnm2010'}
                    ).text)

for i in range(20):
    print(requests.get("http://localhost:5000").text)
