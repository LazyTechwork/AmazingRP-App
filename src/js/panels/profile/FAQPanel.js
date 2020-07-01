import React from 'react';
import {connect} from 'react-redux';

import {goBack} from '../../store/router/actions';
import {setFormData} from "../../store/formData/actions";

import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import Icon28WriteSquareOutline from '@vkontakte/icons/dist/28/write_square_outline';
import {Button, Div, Headline, Panel, PanelHeader, PanelHeaderBack, Text, Title, Separator} from "@vkontakte/vkui";

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
                            <Text weight="regular">
                                Заработать первые деньги можно на работах, которых на нашем сервере достаточно
                                много <br/>
                                Найти данные работы можно по команде «/gps», далее «Работы» <br/>
                                Выбирайте одну из них и можно приступать к зарабатыванию первоначального заработка
                            </Text>
                        </div>}
                    </SlideDown>


                    <Title level="1" weight="semibold" style={{marginTop: 32, marginBottom: 16, cursor: 'pointer'}}
                           onClick={() => this.setState({site: !this.state.site})}>Вопросы по сайту/форуму</Title>
                    <SlideDown>
                        {this.state.site && <div>
                            <Headline weight="semibold" style={{marginBottom: 8}}>Где заработать первые
                                деньги?</Headline>
                            <Text weight="regular">
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
                            <Text weight="regular">
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