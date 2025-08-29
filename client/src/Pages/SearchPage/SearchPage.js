import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './searchpage.css'

export default function SearchPage(){
    const [params] = useSearchParams();
    const query = params.get("q") || "";
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState('Searching');
    const navigate = useNavigate();


    useEffect(() => {
        if(!loading){
            setSearching('Searching');
            return;
        }

        const id = setInterval(() => {
            setSearching((searching) => searching.endsWith('...') ? setSearching('Searching') : searching + '.');
        }, 350)

        return () => clearInterval(id);

    }, [loading]);

    useEffect(() => {
        if (!query) return;
        (async () => {
            setLoading(true);
            await axios.post("http://localhost:8080/search-result", {query}).then((res) => {
                setData(res.data);
            }).catch((err) => {
                throw err
            }).finally(() => {
                setLoading(false);
            })
        })();
    }, [query]);

    function handleClick(url) {
        navigate(`/product${url}`);
    }

    return(
        <div className='search-container'>
            {loading ? <><h3 className='searching-text'>{searching}</h3></> :   
                data && data.map(item => (
                    <>
                        <div className='search-row' onClick = {() => handleClick(JSON.parse(item)['url'])}>
                            <div className='search-items'>
                                <div className='image-container'>
                                    <img className='search-image' src={JSON.parse(item)['thumbnail']}/>
                                </div>
                                <li 
                                key = {JSON.parse(item)['id']}
                                className = 'search-name'
                                >
                                    {JSON.parse(item)['name']}
                                </li>
                            </div>
                        </div>
                    </>
                ))
            }
        </div> 
    )
};