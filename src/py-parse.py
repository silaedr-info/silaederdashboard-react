from vk_api import VkApi
from vk_api.utils import get_random_id
from secrets import API_KEY
import json

ACCESS_TOKEN = API_KEY

vkSession = VkApi(token=ACCESS_TOKEN)
api = vkSession.get_api()

posts = api.wall.get(
    domain='silaedr',
)

postsDict = {}
for i in range(0, 5):
    if (posts['items'][i]['text'][0:116].count("\n") > 0):
        postsDict.update({str(i): posts['items'][i]['text'][0:posts['items'][i]['text'].find("\n")]})
    else:
        postsDict.update({str(i): posts['items'][i]['text'][0:116]+"..."})

with open("public/posts.json", "w") as f:
    json.dump(postsDict, f, ensure_ascii=False)