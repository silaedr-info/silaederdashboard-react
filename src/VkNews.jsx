import { CardListItem, CardList } from "./Components"
import { useEffect, useState } from "react"

function News() {
    const posts = [];
    const [pst, setPst] = useState([]);
    var set = false;

    function setpst(json) {
        for (var i = 0; i < 5; i++) {
            posts.push([json[i], json[i+"lnk"]])
        }

        if (!set) {
            setPst(posts);
        }

        return 0;
    }

    /* eslint-disable */
    useEffect(() => {
        fetch("/posts.json").then((resp) => resp.json()).then((data) => {
            setpst(data);
        });
        set = false;
    }, [])
    /* eslint-enable */

    return (
        <div>
            <CardList className="mt-5 mb-10" name="Новости" desc={
                <div>
                    {pst.map((el) => (
                        <CardListItem contents={<a target="_blank" rel="noreferrer" className="underline transition-all ease-in-out duration-500 hover:text-gray-300" href={el[1]}>{el[0]}</a>} />
                    ))}
                    
                </div>
            } />
        </div>
    )
}

export { News }