//This is the component that will present the data visualization.
import React from 'react'
import Plot from './Plots.Fcomponents';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
}
};

// Modal.setAppElement(el)

export default props => {


    var subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
    setIsOpen(true);
    }

    function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = 'black';
    }

    function closeModal(){
    setIsOpen(false);
    }

    return (
        <div style={{display:"inline"}}>
            <button onClick={openModal}>Deck Stats</button>
                <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                >
                <h2 ref={_subtitle => (subtitle = _subtitle)}>Deck Performance</h2>
                    <Plot deck={props.deck}/>
                    {/* <p>File was last modified by Gary, you'll need to remove the commenting on the DeckStats and Plots components for functionality.</p> */}
                    <button onClick={closeModal} style={{float:'right'}} >close</button>
                </Modal>
        </div>
    )
}
