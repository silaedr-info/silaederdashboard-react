from vk_api import VkApi
from vk_api.utils import get_random_id

ACCESS_TOKEN = ...  # Подставьте свой
PEER_ID = ...       # Подставьте свой

vkSession = VkApi(token=ACCESS_TOKEN)
vk = vkSession.get_api()