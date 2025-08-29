import { useEffect } from 'react';
import Products from '../../Components/Product';
import ReactGA from 'react-ga'

export default function LandingPage(props){

    useEffect(() => {
        ReactGA.pageview(window.location.pathname)
    }, [])

    const products = props.data.map(item => {
        return(
            <Products 
                key={item.id}
                id={item.id}
                title={item.title}
                item={item} 
                stars={item.stars} 
            />
        )
    })

    return(
        <div className='parent'>
            {products}
        </div>
    )
}