import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage, setStory} from '../../store/router/actions';

import {Div, Panel, PanelHeader, Separator, Title} from "@vkontakte/vkui"
import ReactCompareImage from 'react-compare-image';

import {setFormData} from "../../store/formData/actions";

const beforeafter = [
    {
        name: 'Магазин «Перекрёсток»',
        crmp: "https://sun9-38.userapi.com/E8GS2_hnvIrqaKLF1oPCDp_IZ2RHh3PGIZkeiw/Fgyw5mFLN70.jpg",
        real: "https://sun9-22.userapi.com/gRd5c2HHG5wGw5jm8JJjejpKbKfRqtN8uyFS3w/-sXkH97Dewo.jpg"
    }, {
        name: 'Магазин «Перекрёсток»',
        crmp: "https://sun9-38.userapi.com/E8GS2_hnvIrqaKLF1oPCDp_IZ2RHh3PGIZkeiw/Fgyw5mFLN70.jpg",
        real: "https://sun9-22.userapi.com/gRd5c2HHG5wGw5jm8JJjejpKbKfRqtN8uyFS3w/-sXkH97Dewo.jpg"
    },
]

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
                    {beforeafter.map((ba) => (<div>
                        <Title level="2" weight="semibold" style={{marginBottom: 16}}>{ba.name}</Title>
                        <ReactCompareImage leftImage={ba.crmp} rightImage={ba.real}/>
                        <Separator style={{margin: '15px 0'}}/>
                    </div>))}
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
