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
        name: 'Стадион в г. Арзамасе',
        crmp: "https://sun6-13.userapi.com/HKva-XWPT6JcSVzJ8osauO3NVmh5Eq57aVVpLQ/MNFWIhyuE2U.jpg",
        real: "https://sun6-14.userapi.com/_c9rIq331MiHPl2EYSER-AE6WliVoBrU72sLog/DEq0zMFJ49E.jpg"
    }, {
        name: 'Бусаево',
        crmp: "https://sun6-19.userapi.com/9eZ_0QaNI-YyGCpRUSAQHLjnPB-nuIJV0z8GZQ/hEH-a-U4cVc.jpg",
        real: "https://sun6-19.userapi.com/577BVdth1wumTZe2u9QRR6mRud1LJVuephcdQA/PNKKX3yVVPo.jpg"
    }, {
        name: 'Башня «Останкино»',
        crmp: "https://sun6-16.userapi.com/tBbE70FZMd1BR5Az0CL38KSFBRDTGjlMn8DwCw/KQ6Miqc96tU.jpg",
        real: "https://sun6-13.userapi.com/Qvj61Do83Un8lExjP4fKBP0GZpMsrBvdAIRaqg/dCGJ1SsvXiw.jpg"
    }, {
        name: '«Администрация» в пгт. Батырево',
        crmp: "https://sun6-16.userapi.com/RyWE6NZjWcpuhlxEJVdFOJgjbkL7zAqIM6UGVQ/1wZtxSGlVq4.jpg",
        real: "https://sun6-16.userapi.com/U-pizLAesZRAUSNhV0suVERfrxuaKcKgs2Xziw/pZFrGZ5Wk-E.jpg"
    }, {
        name: 'Банк «Сбербанк»',
        crmp: "https://sun6-13.userapi.com/1HjG7Wu31uRJYVNI0zD7z7UHLPTgM5gKu4i9mQ/Yn3FBIGSNfU.jpg",
        real: "https://sun6-13.userapi.com/UJxjievLYKPEe43Bk7RtWEcrmJcx02r9J_ROGA/i9N-HrI23A0.jpg"
    }, {
        name: 'Маяк',
        crmp: "https://sun6-13.userapi.com/AC0izLZF_gRMx514aYEqfqPGV_MsaetJXc8yMw/9lqXp3sLRKo.jpg",
        real: "https://sun6-16.userapi.com/ugci9pTAdMsg3MFCRNUpU7hy6-NQqBFvlJqHBQ/K5xMZWb-qn0.jpg"
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
