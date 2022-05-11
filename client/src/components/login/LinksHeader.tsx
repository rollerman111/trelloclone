import React from 'react'

import { Link as DomLink } from 'react-router-dom';
import {
    Box,
    Button,
    Paper,
    Link,
} from '@mui/material';

const classes = {

    linkContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        maxWidth: '80%',
        width: '100%',
        marginTop: '50px',
        gap: '40px'
    },

    links: {
        textDecoration: 'none',
        cursor: 'pointer'

    },

    linkButton: {
        border: 'none',
        textTransform: 'none',
        paddingTop: '12px',
        paddingBottom: '12px',
        width: '170px',
        textDecoration: 'none'
    },

}

type props = {
    text: string,
    buttonText: string,
    link: string
}

export default function LinksHeader({ text, buttonText, link } : props) {


    return (
        <Box sx={classes.linkContainer}>
            <Link component={DomLink} to={link} sx={classes.links}>
                {text}
            </Link>
            <Link component={DomLink} to={link}>
                <Paper elevation={3} component={Button} sx={classes.linkButton}>
                    {buttonText}
                </Paper>
            </Link>
        </Box>
    )
}