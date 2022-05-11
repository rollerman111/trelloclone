import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box } from '@mui/material'
import { useAppDispatch } from '../../redux/hooks'
import { deleteProject as deleteProj } from '../../redux/slices/projectSlice'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

export default function DeleteDialog({ openDialog, setOpenDialog, id }: any) {
    const dispatch = useAppDispatch()

    const handleClose = () => {
        setOpenDialog(false);
    };

    const deleteProject = () => {

        dispatch(deleteProj(id))
        
        handleClose()


    }

    return (
        <div>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={openDialog}
                maxWidth="xs"
                fullWidth
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Delete project
                </BootstrapDialogTitle>
                <DialogContent dividers>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column" }}>
                        <Box sx={{
                            borderRadius: '50%',
                            height: '100px',
                            width: '100px',
                            border: '1px solid red',
                            marginBottom: '20px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',


                        }}>
                            <DeleteOutlineOutlinedIcon sx={{ color: 'red', fontSize: '50px', fontWeight: 400 }} />
                        </Box>

                        <Typography sx={{ fontWeight: 700 }}>
                            Are you sure you want to delete this project?
                        </Typography>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: '#6c757d' }}>
                        Close
                    </Button>
                    <Button autoFocus onClick={() => deleteProject()} sx={{ color: '#dc3545' }}>
                        Delete
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}