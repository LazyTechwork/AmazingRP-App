import React from 'react';
import {connect} from 'react-redux';

import {goBack, setPage, setStory} from '../../store/router/actions';
import {setFormData} from "../../store/formData/actions";
import {Button, Div, Panel, PanelHeader, PanelHeaderBack, Text, Title} from "@vkontakte/vkui";
import * as VK from "../../services/VK";

import Icon28ShareOutline from '@vkontakte/icons/dist/28/share_outline';
import Icon20EducationOutline from '@vkontakte/icons/dist/20/education_outline';

class QuizFinale extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            quiz: props.inputData['quizresults'] || null
        };
    }

    shareResult() {
        const quiz = this.state.quiz
        VK.shareOnWall({
            message: `Я прошёл викторину «${quiz.quiz}» с неплохим результатом (${quiz.rightAnswers} из ${quiz.totalAnswers})!\nПриглашаю пройти и тебя! https://vk.com/app${VK.APP_ID}`,
            attachments: `https://vk.com/app${VK.APP_ID},photo-196785510_457239070`
        });
    }

    render() {
        const {id, setStory} = this.props;
        const quiz = this.state.quiz

        return (
            <Panel id={id}>
                <PanelHeader
                    left={<PanelHeaderBack onClick={() => setStory("quiz", "list")}/>}
                >
                    Результаты
                </PanelHeader>
                <Div style={{textAlign: "center"}}>
                    <Title level="1" weight="heavy">Поздравляем!</Title>
                    <Title level="2" weight="regular" style={{marginBottom: 32}}>Вы прошли
                        викторину &laquo;{quiz.quiz}&raquo;</Title>
                    <Text weight="regular">Всего вопросов: {quiz.totalAnswers}</Text>
                    <Text weight="regular" style={{marginBottom: 16}}>Отвечено правильно: {quiz.rightAnswers}</Text>
                </Div>
                <Div style={{display: 'flex'}}>
                     <Button size="l" before={<Icon28ShareOutline width={24} height={24}/>} stretched style={{marginRight: 8}} onClick={() => this.shareResult()}>Поделиться
                        результатом</Button>
                    <Button size="l" before={<Icon20EducationOutline width={24} height={24}/>} stretched mode="secondary" onClick={() => setStory("quiz", "list")}> Другие
                        викторины</Button>
                </Div>
                {this.state.snackbar}

                <div className="panelDeco deco-4" style={{backgroundSize: "35vh"}}/>
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
    goBack, setPage, setStory
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizFinale);