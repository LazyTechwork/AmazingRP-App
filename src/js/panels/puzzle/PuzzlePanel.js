import {Div, Panel, PanelHeader} from "@vkontakte/vkui"
import React from 'react';
import Puzzle from "react-image-puzzle";
import {connect} from 'react-redux';

import {setFormData} from "../../store/formData/actions";

import {closePopout, goBack, openModal, openPopout, setPage, setStory} from '../../store/router/actions';

class PuzzlePanel extends React.Component {

    render() {
        const {id, setPage, setStory} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>Разгадай пазл</PanelHeader>
                <Div>
                    <Puzzle image={"https://i.ibb.co/BymXDmM/1w-Ztx-SGl-Vq4.jpg"} level={2}/>
                </Div>
            </Panel>
        );
    }

}

const mapDispatchToProps = {
    setPage,
    setStory,
    goBack,
    openPopout,
    closePopout,
    openModal,
    setFormData
};

export default connect(null, mapDispatchToProps)(PuzzlePanel);
