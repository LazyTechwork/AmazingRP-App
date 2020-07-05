import React from 'react';
import {connect} from 'react-redux';

import {goBack, setPage, setStory} from '../../store/router/actions';
import {setFormData} from "../../store/formData/actions";
import {Button, Div, Panel, PanelHeader, PanelHeaderBack, Text, Title} from "@vkontakte/vkui";

class QuizStart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            quiz: props.inputData['quiz'] || null,
            timer: 5,
            interval: null
        };

        if (!this.state.quiz) {
            this.props.setStory("quiz", "list")
        }

        if (this.state.quiz && this.state.quiz.started) {
            this.props.setPage("quiz", "quiz")
        }
        this.state.interval = setInterval(() => {
            this.setState({timer: this.state.timer - 1})
            if (this.state.timer <= 0) {
                this.start()
            }
        }, 1000)
    }

    cancelStart() {
        clearInterval(this.state.interval)
        this.setState({interval: null})
        this.props.setStory("quiz", "list")
    }

    start() {
        console.log("START QUIZ")
        clearInterval(this.state.interval)
        this.setState({interval: null, quiz: {...this.state.quiz, started: true}})
        this.props.setFormData("quiz", this.state.quiz)
        this.props.setPage("quiz", "quiz")
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
    }

    render() {
        const {id, setStory} = this.props;
        const quiz = this.state.quiz

        if (!quiz || quiz.started)
            return (<Panel id={id}/>)

        return (
            <Panel id={id}>
                <PanelHeader
                    left={<PanelHeaderBack onClick={() => setStory("quiz", "list")}/>}
                >
                    Викторина
                </PanelHeader>
                <Div style={{textAlign: "center", marginTop: 64}}>
                    <Title level="2" weight="regular" style={{marginBottom: 32}}>Начинаем нашу
                        викторину &laquo;{quiz.quiz.name}&raquo;</Title>
                    <Text weight="regular">Всего вопросов: {quiz.quiz.questions.length}</Text>


                    <Title level="1" weight="heavy">{this.state.timer}</Title>
                </Div>
                <Div>
                    <Button size="l" stretched mode="secondary" onClick={() => this.cancelStart()}>Отмена</Button>
                </Div>

                <div className="panelDeco deco-3" style={{backgroundSize: "40vh"}}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuizStart);