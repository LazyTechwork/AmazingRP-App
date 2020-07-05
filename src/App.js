import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {closeModal, goBack, setStory} from "./js/store/router/actions";
import {getActivePanel} from "./js/services/_functions";
import * as VK from './js/services/VK';

import {ConfigProvider, Epic, ModalRoot, Root, Tabbar, TabbarItem, View} from "@vkontakte/vkui";

import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Profile from '@vkontakte/icons/dist/28/profile';
import Icon12Fire from '@vkontakte/icons/dist/12/fire';
import Icon28HeadphonesOutline from '@vkontakte/icons/dist/28/headphones_outline';

import MorePanelBase from './js/panels/more/base';
import MorePanelExample from './js/panels/more/example';

import HomeBotsListModal from './js/components/modals/HomeBotsListModal';
import HomeBotInfoModal from './js/components/modals/HomeBotInfoModal';
import HomePanel from "./js/panels/feed/HomePanel";

import phone0 from './img/introduction/phone0.png';
import phone1 from './img/introduction/phone1.png';
import phone2 from './img/introduction/phone2.png';
import phone3 from './img/introduction/phone3.png';
import phone4 from './img/introduction/phone4.png';
import phone5 from './img/introduction/phone5.png';
import Onboarding from "./js/panels/onboarding/Onboarding.js";
import PostView from "./js/panels/feed/PostView";
import ProfilePanel from "./js/panels/profile/ProfilePanel";
import bridge from "@vkontakte/vk-bridge";
import FAQPanel from "./js/panels/profile/FAQPanel";
import QuizPanel from "./js/panels/quiz/QuizPanel";
import QuizProcess from "./js/panels/quiz/QuizProcess";
import RadioPanel from "./js/panels/radio/RadioPanel";
import QuizFinale from "./js/panels/quiz/QuizFinale";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.lastAndroidBackAction = 0;
    }

    state = {
        banners: [
            {
                "id": 1,
                "url": "#",
                "image": {
                    "url": "https://i.ibb.co/XxpKypf/8c38af45f85abc2bd22b70553bca544589a673e53984d4b9ba185aae637fd84b.png",
                    "thumb": ""
                }
            },
            {
                "id": 2,
                "url": "#",
                "image": {
                    "url": "https://i.ibb.co/NsXL0Hx/Vz-Lq-Rh-TXVU.jpg",
                    "thumb": ""
                }
            },
            {
                "id": 3,
                "url": "#",
                "image": {
                    "url": "https://i.ibb.co/vqRQTD7/screen-go-1.jpg",
                    "thumb": ""
                }
            },
            {
                "id": 4,
                "url": "#",
                "image": {
                    "url": "https://i.ibb.co/R67W2SJ/screen-go-2.jpg",
                    "thumb": ""
                }
            },
            {
                "id": 5,
                "url": "#",
                "image": {
                    "url": "https://i.ibb.co/VmgnVGc/screen-go-3.jpg",
                    "thumb": ""
                }
            },
            {
                "id": 6,
                "url": "#",
                "image": {
                    "url": "https://i.ibb.co/zbvjY8n/screen-go-5.jpg",
                    "thumb": ""
                }
            },
            {
                "id": 7,
                "url": "#",
                "image": {
                    "url": "https://i.ibb.co/SdxLk3y/screen-go-6.jpg",
                    "thumb": ""
                }
            },
            {
                "id": 8,
                "url": "#",
                "image": {
                    "url": "https://i.ibb.co/m5wbrGP/screen-go-7.jpg",
                    "thumb": ""
                }
            },
            {
                "id": 9,
                "url": "#",
                "image": {
                    "url": "https://i.ibb.co/hHXyC5J/screen-go-4.jpg",
                    "thumb": ""
                }
            },
            {
                "id": 10,
                "url": "#",
                "image": {
                    "url": "https://i.ibb.co/M9ZKzJw/31b586edfc8ddca1d4927f6249f3ffd8f43e593219ba4f9cd3c9f20877f21a7f.png",
                    "thumb": ""
                }
            }
        ],
        news: [{
            "id": 1,
            "title": "Клубы по интересам",
            "url": "https://vk.com/video_ext.php?oid=-196785510&id=456239021&hash=44db7a9bf5113f74&amp;hd=3",
            "content": "Бокс и гонки лучше всего отражают то, что происходит в нашей жизни: когда получаешь нокдаун или поздно стартуешь, ты не должен сдаваться, а обязан продолжить борьбу и доказать всем, в том числе и себе, что тебе нет равных. Уже сейчас ты можешь стать абсолютным чемпионом Бойцовского или Гоночного клуба, начав свой путь рядовым участником на любом из наших серверов. Вступай в клуб по интересам, рискуй и одерживай сокрушительные победы!",
            "date": "01.07.2020",
            "time": "13:00",
            "author": "Разработчики AMAZING",
            "tags": [
                "box",
                "amazing"
            ]
        },
            {
                "id": 2,
                "title": "Безумный азарт",
                "url": "https://vk.com/video_ext.php?oid=-196785510&id=456239022&hash=15658dc32e1cae64&amp;hd=3",
                "content": "Мы долгое время изучали Ваши предложения и пожелания, ориентируясь на них, сегодня мы презентуем текущее обновление, которое объединяет в себе множество игровых составляющих от долгожданных новых возможностей в СТО до увлекательных системных мероприятий, продуманных до мельчайших деталей. А количество игровых корректировок, исправлений для стабильной и комфортной игры закружит Вам голову. \n Приготовьтесь, будет очень интересно!",
                "date": "18.06.2020",
                "time": "11:00",
                "author": "Разработчики AMAZING",
                "tags": [
                    "newversion",
                    "arp"
                ]
            },
            {
                "id": 3,
                "title": "Открытие 5 сервера",
                "url": "https://vk.com/video_ext.php?oid=-196785510&id=456239020&hash=1c754c7bbe58f95f&amp;hd=3",
                "content": "Мы все вместе долгое время шли к этому моменту и рады сообщить, что уже 1 мая состоится грандиозное открытие нашего 5 сервера, название которого уже определено — AMAZING SILVER. Следите за новостями, ведь точное время открытия мы объявим чуть позже ",
                "date": "28.04.2020",
                "time": "10:00",
                "author": "Разработчики AMAZING",
                "tags": [
                    "newserver",
                    "silver"
                ]
            }],
        userinfo: {
            first_name: 'Павел',
            last_name: 'Дуров',
            id: 1,
            photo_100: 'https://sun9-47.userapi.com/c850016/v850016414/13ab73/BY7D48azABA.jpg?ava=1'
        },
        quizes: [
            {
                id: 1,
                name: "RP термины",
                description: "Тест на знания игровых терминов",
                questions: [
                    {
                        name: "Что значит термин - \"MG\"?",
                        answers: [
                            {
                                name: "MotoGaming - нанесение урона игроку с мото транспорта"
                            }, {
                                name: "MetaGaming - смешивание игровой или внеигровой информации",
                                right: true
                            }, {
                                name: "MetaGranat - метание гранат без причины"
                            },
                        ]
                    }, {
                        name: "Что значит термин - \"SK\"?",
                        answers: [
                            {
                                name: "Причинение ущерба здоровью персонажа без весомой игровой причины"
                            }, {
                                name: "Причинение ущерба здоровью персонажа без причины на территории базы организации",
                                right: true
                            }, {
                                name: "Причинение ущерба здоровью персонажа транспортным средством"
                            },
                        ]
                    }, {
                        name: "Что значит термин - \"NonRP\"?",
                        answers: [
                            {
                                name: "Действия персонажа, которые бы он сделал в реальной жизни "
                            }, {
                                name: "Действия персонажа, которые бы он не сделал в реальной жизни ",
                                right: true
                            }, {
                                name: "Река Припять"
                            },
                        ]
                    }, {
                        name: "Что значит термин - \"DM\" (DeathMatch)?",
                        answers: [
                            {
                                name: "Причинение ущерба здоровью персонажа с весомой игровой причины"
                            }, {
                                name: "Причинение ущерба здоровью игрового персонажа без весомой на то игровой причины",
                                right: true
                            }, {
                                name: "Причинение ущерба здоровью персонажа транспортным средством"
                            },
                        ]
                    }, {
                        name: "Что значит термин - \"TK\" (TeamKill)?",
                        answers: [
                            {
                                name: "Причинение ущерба здоровью члена своей фракции с весомой на то игровой причины"
                            }, {
                                name: "Причинение ущерба здоровью члена своей фракции без весомой на то игровой причины",
                                right: true
                            }, {
                                name: "Нападение на воинскую часть"
                            },
                        ]
                    }, {
                        name: "Что значит термин - \"BH\" (BunnyHop)?",
                        answers: [
                            {
                                name: "Убийство на место появления игрока"
                            }, {
                                name: "Бег с постоянным использованием прыжков при игроках",
                                right: true
                            }, {
                                name: "Причинение ущерба здоровью персонажа транспортным средством"
                            },
                        ]
                    }, {
                        name: "Что значит термин - \"DB\" (DriveBy)?",
                        answers: [
                            {
                                name: "Спам командами"
                            }, {
                                name: "Причинение ущерба здоровью с машины персонажу",
                                right: true
                            }, {
                                name: "Смешивание игровой или внеигровой информации"
                            },
                        ]
                    }, {
                        name: "Что значит термин - \"PG\" (PowerGaming)?",
                        answers: [
                            {
                                name: "Причинение ущерба здоровью персонажа без весомой игровой причины"
                            }, {
                                name: "Преувеличение возможностей своего персонажа ",
                                right: true
                            }, {
                                name: "Убийство своего члена фракции"
                            },
                        ]
                    }, {
                        name: "Что значит термин - \"RVK\" (RevengeKill)?",
                        answers: [
                            {
                                name: "Намеренное повторное убийство одного и того же игрока, которого Вы уже убили ранее "
                            }, {
                                name: "Причинение ущерба здоровью игровому персонажу в отместку, который ранее Вас убил ",
                                right: true
                            }, {
                                name: "Внеигровая информация, то есть взятая из нашего реального мира "
                            },
                        ]
                    }, {
                        name: "Что значит термин - \"RPK\" (RepeatKill)?",
                        answers: [
                            {
                                name: "Игровая информация, то есть взятая из игрового мира"
                            }, {
                                name: "Намеренное повторное убийство одного и того же игрока, которого Вы уже убили ранее ",
                                right: true
                            }, {
                                name: "Игра персонажами по ролям, приближённая к реальной жизни "
                            },
                        ]
                    }, {
                        name: "Что значит термин - \"WH\"?",
                        answers: [
                            {
                                name: "Чит программа позволяющая видеть игроков через стены"
                            }, {
                                name: "Частые прыжки на велосипеде",
                                right: true
                            }, {
                                name: "Не ролевые трюки на транспорте"
                            },
                        ]
                    }
                ]
            },
            {
                id: 2,
                name: "Игровой мод",
                description: "Тест на знания игрового мода",
                questions: [
                    {
                        name: "Как добавить игрока в чёрный список звонков?",
                        answers: [
                            {
                                name: "/blacklist"
                            }, {
                                name: "/addbl",
                                right: true
                            }, {
                                name: "/bl"
                            },
                        ]
                    }, {
                        name: "Как продать дом?",
                        answers: [
                            {
                                name: "/house"
                            }, {
                                name: "/sellhouse",
                                right: true
                            }, {
                                name: "/home"
                            },
                        ]
                    }, {
                        name: "Как открыть меню дальнобойщика?",
                        answers: [
                            {
                                name: "/job"
                            }, {
                                name: "/dalno",
                                right: true
                            }, {
                                name: "/jobs"
                            },
                        ]
                    }, {
                        name: "Как снять игрока с поста заместителя транспортной компании?",
                        answers: [
                            {
                                name: "/crang"
                            }, {
                                name: "/cundeputy",
                                right: true
                            }, {
                                name: "/povishka"
                            },
                        ]
                    }, {
                        name: "Как установить мигалку на служебное транспортное средство?",
                        answers: [
                            {
                                name: "/frac"
                            }, {
                                name: "/police",
                                right: true
                            }, {
                                name: "/carmenu"
                            },
                        ]
                    }, {
                        name: "Как снять с себя бронежилет?",
                        answers: [
                            {
                                name: "/undearm"
                            }, {
                                name: "/dearm",
                                right: true
                            }, {
                                name: "/frac"
                            },
                        ]
                    }, {
                        name: "Как заправить цистерну в ЕCC (Единая служба спасения)?",
                        answers: [
                            {
                                name: "/lmenu"
                            }, {
                                name: "/fuelwater",
                                right: true
                            }, {
                                name: "/water"
                            },
                        ]
                    }, {
                        name: "Как открыть окна в авто?",
                        answers: [
                            {
                                name: "/okna"
                            }, {
                                name: "/window",
                                right: true
                            }, {
                                name: "/carmenu"
                            },
                        ]
                    }, {
                        name: "Менять клиренс автомобиля можно на каждом т/с?",
                        answers: [
                            {
                                name: "Можно менять на каждом"
                            }, {
                                name: "Менять клиренс авто можно только на определенных авто",
                                right: true
                            }, {
                                name: "Менять клиренс авто можно только автомобилях ВАЗ."
                            },
                        ]
                    }, {
                        name: "На что влияет судимость?",
                        answers: [
                            {
                                name: "Судимость добавляет сумму к оплате услуги адвоката"
                            }, {
                                name: "За каждую 10-ую судимость Вы получаете +10 минут к времени заключения",
                                right: true
                            }, {
                                name: "При получения 3-х судимостей выдается игровое предупреждение"
                            },
                        ]
                    }, {
                        name: "С помощью какой команды можно поставить музыкальный центр?",
                        answers: [
                            {
                                name: "/audiomsg"
                            }, {
                                name: "/music",
                                right: true
                            }, {
                                name: "/audio"
                            },
                        ]
                    }, {
                        name: "Когда проходит рестарт серверов AMAZING?",
                        answers: [
                            {
                                name: "04:05"
                            }, {
                                name: "06:05",
                                right: true
                            }, {
                                name: "04:00"
                            },
                        ]
                    }, {
                        name: "Сколько рангов в государственной организации «Единая служба спасения»",
                        answers: [
                            {
                                name: "11 рангов"
                            }, {
                                name: "10 рангов",
                                right: true
                            }, {
                                name: "15 рангов"
                            },
                        ]
                    }, {
                        name: "Сколько единиц наркозависимости снимается за 1 сеанс лечения:",
                        answers: [
                            {
                                name: "30 единиц"
                            }, {
                                name: "40 единиц",
                                right: true
                            }, {
                                name: "50 единиц"
                            },
                        ]
                    }, {
                        name: "Где находится «ДПС»?",
                        answers: [
                            {
                                name: "г. Южный"
                            }, {
                                name: "г. Арзамас",
                                right: true
                            }, {
                                name: "пгт. Батырево"
                            },
                        ]
                    }, {
                        name: "Сколько стоит прокрутить золотую рулетку 1 раз?",
                        answers: [
                            {
                                name: "25 кредитов"
                            }, {
                                name: "50 амазингов",
                                right: true
                            }, {
                                name: "30 амазингов"
                            },
                        ]
                    }, {
                        name: "Какого сервера не существовало никогда",
                        answers: [
                            {
                                name: "Amazing AZURE"
                            }, {
                                name: "Amazing WHITE",
                                right: true
                            }, {
                                name: "Amazing BLACK"
                            },
                        ]
                    }, {
                        name: "Где можно купить материалы?",
                        answers: [
                            {
                                name: "Материалы можно купить на химическом заводе"
                            }, {
                                name: "Материалы можно купить на заводе",
                                right: true
                            }, {
                                name: "На сервере нет материалов"
                            },
                        ]
                    }, {
                        name: "Как выключить телефон?",
                        answers: [
                            {
                                name: "/offphone"
                            }, {
                                name: "/togphone",
                                right: true
                            }, {
                                name: "/hponeoff"
                            },
                        ]
                    }
                ]
            }
        ]
    }

    componentDidMount() {
        const {goBack, dispatch} = this.props;
        dispatch(VK.initApp());

        // Получаем информацию о пользователе
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

        window.onpopstate = () => {
            let timeNow = +new Date();

            if (timeNow - this.lastAndroidBackAction > 500) {
                this.lastAndroidBackAction = timeNow;

                goBack();
            } else {
                window.history.pushState(null, null);
            }
        };

        /*API.request('getBanners', null, 'GET', 1).then((banners) => {
            this.setState({banners});
            API.request('getNews', null, 'GET', 1).then((news) => {
                this.setState({news});
            }).catch((e) => {
                console.error(e);
            });
        }).catch((e) => {
            console.error(e);
            this.setState({isLoaded: true});
        });*/
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
                    onClick={() => setStory('quiz', 'list')}
                    selected={activeStory === 'quiz'}
                ><Icon12Fire width={24} height={24}/></TabbarItem>
                <TabbarItem
                    onClick={() => setStory('radio', 'base')}
                    selected={activeStory === 'radio'}
                ><Icon28HeadphonesOutline/></TabbarItem>
                <TabbarItem
                    onClick={() => setStory('profile', 'base')}
                    selected={activeStory === 'profile'}
                ><Icon28Profile/></TabbarItem>
                {/*<TabbarItem
                    onClick={() => setStory('more', 'callmodal')}
                    selected={activeStory === 'more'}
                ><Icon28More/></TabbarItem>*/}
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
                            <HomePanel id="base" banners={this.state.banners} news={this.state.news}/>
                            <PostView id="postview"/>
                        </View>
                    </Root>


                    <Root id="radio" activeView={activeView} popout={popout}>
                        <View
                            id="radio"
                            modal={homeModals}
                            activePanel={getActivePanel("radio")}
                            history={history}
                            onSwipeBack={() => goBack()}
                        >
                            <RadioPanel id="base" userinfo={this.state.userinfo}/>
                        </View>
                    </Root>

                    <Root id="profile" activeView={activeView} popout={popout}>
                        <View
                            id="profile"
                            modal={homeModals}
                            activePanel={getActivePanel("profile")}
                            history={history}
                            onSwipeBack={() => goBack()}
                        >
                            <ProfilePanel id="base" userinfo={this.state.userinfo}/>
                            <FAQPanel id="faq"/>
                        </View>
                    </Root>

                    <Root id="quiz" activeView={activeView} popout={popout}>
                        <View
                            id="quiz"
                            modal={homeModals}
                            activePanel={getActivePanel("quiz")}
                            history={history}
                            onSwipeBack={() => goBack()}
                        >
                            <QuizPanel id="list" quizes={this.state.quizes}/>
                            <QuizProcess id="quiz"/>
                            <QuizFinale id="finale"/>
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


                    <Root id="onboarding" activeView={activeView} popout={popout}>
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
                    </Root>
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
