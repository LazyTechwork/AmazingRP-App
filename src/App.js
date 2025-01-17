import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {WEB} from "./js/constants/platforms";
import {closeModal, goBack, setStory} from "./js/store/router/actions";
import {getActivePanel} from "./js/services/_functions";
import * as VK from './js/services/VK';

import {ConfigProvider, Epic, ModalRoot, Root, Tabbar, TabbarItem, View} from "@vkontakte/vkui";

import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28FireOutline from '@vkontakte/icons/dist/28/fire_outline';
import Icon28HeadphonesOutline from '@vkontakte/icons/dist/28/headphones_outline';
import Icon28Menu from '@vkontakte/icons/dist/28/menu';
import Icon28MagicWandOutline from '@vkontakte/icons/dist/28/magic_wand_outline';
import Icon28BrainOutline from '@vkontakte/icons/dist/28/brain_outline';

import HomeBotsListModal from './js/components/modals/HomeBotsListModal';
import HomeBotInfoModal from './js/components/modals/HomeBotInfoModal';
import HomePanel from "./js/panels/feed/HomePanel";

import Onboarding from "./js/panels/onboarding/Onboarding.js";
import PostView from "./js/panels/feed/PostView";
import ProfilePanel from "./js/panels/profile/ProfilePanel";
import bridge from "@vkontakte/vk-bridge";
import FAQPanel from "./js/panels/profile/FAQPanel";
import QuizPanel from "./js/panels/quiz/QuizPanel";
import QuizProcess from "./js/panels/quiz/QuizProcess";
import RadioPanel from "./js/panels/radio/RadioPanel";
import QuizFinale from "./js/panels/quiz/QuizFinale";
import QuizStart from "./js/panels/quiz/QuizStart";
import RoleplayPanel from "./js/panels/profile/RoleplayPanel";
import {setAppPlatform} from "./js/store/vk/actions";
import {APP_SECRET} from "./js/constants/appinfo";
import AboutPanel from "./js/panels/profile/AboutPanel";
import ReallifePanel from "./js/panels/reallife/ReallifePanel";
import RightsPanel from "./js/panels/onboarding/RightsPanel";
import PuzzlePanel from "./js/panels/puzzle/PuzzlePanel";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.lastAndroidBackAction = 0;
    }

    state = {
        devinfo: [],
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
            },
            {
                "id": 11,
                "url": "#",
                "image": {
                    "url": "https://i.ibb.co/0m49mFX/1-BIn-DPNn5-Mg.jpg",
                    "thumb": ""
                }
            },
            {
                "id": 12,
                "url": "#",
                "image": {
                    "url": "https://i.ibb.co/DLyVxhm/8q-Sz-H8-RWSSY.jpg",
                    "thumb": ""
                }
            },
            {
                "id": 13,
                "url": "#",
                "image": {
                    "url": "https://i.ibb.co/vLzFY9C/Anopf-Vb-Uw-UA-1.jpg",
                    "thumb": ""
                }
            },
            {
                "id": 14,
                "url": "#",
                "image": {
                    "url": "https://i.ibb.co/wh5frXV/ee0q-JQUPwx4.jpg",
                    "thumb": ""
                }
            },
            {
                "id": 15,
                "url": "#",
                "image": {
                    "url": "https://i.ibb.co/tbxQs1q/g-BKnx-Nx-4-HM.jpg",
                    "thumb": ""
                }
            },
            {
                "id": 16,
                "url": "#",
                "image": {
                    "url": "https://i.ibb.co/BrK5s7b/q-P5r-VXJRXao.jpg",
                    "thumb": ""
                }
            },
            {
                "id": 17,
                "url": "#",
                "image": {
                    "url": "https://i.ibb.co/F4C8dFR/uk-Cqcv-Ildhc.jpg",
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
        const params = new URLSearchParams(window.location.search)
        dispatch(VK.initApp());
        console.log(`SET PLATFORM - ${params.get('vk_platform')}`)
        dispatch(setAppPlatform(params.get('vk_platform')))

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

        const lsdi = localStorage.getItem("devinfo") ? JSON.parse(localStorage.getItem("devinfo")) : null
        if (lsdi && lsdi["expire"] >= Date.now())
            this.setState({devinfo: lsdi})
        else
            bridge.send("VKWebAppCallAPIMethod", {
                "method": "users.get",
                "request_id": "devinfo",
                "params": {
                    "user_ids": "242521347,595756916,448368288",
                    "v": "5.130",
                    "fields": "photo_100",
                    "access_token": APP_SECRET
                }
            }).then(data => {
                let devinfo = {}
                for (const info of data.response)
                    devinfo[info.id] = {name: `${info.first_name} ${info.last_name}`, photo: info.photo_100}
                devinfo["expire"] = Date.now() + 120 * 60000
                this.setState({devinfo})
                localStorage.setItem("devinfo", JSON.stringify(devinfo))
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
                ><Icon28FireOutline/></TabbarItem>
                {this.props.platform === WEB ? <TabbarItem
                    onClick={() => setStory('puzzle', 'base')}
                    selected={activeStory === 'puzzle'}
                ><Icon28BrainOutline/></TabbarItem> : ""}
                <TabbarItem
                    onClick={() => setStory('reallife', 'base')}
                    selected={activeStory === 'reallife'}
                ><Icon28MagicWandOutline/></TabbarItem>
                <TabbarItem
                    onClick={() => setStory('radio', 'base')}
                    selected={activeStory === 'radio'}
                ><Icon28HeadphonesOutline/></TabbarItem>
                <TabbarItem
                    onClick={() => setStory('profile', 'base')}
                    selected={activeStory === 'profile'}
                ><Icon28Menu/></TabbarItem>
            </Tabbar>
        );

        return (
            <ConfigProvider isWebView={true} scheme={colorScheme}>
                <Epic activeStory={activeStory} tabbar={(activeStory === 'rights') ? null : tabbar}>
                    <Root id="rights" activeView={activeView}>
                        <View
                            id="rights"
                            activePanel={getActivePanel("rights")}
                        >
                            <RightsPanel id="rights"/>
                        </View>
                    </Root>

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
                            <RoleplayPanel id="rp"/>
                            <FAQPanel id="faq"/>
                            <AboutPanel id="about" devinfo={this.state.devinfo}/>
                        </View>
                    </Root>

                    <Root id="reallife" activeView={activeView} popout={popout}>
                        <View
                            id="reallife"
                            modal={homeModals}
                            activePanel={getActivePanel("reallife")}
                            history={history}
                            onSwipeBack={() => goBack()}
                        >
                            <ReallifePanel id="base"/>
                        </View>
                    </Root>

                    <Root id="puzzle" activeView={activeView} popout={popout}>
                        <View
                            id="puzzle"
                            modal={homeModals}
                            activePanel={getActivePanel("puzzle")}
                            history={history}
                            onSwipeBack={() => goBack()}
                        >
                            <PuzzlePanel id="base"/>
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
                            <QuizStart id="start"/>
                            <QuizProcess id="quiz"/>
                            <QuizFinale id="finale"/>
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
        platform: state.vkui.platform,
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
