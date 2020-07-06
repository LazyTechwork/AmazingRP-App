import React from 'react';
import {connect} from 'react-redux';

import {goBack, setPage, setStory} from '../../store/router/actions';
import {setFormData} from "../../store/formData/actions";

import {
    Avatar,
    Button,
    Card,
    CardGrid,
    Div,
    Headline,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Snackbar,
    Title
} from "@vkontakte/vkui";
import Icon16Done from '@vkontakte/icons/dist/16/done';
import Icon16Cancel from '@vkontakte/icons/dist/16/cancel';
import {randomInteger} from "../../services/_functions";

const greenBg = {
    backgroundColor: 'var(--dynamic_green)'
};
const redBg = {
    backgroundColor: 'var(--dynamic_red)'
};
const nextQuestionTimer = 3;

class QuizProcess extends React.Component {

    constructor(props) {
        super(props);

        if (!props.inputData['quiz']) {
            this.props.setStory("quiz", "list")
        }
        this.state = {
            quiz: props.inputData['quiz'] || null,
            answered: false,
            isRightAnswer: false,
            selected: 0,
            timer: nextQuestionTimer,
            interval: null,
            snackbar: null
        };

        if (this.state.quiz && !this.state.quiz.started) {
            this.props.setStory("quiz", "list")
        }
    }

    rightAnswer(index) {
        if (this.state.answered)
            return
        this.setState({selected: index, isRightAnswer: true, answered: true})
        const tech = this.state.quiz.tech
        const quiz = this.state.quiz.quiz
        this.setState({
            quiz: {
                tech: {
                    ...tech,
                    rightAnswers: tech.rightAnswers + 1,
                    passed: [...tech.passed, tech.next]
                },
                quiz: {...quiz}
            }
        })

        this.setState({
            interval: setInterval(() => {
                this.setState({timer: this.state.timer - 1})
                if (this.state.timer <= 0)
                    this.nextQuestion()
            }, 1000)
        })

        this.setState({
            snackbar:
                <Snackbar
                    layout="vertical"
                    onClose={() => this.setState({snackbar: null})}
                    before={<Avatar size={24} style={greenBg}><Icon16Done fill="#fff" width={14}
                                                                          height={14}/></Avatar>}
                >
                    Правильно!
                </Snackbar>
        });
    }

    failAnswer(index) {
        if (this.state.answered)
            return
        this.setState({selected: index, isRightAnswer: false, answered: true})
        const tech = this.state.quiz.tech
        const quiz = this.state.quiz.quiz
        this.setState({
            quiz: {
                tech: {
                    ...tech,
                    passed: [...tech.passed, tech.next]
                },
                quiz: {...quiz}
            }
        })

        this.setState({
            snackbar:
                <Snackbar
                    layout="vertical"
                    onClose={() => this.setState({snackbar: null})}
                    before={<Avatar size={24} style={redBg}><Icon16Cancel fill="#fff" width={14}
                                                                          height={14}/></Avatar>}
                >
                    Неправильно ;(
                </Snackbar>
        });
    }

    nextQuestion() {
        if (this.state.interval !== null) {
            clearInterval(this.state.interval)
            this.setState({interval: null})
        }

        this.setState({snackbar: null})

        const quiz = this.state.quiz.quiz
        const tech = this.state.quiz.tech

        if (tech.passed.length === quiz.questions.length) {
            if (localStorage.getItem("quizresults"))
                localStorage.setItem("quizresults", JSON.stringify({
                    ...JSON.parse(localStorage.getItem("quizresults")),
                    [quiz.id]: tech.rightAnswers
                }))
            else
                localStorage.setItem("quizresults", JSON.stringify({[quiz.id]: tech.rightAnswers}))
            this.props.setFormData("quizresults", {
                quiz: quiz.name,
                rightAnswers: tech.rightAnswers,
                totalAnswers: tech.passed.length
            })
            this.props.setPage("quiz", "finale")
            return
        }

        var next = tech.next
        while (tech.passed.includes(next))
            next = randomInteger(0, quiz.questions.length - 1)

        this.setState({
            quiz: {quiz: {...quiz}, tech: {...tech, next}},
            selected: 0,
            isRightAnswer: false,
            answered: false,
            timer: nextQuestionTimer
        })
    }

    componentWillUnmount() {
        this.props.setFormData("quiz", null)
    }

    render() {
        const {id, setStory} = this.props;
        if (!this.state.quiz)
            return (<Panel id={id}/>)
        const quiz = this.state.quiz.quiz
        const tech = this.state.quiz.tech
        const currentQuestion = quiz.questions[tech.next]

        return (
            <Panel id={id}>
                <PanelHeader
                    left={<PanelHeaderBack onClick={() => setStory("quiz", "list")}/>}
                >
                    {quiz.name}
                </PanelHeader>
                <Div style={{marginTop: 32}}>
                    <CardGrid style={{textAlign: "center", marginBottom: 16}}>
                        <Card size="m" mode="outline">
                            <Div style={{paddingTop: 8, paddingBottom: 8}}>
                                <Headline weight="semibold">Вопрос</Headline>
                                <Title level="1"
                                       weight="heavy">{tech.passed.length + (this.state.answered ? 0 : 1)}/{quiz.questions.length}</Title>
                            </Div>
                        </Card>
                        <Card size="m" mode="outline">
                            <Div style={{paddingTop: 8, paddingBottom: 8}}>
                                <Headline weight="semibold">Правильно</Headline>
                                <Title level="1" weight="heavy">{tech.rightAnswers}</Title>
                            </Div>
                        </Card>
                    </CardGrid>
                    <Title level="1" weight="semibold"
                           style={{marginBottom: 32, textAlign: "center"}}>{currentQuestion.name}</Title>
                    {currentQuestion.answers.map((ans, index) => (<div>
                        <Button
                            stretched
                            key={`answer_${tech.next}_${index}`}
                            mode={this.state.answered && ((this.state.isRightAnswer && this.state.selected === index) || ans.right) ? "commerce" : this.state.answered && this.state.selected === index ? "destructive" : "outline"}
                            onClick={() => {
                                if (ans.right)
                                    this.rightAnswer(index)
                                else
                                    this.failAnswer(index)
                            }}
                            style={{marginBottom: 8}}
                        >{ans.name}</Button>
                    </div>))}
                    {this.state.answered &&
                    <div><Button size="l" onClick={() => this.nextQuestion()} stretched
                                 style={{marginTop: 16}}>
                        {tech.passed.length === quiz.questions.length ? "Перейти к результатам" : "Следующий вопрос"} {this.state.isRightAnswer ? `... ${this.state.timer}` : ""}
                    </Button></div>}
                </Div>

                {this.state.snackbar}

                <div className={`panelDeco ${tech.next % 2 === 0 ? 'deco-1' : 'deco-2'}`}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuizProcess);