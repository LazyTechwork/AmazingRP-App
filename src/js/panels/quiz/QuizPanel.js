import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import {Button, Panel, PanelHeader, Cell} from "@vkontakte/vkui"

import {setFormData} from "../../store/formData/actions";

class ProfilePanel extends React.Component {

    render() {
        const {id, setPage, quizes} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>Викторины</PanelHeader>
                {quizes.map(quiz => (<Cell
                    multiline
                    size="l"
                    description={quiz.description}
                    asideContent="10/10"
                    bottomContent={
                        <Button>Принять участие</Button>
                    }
                >
                    {quiz.name}
                </Cell>))}
            </Panel>
        );
    }

}

const mapDispatchToProps = {
    setPage,
    goBack,
    openPopout,
    closePopout,
    openModal,
    setFormData
};

export default connect(null, mapDispatchToProps)(ProfilePanel);
