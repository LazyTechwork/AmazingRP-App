import React from 'react';
import {connect} from 'react-redux';

import {goBack, setPage, setStory} from '../../store/router/actions';
import {setFormData} from "../../store/formData/actions";

import {Div, Panel, PanelHeader, PanelHeaderBack, Text, Title} from "@vkontakte/vkui";

class QuizFinale extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            quiz: props.inputData['quizresults'] || null
        };
    }

    render() {
        const {id, setPage} = this.props;
        const quiz = this.state.quiz

        return (
            <Panel id={id}>
                <PanelHeader
                    left={<PanelHeaderBack onClick={() => setPage("quiz", "list")}/>}
                >
                    Результаты
                </PanelHeader>
                <Div>
                    <Title level="1" weight="heavy" style={{marginBottom: 16}}>Поздравляем!</Title>
                    <Title level="2" weight="regular" style={{marginBottom: 32}}>Вы прошли
                        викторину <br/> &laquo;{quiz.quiz}&raquo;</Title>
                    <Text weight="regular" style={{marginBottom: 16}}>Всего вопросов: {quiz.totalAnswers}</Text>
                    <Text weight="regular" style={{marginBottom: 16}}>Отвечено правильно: {quiz.rightAnswers}</Text>
                </Div>
                <Div style={{display: 'flex'}}>
                    <Button size="l" stretched style={{ marginRight: 8 }}>Поделиться результатом</Button>
                    <Button size="l" stretched mode="secondary">Другие викторины</Button>
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