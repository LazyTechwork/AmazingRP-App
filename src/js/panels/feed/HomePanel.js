import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import {Panel, PanelHeader} from "@vkontakte/vkui"
import Carousel from "../../components/Carousel/Carousel";

class HomePanel extends React.Component {

    state = {
        banners: []
    }

    render() {
        const {id, banners} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>Новости</PanelHeader>
                {/*<CardScroll>*/}
                {/*    {banners.map((banner) => (*/}
                {/*        <Card size="s">*/}
                {/*            <img src={banner.image.url} alt="" style={{height: "350px"}}/>*/}
                {/*        </Card>*/}
                {/*    ))}*/}
                {/*</CardScroll>*/}
                <Carousel
                    list={this.props.banners}
                    autoplay
                    sizePadding={52.63}
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
    openModal
};

export default connect(null, mapDispatchToProps)(HomePanel);
