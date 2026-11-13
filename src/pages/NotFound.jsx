import { Header } from '../Components/Header'
import './NotFound.css'

export function NotFound({cart}){
    return (
        <>

        <Header cart={cart}/>


        <div className="bold-text">
            <h1>Error 404</h1>
            <p>Page Not Found</p>
            
        </div>
        
        </>
    )
}