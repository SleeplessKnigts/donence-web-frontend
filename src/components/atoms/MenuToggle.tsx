import React from 'react'
import {Box} from '@chakra-ui/react'

export interface MenuToggleProps {
    toggle: () => void,
    isOpen: boolean,
}

export const MenuToggle: React.FC<MenuToggleProps> = (props) => {
    return(
        <Box display={{base: "block", md: "none"}} onClick={props.toggle}>
            {props.isOpen ? <p>Close</p> : <p>Open</p>} 
        </Box>
    )
}