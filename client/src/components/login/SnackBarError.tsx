// @ts-nocheck
import React from 'react'
import { Button, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function SnackBarError({ setSnackBarOpen, errorMessage, snackBarOpen }) {
    return (
        <Snackbar
            open={snackBarOpen}
            onClose={() => setSnackBarOpen(false)}
            message={errorMessage || "Sorry, an error occured. Please try again"}
            action={
                <React.Fragment>
                    <Button
                        size="small"
                        onClick={() => setSnackBarOpen(false)}
                    >
                        <CloseIcon color="secondary" />
                    </Button>
                </React.Fragment>
            }
        />
    );
};

