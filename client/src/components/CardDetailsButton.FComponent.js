import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
    modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    },
    paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    },
}));


export default (props) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const {card} = props;

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    



    // const clickHandler = (e) => {
    //     //Populate modal with card details.
    //     console.log("Here's your card!", card.name)
    // }

    return (
        // <>
        // <button onClick={clickHandler}>Details</button>
        // {/* <img src={card.img_uri.normal}/> */}
        // </>
        <div>
            <button type="button" onClick={handleOpen}>
            Details
            </button>
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            >
            <Fade in={open}>
                <div className={classes.paper}>
                    <img style={{height:'60vh'}} src={props.img_normal}/>
                </div>
            </Fade>
            </Modal>
        </div>
    )


}