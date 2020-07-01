import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {closeModal, goBack, setStory} from "./js/store/router/actions";
import {getActivePanel} from "./js/services/_functions";
import * as VK from './js/services/VK';

import {ConfigProvider, Epic, ModalRoot, Root, Tabbar, TabbarItem, View} from "@vkontakte/vkui";

import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28More from '@vkontakte/icons/dist/28/more';

import HomePanelBase from './js/panels/home/base';
import HomePanelGroups from './js/panels/home/groups';

import MorePanelBase from './js/panels/more/base';
import MorePanelExample from './js/panels/more/example';

import HomeBotsListModal from './js/components/modals/HomeBotsListModal';
import HomeBotInfoModal from './js/components/modals/HomeBotInfoModal';
import API from "./js/services/API";
import HomePanel from "./js/panels/feed/HomePanel";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.lastAndroidBackAction = 0;
    }

    state = {
        banners: []
    }

    componentDidMount() {
        const {goBack, dispatch} = this.props;

        dispatch(VK.initApp());

        window.onpopstate = () => {
            let timeNow = +new Date();

            if (timeNow - this.lastAndroidBackAction > 500) {
                this.lastAndroidBackAction = timeNow;

                goBack();
            } else {
                window.history.pushState(null, null);
            }
        };

        API.request('getBanners', null, 'GET', 1).then((banners) => {
            this.setState({banners});
        }).catch((e) => {
            console.error(e);
            this.setState({isLoaded: true});
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {activeView, activeStory, activePanel, scrollPosition} = this.props;

        if (
            prevProps.activeView !== activeView ||
            prevProps.activePanel !== activePanel ||
            prevProps.activeStory !== activeStory
        ) {
            let pageScrollPosition = scrollPosition[activeStory + "_" + activeView + "_" + activePanel] || 0;

            window.scroll(0, pageScrollPosition);
        }
    }

    render() {
        const {goBack, setStory, closeModal, popouts, activeView, activeStory, activeModals, panelsHistory, colorScheme} = this.props;

        let history = (panelsHistory[activeView] === undefined) ? [activeView] : panelsHistory[activeView];
        let popout = (popouts[activeView] === undefined) ? null : popouts[activeView];
        let activeModal = (activeModals[activeView] === undefined) ? null : activeModals[activeView];

        const homeModals = (
            <ModalRoot activeModal={activeModal}>
                <HomeBotsListModal
                    id="MODAL_PAGE_BOTS_LIST"
                    onClose={() => closeModal()}
                />
                <HomeBotInfoModal
                    id="MODAL_PAGE_BOT_INFO"
                    onClose={() => closeModal()}
                />
            </ModalRoot>
        );

        const tabbar = (
            <Tabbar>
                <TabbarItem
                    onClick={() => setStory('home', 'base')}
                    selected={activeStory === 'home'}
                ><Icon28Newsfeed/></TabbarItem>
                <TabbarItem
                    onClick={() => setStory('more', 'callmodal')}
                    selected={activeStory === 'more'}
                ><Icon28More/></TabbarItem>
            </Tabbar>
        );

        return (
            <ConfigProvider isWebView={true} scheme={colorScheme}>
                <Epic activeStory={activeStory} tabbar={(activeStory === 'onboarding') ? null : tabbar}>
                    <Root id="home" activeView={activeView} popout={popout}>
                        <View
                            id="home"
                            modal={homeModals}
                            activePanel={getActivePanel("home")}
                            history={history}
                            onSwipeBack={() => goBack()}
                        >
                            <HomePanel id="base" banners={this.state.banners}/>
                            <HomePanelGroups id="groups"/>
                        </View>
                    </Root>
                    <Root id="more" activeView={activeView} popout={popout}>
                        <View
                            id="more"
                            modal={homeModals}
                            activePanel={getActivePanel("more")}
                            history={history}
                            onSwipeBack={() => goBack()}
                        >
                            <MorePanelBase id="callmodal"/>
                        </View>
                        <View
                            id="modal"
                            modal={homeModals}
                            activePanel={getActivePanel("modal")}
                            history={history}
                            onSwipeBack={() => goBack()}
                        >
                            <MorePanelExample id="filters"/>
                        </View>
                    </Root>


                    {/*<Root id="onboarding" activeView={activeView} popout={popout}>
                        <View id="onboarding" activePanel="onboarding">
                            <Onboarding
                                id="onboarding"
                                pages={[
                                    {
                                        stage: '1',
                                        image: phone0,
                                        title: 'Amazing RolePlay',
                                        subtitle: 'Сервис по игровой сети CR-MP\nМы впервые в VK!'
                                    },
                                    {
                                        stage2: 2,
                                        image: phone1,
                                        title: 'Новичок в CR-MP?',
                                        subtitle: 'Мы предлагаем тебя крутой сервер под названием Amazing RolePlay'
                                    },
                                    {
                                        stage3: 3,
                                        image: phone2,
                                        title: 'Следи за новостями!',
                                        subtitle: 'В этом разделе можешь следить за новостями проекта.'
                                    },
                                    {
                                        stage4: 4,
                                        image: phone3,
                                        title: 'Ищи игрока!',
                                        subtitle: 'Прямо в сервисе можно поискать игрока,\nполучить его статистику'
                                    },
                                    {
                                        stage5: 5,
                                        image: phone4,
                                        title: 'Задавай вопросы!',
                                        subtitle: 'Хочешь быстрее развиваться на проекте?\nЗадавай вопросы, мы Вам поможем.'
                                    },
                                    {
                                        stage6: 6,
                                        image: phone5,
                                        title: 'Играй в викторину!',
                                        subtitle: 'Долго играешь на сервере и хочешь показать свои навыки?\nЭтот раздел для тебя.'
                                    },
                                ]}
                            />
                        </View>
                    </Root>*/}
                </Epic>
            </ConfigProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        activeView: state.router.activeView,
        activeStory: state.router.activeStory,
        panelsHistory: state.router.panelsHistory,
        activeModals: state.router.activeModals,
        popouts: state.router.popouts,
        scrollPosition: state.router.scrollPosition,

        colorScheme: state.vkui.colorScheme
    };
};


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({setStory, goBack, closeModal}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
