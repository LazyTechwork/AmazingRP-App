import React from 'react';
import {connect} from 'react-redux';

import {goBack, setPage, setStory} from '../../store/router/actions';
import {setFormData} from "../../store/formData/actions";

import {Button, Div, Panel, PanelHeader, PanelHeaderBack, Text, Title} from "@vkontakte/vkui";
import * as VK from "../../services/VK";

class QuizFinale extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            quiz: props.inputData['quizresults'] || null
        };
    }

    componentWillUnmount() {
        this.props.setFormData("quizresults", null)
    }

    shareResult() {
        const quiz = this.state.quiz
        VK.shareOnWall({
            message: `Я прошёл викторину «${quiz.quiz}» с неплохим результатом (${quiz.rightAnswers} из ${quiz.totalAnswers})! \n Приглашаю пройти и тебя!`,
            attachments: ["https://vk.com/app7528915"]
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
                    <Button size="l" stretched style={{marginRight: 8}} onClick={() => this.shareResult()}>Поделиться
                        результатом</Button>
                    <Button size="l" stretched mode="secondary" onClick={() => setStory("quiz", "list")}>Другие
                        викторины</Button>
                </Div>
                {this.state.snackbar}
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