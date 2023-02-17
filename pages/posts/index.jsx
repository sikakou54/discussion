import Router from 'next/router';
import { apiFetchGet } from '../../api/utils';
import Layout from '../../components/layout';
import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Posts.module.css';
import TimeLineView from '../../components/timeLineView';
import PostButton from '../../components/postButton';

export default function Posts({ posts, config }) {

    const [lastEvaluatedKey, setLastEvaluatedKey] = useState(config.lastEvaluatedKey);
    const [items, setItems] = useState(posts);
    const bodyElement = useRef(null);
    const windowElement = useRef(null);
    const [scrollBottomPosition, setScrollBottomPosition] = useState(undefined);

    function onClick(_postId) {
        Router.push({
            pathname: 'discussion',
            query: {
                postId: _postId
            }
        });
    }

    function scroollEventListener() {
        setScrollBottomPosition(bodyElement.current.offsetHeight - (windowElement.current.scrollY + windowElement.current.innerHeight));
    }

    useEffect(() => {

        bodyElement.current = document.body;
        windowElement.current = window;
        windowElement.current.onscroll = scroollEventListener;

        return () => {
            windowElement.current.onscroll = null;
        }

    }, []);

    useEffect(() => {

        if (undefined !== scrollBottomPosition) {

            if (1 >= scrollBottomPosition) {

                if (null !== lastEvaluatedKey) {

                    apiFetchGet('/getDiscussions/' + lastEvaluatedKey.country + '/' + lastEvaluatedKey.createAt + '/' + lastEvaluatedKey.postId, {
                        /**
                        headers: {
                            Authorization: config.jwt
                        } 
                         */
                    }).then((res) => {

                        if (res.result) {

                            let newItems = [];

                            for (let i = 0; i < res.data.Items.length; i++) {

                                if (undefined === items.find((v) => v.postId === res.data.Items[i].postId)) {
                                    newItems.push(res.data.Items[i]);
                                }
                            }

                            if (-1 !== Object.keys(res.data).indexOf('LastEvaluatedKey')) {
                                if (res.data.LastEvaluatedKey.country !== lastEvaluatedKey.country ||
                                    res.data.LastEvaluatedKey.createAt !== lastEvaluatedKey.createAt ||
                                    res.data.LastEvaluatedKey.postId !== lastEvaluatedKey.postId) {
                                    setLastEvaluatedKey(res.data.LastEvaluatedKey);
                                }
                            }

                            setItems((items) => [...items, ...newItems]);
                        }
                    });
                }
            }
        }

    }, [scrollBottomPosition]);

    return (
        <Layout title={'Posts'} >
            <div className={styles.container}>
                <div className={styles.timeLineView}><TimeLineView items={items} onClick={onClick} /></div>
                <div className={styles.post}><PostButton /></div>
            </div>
        </Layout >
    );
}

//SSR
export async function getServerSideProps() {

    let lastEvaluatedKey = null;

    const res = await apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + '/getDiscussions/' + 'jpn' + '/none/none', {
        /**
        headers: {
            Authorization: process.env.jwt
        } 
         */
    });

    if (res.result) {

        if (-1 !== Object.keys(res.data).indexOf('LastEvaluatedKey')) {
            lastEvaluatedKey = res.data.LastEvaluatedKey;
        }

        return {
            props: {
                posts: res.data.Items,
                userId: 'a18c3444-56c3-43c3-a34b-41263fd64d35',
                config: {
                    lastEvaluatedKey
                }
            }
        }

    } else {

        return {
            props: {
                posts: [],
                lastEvaluatedKey: null,
            }
        }
    }
}
