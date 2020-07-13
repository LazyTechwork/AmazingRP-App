import React from 'react';
import {connect} from 'react-redux';

import {goBack, setPage, setStory} from '../../store/router/actions';

import {Div, Panel, PanelHeader, Separator, Title} from "@vkontakte/vkui"
import ReactCompareImage from 'react-compare-image';

const beforeafter = [
    {
        name: 'Магазин «Перекрёсток»',
        crmp: "https://i.ibb.co/GWCmc4N/Fgyw5m-FLN70.jpg",
        real: "https://i.ibb.co/f2rWrGg/s-Xk-H97-Dewo.jpg"
    }, {
        name: 'Стадион в г. Арзамасе',
        crmp: "https://i.ibb.co/DWHXZB4/MNFWIhyu-E2-U.jpg",
        real: "https://i.ibb.co/h8ZGmV3/DEq0z-MFJ49-E.jpg"
    }, {
        name: 'Бусаево',
        crmp: "https://i.ibb.co/T1hG2yW/h-EH-a-U4c-Vc.jpg",
        real: "https://i.ibb.co/Z6hXGpz/PNKKX3y-VVPo.jpg"
    }, {
        name: 'Башня «Останкино»',
        crmp: "https://i.ibb.co/GPCDQYY/KQ6-Miqc96t-U.jpg",
        real: "https://i.ibb.co/g7Bs6MW/d-CGJ1-Ssv-Xiw.jpg"
    }, {
        name: '«Администрация» в пгт. Батырево',
        crmp: "https://i.ibb.co/BymXDmM/1w-Ztx-SGl-Vq4.jpg",
        real: "https://i.ibb.co/9Hm9Xg6/p-ZFr-GZ5-Wk-E.jpg"
    }, {
        name: 'Банк «Сбербанк»',
        crmp: "https://i.ibb.co/QNks31p/Yn3-FBIGSNf-U.jpg",
        real: "https://i.ibb.co/vPzZHfD/i9-N-Hr-I23-A0.jpg"
    }, {
        name: 'Маяк',
        crmp: "https://i.ibb.co/rZTVvNJ/9lq-Xp3s-LRKo.jpg",
        real: "https://i.ibb.co/8KdbPQB/K5x-MZWb-qn0.jpg"
    },
]

class ReallifePanel extends React.Component {

    render() {
        const {id} = this.props;
        return (
            <Panel id={id}>
                <PanelHeader>Сравните, что лучше</PanelHeader>
                <Div>
                    {beforeafter.map((ba) => (<div key={ba.name}>
                        <Title level="2" weight="semibold" style={{marginBottom: 16}}>{ba.name}</Title>
                        <ReactCompareImage
                            handle={<React.Fragment/>} leftImage={ba.crmp}
                            leftImageCss={{borderRadius: 10}} rightImage={ba.real}
                            rightImageCss={{borderRadius: 10}}/>
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
    goBack
};

export default connect(null, mapDispatchToProps)(ReallifePanel);
