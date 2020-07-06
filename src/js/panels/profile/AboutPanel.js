import React from 'react';
import {connect} from 'react-redux';

import {goBack} from '../../store/router/actions';
import {setFormData} from "../../store/formData/actions";
import {Avatar, Div, Group, Header, Panel, PanelHeader, PanelHeaderBack, SimpleCell} from "@vkontakte/vkui";
import {APP_BUILD, APP_NAME, APP_VERSION} from "../../constants/appinfo";

class AboutPanel extends React.Component {

    render() {
        const {id, goBack} = this.props;
        const devinfo = this.props.devinfo

        return (
            <Panel id={id}>
                <PanelHeader
                    left={<PanelHeaderBack onClick={() => goBack()}/>}
                >
                    О нас и приложении
                </PanelHeader>
                <Div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    marginTop: 16
                }}>
                    <Avatar mode="app"
                            src="https://sun9-60.userapi.com/Lt-G-lLRG3cM7LeT_AKb5I4ai0H22cyXhdar-w/qU6dZKESAZA.jpg"
                            size={100}/><br/>
                    {`${APP_NAME} ${APP_VERSION} (${APP_BUILD})`}
                </Div>
                {devinfo && <Div>
                    <Group header={<Header mode="secondary">Команда приложения</Header>}>
                        <SimpleCell
                            description="Разработчик"
                            before={<Avatar src={devinfo[242521347].photo}/>}
                            href="//vk.com/id242521347"
                            target="_blank"
                        >
                            {devinfo[242521347].name}
                        </SimpleCell>
                        <SimpleCell
                            description="Разработчик"
                            before={<Avatar src={devinfo[595756916].photo}/>}
                            href="//vk.com/id595756916"
                            target="_blank"
                        >
                            {devinfo[595756916].name}
                        </SimpleCell>
                        <SimpleCell
                            description="Менеджер"
                            before={<Avatar src={devinfo[448368288].photo}/>}
                            href="//vk.com/id448368288"
                            target="_blank"
                        >
                            {devinfo[448368288].name}
                        </SimpleCell>
                    </Group>
                </Div>}
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutPanel);
