import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';

// I didn't actually end up getting this to appear on the screen. Wasn't sure where to input component, between index.js, app.jsx, and content.jsx
// tutorial here: https://www.youtube.com/watch?v=zwCaIrZ64M4&ab_channel=JuliaPottinger

const Scroll = (showBelow) => {
    
    const useStyles = makeStyles((theme) => ({
        toTop: {
            zIndex: 2,
            position: 'fixed',
            bottom: '2vh',
            backgroundColor: '#DCDCDC',
            color: 'black',
            "&:hover, &.Mui-focusVisible": {
                transition: '0.3s',
                color: '#397BA6',
                backgroundColor: '#DCDCDC'
            },
            [theme.breakpoints.up('xs')]: {
                right: '5%',
                backgroundColor: 'rgb(220,220,220,0.7)',
            },
            [theme.breakpoints.up('lg')]: {
                right: '6.5%',
            },
        }
    })
    )

    const [show, setShow] = useState(showBelow ? false : true)

    const handleScroll = () => {
        if (window.pageYOffset > showBelow) {
            if (!show) setShow(true)
        } else {
            if (show) setShow(false)
        }
    }

    useEffect(() => {
        if(showBelow){
            window.addEventListener('scroll', handleScroll)
            return () => window.removeEventListener('scroll', handleScroll)
        }
    })

    const handleClick = () => {
        window['scrollTo']({ top: 0, behavior: 'smooth'})
    }
    
    return (
        <div>
            {show &&
                <IconButton onClick={handleClick} >
                    <ExpandLessIcon />
                </IconButton>
            }
        </div>
    )
}

export default Scroll;