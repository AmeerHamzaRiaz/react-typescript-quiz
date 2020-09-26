import React from 'react'
import { IconButton, useColorMode } from '@chakra-ui/core';

const DarkModeButton = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            {colorMode === "light" ?
                <IconButton icon="moon" onClick={toggleColorMode} style={{ position: 'absolute', right: 10, top: 10 }} aria-label="Toggle Darkmode" />
                :
                <IconButton icon="sun" onClick={toggleColorMode} style={{ position: 'absolute', right: 10, top: 10 }} aria-label="Toggle Darkmode" />
            }
        </>
    )
}

export default DarkModeButton
