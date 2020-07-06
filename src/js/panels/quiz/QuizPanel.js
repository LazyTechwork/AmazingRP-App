import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';
import Icon24Play from '@vkontakte/icons/dist/24/play';

import {Button, Cell, Panel, PanelHeader} from "@vkontakte/vkui"

import {setFormData} from "../../store/formData/actions";
import {randomInteger} from "../../services/_functions";

const shuffler = () => Math.random() - 0.5

class QuizPanel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            passedQuizes: {}
        }
    }

    componentDidMount() {
        this.setState({passedQuizes: JSON.parse(localStorage.getItem("quizresults"))})
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
                    asideContent={<Button mode="primary" onClick={() => {
                        let shuffledQuestions = quiz.questions.slice(0)
                        shuffledQuestions.sort(shuffler)
                        shuffledQuestions.forEach(q => q.answers.sort(shuffler))
                        setFormData("quiz", {
                            quiz: {...quiz, questions: shuffledQuestions}, tech: {
                                next: randomInteger(0, quiz.questions.length - 1),
                                rightAnswers: 0,
                                passed: []
                            }, started: false
                        })
                        setPage("quiz", "start")
                    }}><Icon24Play/></Button>}
                    bottomContent={
                        `Предыдущая игра: ${this.state.passedQuizes ? this.state.passedQuizes[quiz.id] ?? "0" : "0"}/${quiz.questions.length}`
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
