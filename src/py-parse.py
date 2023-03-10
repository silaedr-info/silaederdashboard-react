from vk_api import VkApi
from vk_api.utils import get_random_id
from secrets import API_KEY
import json, time, os

ACCESS_TOKEN = API_KEY

vkSession = VkApi(token=ACCESS_TOKEN)
api = vkSession.get_api()

while (True):
    posts = api.wall.get(
        domain='silaedr',
        count=5
    )

    link = "https://vk.com/silaedr?w="

    postsDict = {}
    for i in range(0, 5):
        if '\n' in posts['items'][i]['text'][:116]:
            postsDict[i] = posts['items'][i]['text'][:posts['items'][i]['text'].find("\n")]
        else:
            postsDict[i] = posts['items'][i]['text'][:116]+"..."

        owner_id = posts['items'][i]['owner_id']
        media_id = posts['items'][i]['id']

        postsDict.update({str(i)+"lnk":link+f"wall{owner_id}_{media_id}"})



    with open("public/posts.json", "w") as f:
        f.write("")
        json.dump(postsDict, f, ensure_ascii=False)
    
    time.sleep(3600)
