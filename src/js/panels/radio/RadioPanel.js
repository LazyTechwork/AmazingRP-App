import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage, setStory} from '../../store/router/actions';

import {Avatar, Button, Cell, Div, Panel, PanelHeader, Placeholder, Slider} from "@vkontakte/vkui"

import {setFormData} from "../../store/formData/actions";
import Icon28Play from '@vkontakte/icons/dist/28/play';
import Icon28Pause from '@vkontakte/icons/dist/28/pause';
import Icon28HeadphonesOutline from '@vkontakte/icons/dist/28/headphones_outline';
import {IOS} from "../../constants/platforms";

class RadioPanel extends React.Component {

    state = {
        volume: 0.5,
        isPlaying: false,
        ...this.props.inputData["radio_volume"]
    }

    componentWillUnmount() {
        this.props.setFormData("radio_volume", {volume: this.state.volume})
    }

    toggleRadio() {
        this.setState({isPlaying: !this.state.isPlaying})
        this._radio.volume = this.state.volume
    }

    volumeChange(volume) {
        this.setState({volume})
        this._radio.volume = this.state.volume
    }

    render() {
        const {id} = this.props;

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
                        multiline
                        style={{marginBottom: 64}}
                        asideContent={<Button mode="outline" onClick={() => this.toggleRadio()}>{this.state.isPlaying ?
                            <Icon28Pause/> :
                            <Icon28Play/>}</Button>}
                        bottomContent={
                            this.props.platform === IOS ?
                                <Slider
                                    min={0}
                                    max={1}
                                    value={Number(this.state.volume)}
                                    onChange={volume => this.volumeChange(volume)}
                                />}>

                        Amazing Live
                    </Cell>

                    <Placeholder
                        icon={<Icon28HeadphonesOutline width={56} height={56}/>}
                        header="Другие радиостанции"
                    >
                        Скоро мы добавим дополнительные радиостанции, <br/> чтобы играть было гораздо веселее!
                    </Placeholder>
                </Div>
                <audio src={this.state.isPlaying && this.props.isAppOpen ? "https://radio.amazing-rp.ru/live" : ""}
                       autoPlay={true}
                       ref={(a) => this._radio = a}/>
            </Panel>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        inputData: state.formData.forms,
        isAppOpen: state.vkui.isAppOpen,
        platform: state.vkui.platform
    };
};

const mapDispatchToProps = {
    setPage,
    setStory,
    goBack,
    openPopout,
    closePopout,
    openModal,
    setFormData
};

export default connect(mapStateToProps, mapDispatchToProps)(RadioPanel);
