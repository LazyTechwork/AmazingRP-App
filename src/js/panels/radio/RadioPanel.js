import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage, setStory} from '../../store/router/actions';

import {Avatar, Cell, Div, Panel, PanelHeader, Slider} from "@vkontakte/vkui"

import {setFormData} from "../../store/formData/actions";
import Icon28Play from '@vkontakte/icons/dist/28/play';

class RadioPanel extends React.Component {

    state = {
        volume: 0.5
    }

    render() {
        const {id, setPage, setStory} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>Радио Amazing</PanelHeader>
                <Div>
                    <Cell
                        size={"l"}
                        before={<Avatar mode="image"
                                        src="https://sun9-60.userapi.com/Lt-G-lLRG3cM7LeT_AKb5I4ai0H22cyXhdar-w/qU6dZKESAZA.jpg"
                                        size={80}/>}
                        description="Официальное радио"
                        asideContent={<Icon28Play fill="var(--accent)"/>}
                        bottomContent={
                            <Slider
                                min={0}
                                max={1}
                                value={Number(this.state.volume)}
                                onChange={volume => this.setState({volume})}
                            />}>
                        Amazing Live
                    </Cell>
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

export default connect(null, mapDispatchToProps)(RadioPanel);
