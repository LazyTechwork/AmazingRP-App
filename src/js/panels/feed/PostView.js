import React from 'react';
import {connect} from 'react-redux';

import {goBack} from '../../store/router/actions';
import {setFormData} from "../../store/formData/actions";

import {Div, Panel, PanelHeader, PanelHeaderBack, Text, Title} from "@vkontakte/vkui";

class PostView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            post: props.inputData['postview'] || {title: '', content: ''}
        };
    }

    render() {
        const {id, goBack} = this.props;
        const {title, content} = this.state.post;

        return (
            <Panel id={id}>
                <PanelHeader
                    left={<PanelHeaderBack onClick={() => goBack()}/>}
                >
                    Просмотр поста
                </PanelHeader>
                <Div>
                    <Title level="1" weight="semibold" style={{marginBottom: 16}}>{title}</Title>
                    <Text weight="regular" style={{marginBottom: 16}}>{content}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostView);