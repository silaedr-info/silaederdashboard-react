import { CardListItem, CardList } from './Components';
import { useEffect, useState } from 'react';

function News() {
    const posts = [];
    const [pst, setPst] = useState([]);
    var set = false;

    function setpst(json) {
        for (var i = 0; i < 5; i++) {
            posts.push([json[i], json[i + 'lnk']]);
        }

        if (!set) {
            setPst(posts);
        }

        return 0;
    }

    /* eslint-disable */
    useEffect(() => {
        fetch('/posts.json')
            .then((resp) => resp.json())
            .then((data) => {
                setpst(data);
            });
        set = false;
    }, []);
    /* eslint-enable */

    return (
        <div>
            <CardList
                className="mb-10 mt-5"
                name="Новости"
                desc={
                    <div>
                        {pst.map((el) => (
                            <CardListItem
                                key={el.key}
                                contents={
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-100 transition-all duration-500 ease-in-out hover:text-white"
                                        href={el[1]}
                                    >
                                        {el[0]}
                                    </a>
                                }
                            />
                        ))}
                    </div>
                }
            />
        </div>
    );
}

export { News };
