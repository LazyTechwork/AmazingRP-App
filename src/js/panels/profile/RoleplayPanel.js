import React from 'react';
import {connect} from 'react-redux';

import {goBack} from '../../store/router/actions';
import {setFormData} from "../../store/formData/actions";
import Icon28WriteSquareOutline from '@vkontakte/icons/dist/28/write_square_outline';
import {Button, Div, Panel, PanelHeader, PanelHeaderBack, Separator, Text, Title} from "@vkontakte/vkui";

class RoleplayPanel extends React.Component {

    render() {
        const {id, goBack} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader
                    left={<PanelHeaderBack onClick={() => goBack()}/>}
                >
                    Игровая терминология
                </PanelHeader>
                <Div>
                    <Title level="2" weight="semibold" style={{marginBottom: 8}}>RolePlay (RP)</Title>
                    <Text weight="regular" style={{marginBottom: 16}}>
                        Игра персонажами по ролям, приближённая к реальной жизни
                    </Text>
                    <Title level="2" weight="semibold" style={{marginBottom: 8}}>Non RolePlay (NonRP)</Title>
                    <Text weight="regular" style={{marginBottom: 16}}>
                        Действия персонажа, которые бы он не сделал в реальной жизни
                    </Text>
                    <Title level="2" weight="semibold" style={{marginBottom: 8}}>In Character (IC)</Title>
                    <Text weight="regular" style={{marginBottom: 16}}>
                        Игровая информация, то есть взятая из игрового мира
                    </Text>
                    <Title level="2" weight="semibold" style={{marginBottom: 8}}>Out Of Character (OOC)</Title>
                    <Text weight="regular" style={{marginBottom: 16}}>
                        Внеигровая информация, то есть взятая из нашего реального мира
                    </Text>
                    <Title level="2" weight="semibold" style={{marginBottom: 8}}>MetaGaming (MG)</Title>
                    <Text weight="regular" style={{marginBottom: 16}}>
                        Смешивание игровой (IC) и внеигровой (OOC) информации
                    </Text>
                    <Title level="2" weight="semibold" style={{marginBottom: 8}}>DeathMatch (DM)</Title>
                    <Text weight="regular" style={{marginBottom: 16}}>
                        Причинение ущерба здоровью игрового персонажа без весомой на то игровой причины
                    </Text>
                    <Title level="2" weight="semibold" style={{marginBottom: 8}}>SpawnKill (SK)</Title>
                    <Text weight="regular" style={{marginBottom: 16}}>
                        Причинение ущерба здоровью игрового персонажа без весомой игровой причины на территории базы
                        организации, где он появляется при входе в игру
                    </Text>
                    <Title level="2" weight="semibold" style={{marginBottom: 8}}>TeamKill (TK)</Title>
                    <Text weight="regular" style={{marginBottom: 16}}>
                        Причинение ущерба здоровью члена своей фракции без весомой на то игровой причины
                    </Text>
                    <Title level="2" weight="semibold" style={{marginBottom: 8}}>BunnyHop (BH)</Title>
                    <Text weight="regular" style={{marginBottom: 16}}>
                        Бег с постоянным использованием прыжков при игроках
                    </Text>
                    <Title level="2" weight="semibold" style={{marginBottom: 8}}>WilliHopping (WH)</Title>
                    <Text weight="regular" style={{marginBottom: 16}}>
                        Нереалистично высокие прыжки на велосипеде
                    </Text>
                    <Title level="2" weight="semibold" style={{marginBottom: 8}}>DriveBy (DB)</Title>
                    <Text weight="regular" style={{marginBottom: 16}}>
                        Причинение ущерба здоровью с машины персонажу
                    </Text>
                    <Title level="2" weight="semibold" style={{marginBottom: 8}}>PowerGaming (PG)</Title>
                    <Text weight="regular" style={{marginBottom: 16}}>
                        Преувеличение возможностей своего персонажа
                    </Text>
                    <Title level="2" weight="semibold" style={{marginBottom: 8}}>RevengeKill (RVK)</Title>
                    <Text weight="regular" style={{marginBottom: 16}}>
                        Причинение ущерба здоровью игровому персонажу в отместку, который ранее Вас убил
                    </Text>
                    <Title level="2" weight="semibold" style={{marginBottom: 8}}>RepeatKill (RPK)</Title>
                    <Text weight="regular" style={{marginBottom: 16}}>
                        Намеренное повторное убийство одного и того же игрока, которого Вы уже убили ранее
                    </Text>

                    <Separator style={{marginTop: 0, marginBottom: 32}}/>

                    <Title level="1" weight="semibold" style={{marginTop: 16, marginBottom: 16}}>Задайте вопрос</Title>
                    <Text weight="regular">Появились вопросы после прочтения? Напишите нам и мы расскажем всё в подробностях!</Text>
                    <Button before={<Icon28WriteSquareOutline/>} style={{marginTop: 16}} size="xl"
                            href="https://vk.me/public196785510" target="_blank" mode="outline">Написать нам</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(RoleplayPanel);
