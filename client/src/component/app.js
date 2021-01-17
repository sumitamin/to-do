import React, { useEffect } from 'react'
import { Header } from './common/header'

 const AppLayout = (props) => {

    useEffect(() => {
        if (window.location.pathname !== '/login' && window.location.pathname !== '/signup' && !localStorage.getItem('utoken')){
            window.location.href = '/login'
        }else if (window.location.pathname !== '/task' && window.location.pathname !== '/archive-task' && localStorage.getItem('utoken')){
            window.location.href = '/task'
        }
        
    })

    return (
        <div style={{width:'100%', backgroundColor:'#a1e0f7', height:'100%'}} onContextMenu={(e)=> e.preventDefault()}>
            <Header />
            <div className="container main-body" >
                {props.children}
            </div>
        </div>
    )
}

export default AppLayout;