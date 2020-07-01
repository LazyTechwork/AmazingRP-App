import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import {Avatar, Panel, PanelHeader, RichCell} from "@vkontakte/vkui"

import {setFormData} from "../../store/formData/actions";

class ProfilePanel extends React.Component {

    state = {
        userinfo: null
    }

    componentDidMount() {
        this.setState({userinfo: this.props.userinfo})
    }

    render() {
        const {id} = this.props;
        const userinfo = this.state.userinfo

        return (
            <Panel id={id}>
                <PanelHeader>Профиль</PanelHeader>
                {userinfo && <RichCell
                    disabled
                    multiline
                    text="Игрок проекта"
                    before={<Avatar size={72} src={userinfo.photo_100}/>}
                >
                    {`${userinfo.first_name} ${userinfo.last_name}`}
                </RichCell>}
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
