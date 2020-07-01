import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import {Avatar, Button, Cell, Panel, PanelHeader, Snackbar} from "@vkontakte/vkui"

import {setFormData} from "../../store/formData/actions";
import Icon16Done from '@vkontakte/icons/dist/16/done';
import {randomInteger} from "../../services/_functions";

const shuffler = () => Math.random() - 0.5

const blueBackground = {
    backgroundColor: 'var(--accent)'
};

class QuizPanel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            passedQuizes: {},
            quizresults: props.inputData['quizresults'] || null,
            snackbar: null
        }
    }

    componentDidMount() {
        this.setState({passedQuizes: JSON.parse(localStorage.getItem("quizresults"))})
        if (this.state.quizresults) {
            this.setState({
                snackbar:
                    <Snackbar
                        layout="vertical"
                        onClose={() => {
                            this.setState({snackbar: null});
                            this.props.setFormData("quizresults", null)
                        }}
                        before={<Avatar size={24} style={blueBackground}><Icon16Done fill="#fff" width={14}
                                                                                     height={14}/></Avatar>}
                    >
                        Тест &laquo;{this.state.quizresults.quiz}&raquo; пройден! <br/>
                        Результат: {`${this.state.quizresults.rightAnswers}/${this.state.quizresults.totalAnswers}`}
                    </Snackbar>
            });
        }
    }

    componentWillUnmount() {
        if (this.state.snackbar)
            this.props.setFormData("quizresults", null)
    }

    render() {
        const {id, setPage, quizes, setFormData} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>Викторины</PanelHeader>
                {quizes.map(quiz => (<Cell
                    key={quiz.id}
                    multiline
                    size="l"
                    description={quiz.description}
                    asideContent={`${this.state.passedQuizes ? this.state.passedQuizes[quiz.id] ?? "0" : "0"}/${quiz.questions.length}`}
                    bottomContent={
                        <Button mode="primary" onClick={() => {
                            let shuffledQuestions = quiz.questions.slice(0)
                            shuffledQuestions.sort(shuffler)
                            shuffledQuestions.forEach(q => q.answers.sort(shuffler))
                            setFormData("quiz", {
                                quiz: {...quiz, questions: shuffledQuestions}, tech: {
                                    next: randomInteger(0, quiz.questions.length - 1),
                                    rightAnswers: 0,
                                    passed: []
                                }
                            })
                            setPage("quiz", "quiz")
                        }}>Принять участие</Button>
                    }
                >
                    {quiz.name}
                </Cell>))}

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
    setPage,
    goBack,
    openPopout,
    closePopout,
    openModal,
    setFormData
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizPanel);
