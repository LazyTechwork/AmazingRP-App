import React from 'react';
import {connect} from 'react-redux';

import {goBack} from '../../store/router/actions';
import {setFormData} from "../../store/formData/actions";

import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import Icon28WriteSquareOutline from '@vkontakte/icons/dist/28/write_square_outline';
import {Button, Div, Headline, Panel, PanelHeader, PanelHeaderBack, Separator, Text, Title} from "@vkontakte/vkui";

class FAQPanel extends React.Component {

    state = {
        game: false,
        site: false,
        tech: false
    }

    render() {
        const {id, goBack} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader
                    left={<PanelHeaderBack onClick={() => goBack()}/>}
                >
                    Поддержка
                </PanelHeader>
                <Div>
                    <Title level="1" weight="semibold" style={{marginBottom: 16, cursor: 'pointer'}}
                           onClick={() => this.setState({game: !this.state.game})}>Вопросы по игре</Title>
                    <SlideDown>
                        {this.state.game && <div>
                            <Headline weight="semibold" style={{marginBottom: 8}}>Где заработать первые
                                деньги?</Headline>
                            <Text weight="regular" style={{marginBottom: 16}}>
                                Заработать первые деньги можно на работах, которых на нашем сервере достаточно
                                много <br/>
                                Найти данные работы можно по команде «/gps», далее «Работы» <br/>
                                Выбирайте одну из них и можно приступать к зарабатыванию первоначального заработка
                            </Text>
                            <Headline weight="semibold" style={{marginBottom: 8}}>Как устроиться в
                                организацию?</Headline>
                            <Text weight="regular" style={{marginBottom: 16}}>
                                Для того, чтобы устроиться в организацию, Вам нужно:<br/>

                                Во-первых, это увидеть объявление в <b>/news</b> о начале собеседования в желаемую
                                фракцию;<br/>

                                Во-вторых, подходить в эту фракцию по критериям: уровень игрового персонажа (проживания
                                области), <b>не иметь</b> судимостей;<br/>
                                   
                                В-третьих, это знание RolePlay терминов и понимание, что такое IC процесс и OOC
                                процесс. <br/>
                                <b>IC процесс</b> - это игровой процесс и все действия из этого мира пишутся в обычном
                                чате. <br/>
                                <b>OOC процесс</b> - это внеигровой процесс и все действия пишутся в /b чате<br/>

                                Для того, чтобы изучить все подробно, можно зайти на сервер и прописать команду
                                <b>«/help»</b>, <br/>
                                далее 7 пункт «Необходимые правила для вступления в организацию»<br/>
                            </Text>
                            <Headline weight="semibold" style={{marginBottom: 8}}>Где купить телефон и сим-карту?</Headline>
                            <Text weight="regular" style={{marginBottom: 16}}>
                            Телефон и сим-карту можно купить в магазинах <b>«24/7»</b><br/>

                            Найти ближайший магазин «24/7» можно по команде <b>«/gps»</b>, далее «Ближайшие места», и последнее «Ближайший 24/7»
                            </Text>
                            <Headline weight="semibold" style={{marginBottom: 8}}>Какая самая прибыльная подработка?</Headline>
                            <Text weight="regular" style={{marginBottom: 16}}>
                             На нашем проекте много различных «подработок», можно сказать, что даже <b>«работ»</b><br/>

                            На каждой работе или подработке существует свой определенный <b>«скилл» (команда /skill)</b>, <br/>
                            при прокачивании которого, Вы будете получать больше денежных средств<br/>

                            Поэтому, <b>все подработки</b>, или же работы, прибыльные, если активно трудиться и иметь желание заработать денежные средства
                            </Text>
                            <Headline weight="semibold" style={{marginBottom: 8}}>Какой транспорт стоит купить?</Headline>
                            <Text weight="regular" style={{marginBottom: 16}}>
                            Для <b>первой машины</b> лучше купить какую-нибудь недорогую машину, чтобы можно было передвигаться по серверу, <br/>
                            а так же изучить все элементы тюнинга, все особенности систем, которые предназначены у нас на сервере для транспортных средств<br/>

                            Кстати, если машина сломается, Вам <b>потребуется меньше средств для ее ремонта</b><br/>

                            Недорогие машины можно найти например в <b>автосалоне «LADA»</b>, либо есть возможность приобрести Б/У автомобиль<br/>

                            Все автосалоны, дорогие или дешевые, можно найти через команду <b>«/gps»</b>, далее 2 пункт «Общественные места»<br/>
                            </Text>
                            <Headline weight="semibold" style={{marginBottom: 8}}>В какой организации самый большой заработок?</Headline>
                            <Text weight="regular" style={{marginBottom: 16}}>
                            Во всех организациях большие зарплаты. <br/>
                            <b>Поэтому</b> выбирайте ту, в которой Вы хотите работать<br/>
                            </Text>
                            <Headline weight="semibold" style={{marginBottom: 8}}>Где устраиваться на подработку?</Headline>
                            <Text weight="regular" style={{marginBottom: 16}}>
                            На подработку можно устроиться, приехав сразу на базу данной подработки и через чекпоинт устроиться на нее. <b>(/gps > Подработки)</b>
                            </Text>
                            <Headline weight="semibold" style={{marginBottom: 8}}>Мой персонаж грязный и плохо пахнет, что мне делать?</Headline>
                            <Text weight="regular" style={{marginBottom: 16}}>
                            Для того, чтобы помыться, Вашего персонажа нужно привезти в баню. <br/>
                            Баню можно найти по команде <b>«/gps» > 2. «Общественные места» > 28. «Баня».</b>
                            </Text>     
                            <Headline weight="semibold" style={{marginBottom: 8}}>Как открыть и настроить голосоовой чат?</Headline>
                            <Text weight="regular" style={{marginBottom: 16}}>
                            Для открытия настроек голосового чата, нажмите на клавишу <b>«F2»</b><br/>

                            Для того, чтобы поменять назначенные клавиши для того, чтобы говорить, пропишите «/mn» > 6. «Персональные настройки» > 1. «Назначение клавиш».
                            </Text> 
                            <Headline weight="semibold" style={{marginBottom: 8}}>Я купил машину, а её нет, что делать?</Headline>
                            <Text weight="regular" style={{marginBottom: 16}}>
                            Вы купили машину, но использовать ее без дома/квартиры/особняка семьи нельзя. <br/>
                            Нужно купить квартиру, как для первоначального жилья, и тогда Вы сможете использовать свое транспортное средство. <br/>
                            Посмотреть свободные квартиры можно в риэлторском агентстве. Найти его можно по команде <b>«/gps» > 7. «Бизнесы» > «Риэлторы».</b>
                            </Text> 
                            <Headline weight="semibold" style={{marginBottom: 8}}>Как и где мне создать свою семью?</Headline>
                            <Text weight="regular" style={{marginBottom: 16}}>
                            Вам нужно прибыть в «Правительство». Найти его можно по команде <b>«/gps» > 5. «Организации» > 2. «Правительство».<br/>
                            На чек-поинте нужно выбрать 2. «Создать семью». На руках должно быть 1.500.000 рублей. <br/>
                            Остальные критерии обязательно прочитайте в табличке, которая высветится при активировании данного пункта
                            </Text>                                                                                                                                            
                        </div>}
                    </SlideDown>


                    <Title level="1" weight="semibold" style={{marginTop: 32, marginBottom: 16, cursor: 'pointer'}}
                           onClick={() => this.setState({site: !this.state.site})}>Вопросы по сайту/форуму</Title>
                    <SlideDown>
                        {this.state.site && <div>
                            <Headline weight="semibold" style={{marginBottom: 8}}>Где заработать первые
                                деньги?</Headline>
                            <Text weight="regular" style={{marginBottom: 16}}>
                                Заработать первые деньги можно на работах, которых на нашем сервере достаточно
                                много <br/>
                                Найти данные работы можно по команде «/gps», далее «Работы» <br/>
                                Выбирайте одну из них и можно приступать к зарабатыванию первоначального заработка
                            </Text>
                        </div>}
                    </SlideDown>


                    <Title level="1" weight="semibold" style={{marginTop: 32, marginBottom: 16, cursor: 'pointer'}}
                           onClick={() => this.setState({tech: !this.state.tech})}>Технические проблемы</Title>
                    <SlideDown>
                        {this.state.tech && <div style={{marginBottom: 16}}>
                            <Headline weight="semibold" style={{marginBottom: 8}}>Где заработать первые
                                деньги?</Headline>
                            <Text weight="regular" style={{marginBottom: 16}}>
                                Заработать первые деньги можно на работах, которых на нашем сервере достаточно
                                много <br/>
                                Найти данные работы можно по команде «/gps», далее «Работы» <br/>
                                Выбирайте одну из них и можно приступать к зарабатыванию первоначального заработка
                            </Text>
                        </div>}
                    </SlideDown>
                    <Separator style={{marginTop: 0, marginBottom: 32}}/>

                    <Title level="1" weight="semibold" style={{marginTop: 16, marginBottom: 16}}>Задайте вопрос</Title>
                    <Text weight="regular">Так и не нашли ответ на свой вопрос?</Text>
                    <Button before={<Icon28WriteSquareOutline/>} style={{marginTop: 16}} size="xl" onClick={() => {
                        window.open('https://vk.me/public196785510')
                    }} mode="outline">Написать нам</Button>
                </Div>
            </Panel>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        inputData: state.formData.forms,
    };
};

const mapDispatchToProps = {
    setFormData,
    goBack
};

export default connect(mapStateToProps, mapDispatchToProps)(FAQPanel);
