import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import {Avatar, Panel, PanelHeader, RichCell} from "@vkontakte/vkui"

import {setFormData} from "../../store/formData/actions";
import {getProfileInfo} from "../../services/VK";

class ProfilePanel extends React.Component {

    state = {
        userinfo: null
    }

    componentDidMount() {
        const userinfo = getProfileInfo();
        console.log(userinfo)
        this.setState({userinfo})
    }

    render() {
        const {panelid} = this.props;
        const {first_name, last_name, id, photo_200} = this.state.userinfo

        return (
            <Panel id={panelid}>
                <PanelHeader>Профиль</PanelHeader>
                <RichCell
                    disabled
                    multiline
                    text="Игрок проекта"
                    before={<Avatar size={72} src={photo_200}/>}
                >
                    {`${first_name} ${last_name}`}
                </RichCell>
            </Panel>
        );
    }

}

const mapDispatchToProps = {
    setPage,
    goBack,
    openPopout,
    closePopout,
    openModal,
    setFormData
};

export default connect(null, mapDispatchToProps)(ProfilePanel);
