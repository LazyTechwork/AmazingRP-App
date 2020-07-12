import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage, setStory} from '../../store/router/actions';

import {Banner, Button, Caption, Div, Panel, PanelHeader, Title} from "@vkontakte/vkui"
import ReactCompareImage from 'react-compare-image';

import {setFormData} from "../../store/formData/actions";
import {APP_BUILD, APP_NAME, APP_VERSION} from "../../constants/appinfo";

class ProfilePanel extends React.Component {

    state = {
        userinfo: null
    }

    componentDidMount() {
        this.setState({userinfo: this.props.userinfo})
    }

    render() {
        const {id} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>Сравните, что лучше</PanelHeader>
                <Div>
                    <Title level="2" weight="semibold" style={{ marginBottom: 16 }}>Магазин &laquo;Перекрёсток&raquo;</Title>
                    <ReactCompareImage leftImage="https://sun9-38.userapi.com/E8GS2_hnvIrqaKLF1oPCDp_IZ2RHh3PGIZkeiw/Fgyw5mFLN70.jpg" rightImage="https://sun9-22.userapi.com/gRd5c2HHG5wGw5jm8JJjejpKbKfRqtN8uyFS3w/-sXkH97Dewo.jpg" />

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

export default connect(null, mapDispatchToProps)(ProfilePanel);
