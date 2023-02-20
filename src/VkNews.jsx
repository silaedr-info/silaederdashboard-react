import { CardListItem, CardList } from "./Components"
import { useEffect } from "react"

function News() {


    return (
        <div>
            <CardList className="mt-5 mb-10 w-full" name="Новости" desc={
                <div>
                    <CardListItem contents={<a target="_blank" rel="noreferrer" className="underline transition-all ease-in-out duration-500 hover:text-prelg" href="https://vk.com/silaedr?w=wall-144869743_3681">В рамках уроков «Разговоры о важном» лицей НИУ ВШЭ пригласил наших 11-классниц Дашу и Наташу рассказать о своем проекте</a>} />
                    <CardListItem contents={<a target="_blank" rel="noreferrer" className="underline transition-all ease-in-out duration-500 hover:text-prelg" href="https://vk.com/silaedr?w=wall-144869743_3680">5 и 6 классы Силаэдра посетили Царь-макет на ВДНХ Экскурсия была увлекательной. Всем очень понравилось.</a>} />
                    <CardListItem contents={<a target="_blank" rel="noreferrer" className="underline transition-all ease-in-out duration-500 hover:text-prelg" href="https://vk.com/silaedr?w=wall-144869743_3678">Мастер-класс руководителя it-отдела компании Встреча с Игорем Котляром, руководителем IT- департамента компании BUDU "Ренессанс Страхование"</a>} />
                    <CardListItem contents={<a target="_blank" rel="noreferrer" className="underline transition-all ease-in-out duration-500 hover:text-prelg" href="https://vk.com/silaedr?w=wall-144869743_3676">5 и 6 классы обсуждают компьютерную безопасность и цифровую гигиену.
                        В этот раз по впечатлениям Никиты и Льва после прочтения книги Кевина Митника «Искусство быть невидимым»</a>} />
                    <CardListItem contents={<a target="_blank" rel="noreferrer" className="underline transition-all ease-in-out duration-500 hover:text-prelg" href="https://vk.com/silaedr?w=wall-144869743_3670">Еще несколько слов о Конференции Силаэдр. Статистика участников и победителей конкурса по годам.</a>} />
                </div>
            } />
        </div>
    )
}

export { News }