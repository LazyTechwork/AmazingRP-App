import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import {Avatar, Panel, PanelHeader, RichCell} from "@vkontakte/vkui"

import {setFormData} from "../../store/formData/actions";
import bridge from "@vkontakte/vk-bridge";

class ProfilePanel extends React.Component {

    state = {
        userinfo: {
            first_name: 'Павел',
            last_name: 'Дуров',
            id: 1,
            photo_100: 'https://sun9-47.userapi.com/c850016/v850016414/13ab73/BY7D48azABA.jpg?ava=1'
        }
    }

    componentDidMount() {
        bridge.send("VKWebAppGetUserInfo", {}).then(data => {
            this.setState({
                userinfo: {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    id: data.id,
                    photo_100: data.photo_100
                }
            });
        }).catch(error => {
            console.error(error)
            throw error;
        });
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
