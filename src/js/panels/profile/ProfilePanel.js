import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import {Avatar, Banner, Button, Panel, PanelHeader, RichCell} from "@vkontakte/vkui"

import {setFormData} from "../../store/formData/actions";

class ProfilePanel extends React.Component {

    state = {
        userinfo: null
    }

    componentDidMount() {
        this.setState({userinfo: this.props.userinfo})
    }

    render() {
        const {id, setPage} = this.props;
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

                <Banner
                    mode="image"
                    size="m"
                    header="Нужна помощь?"
                    subheader="Обратитесь к нашей команде поддержки!"
                    background={
                        <div
                            style={{
                                backgroundColor: '#d92f2f',
                                backgroundImage: 'url(https://amazing-rp.ru/assets/images/header-help.jpg)',
                                backgroundPosition: 'left bottom',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}
                        />
                    }
                    actions={<Button mode="overlay_primary" onClick={()=>{setPage("profile", "faq")}}>Помогите!</Button>}
                />
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
