import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage, setStory} from '../../store/router/actions';

import {
    Avatar,
    Button,
    Cell,
    Div,
    Group,
    Header,
    Panel,
    PanelHeader,
    RichCell,
    SimpleCell,
    Slider
} from "@vkontakte/vkui"

import {setFormData} from "../../store/formData/actions";
import Icon28Play from '@vkontakte/icons/dist/28/play';
import Icon28Pause from '@vkontakte/icons/dist/28/pause';
import Icon28SongOutline from '@vkontakte/icons/dist/28/song_outline';
import {IOS} from "../../constants/platforms";
import {APICall} from "../../services/VK";
import moment from "moment";
import "moment/locale/ru"

const getCommentsData = {
    group_id: 196785510,
    topic_id: 41913717,
    extended: true,
    count: 15,
    sort: 'desc'
}

class RadioPanel extends React.Component {

    state = {
        volume: this.props.platform === IOS ? 1.0 : 0.5,
        isPlaying: false,
        ...this.props.inputData["radio_volume"],
        comments: [],
        commenters: {}
    }

    constructor(props) {
        super(props);
        moment.locale("ru")

        //    board.getComments
        APICall("board.getComments", getCommentsData).then((data) => {
            const comments = data.items
            const commenters = {}
            for (const profile of data.profiles)
                commenters[profile.id] = profile
            for (const group of data.groups)
                commenters[-group.id] = group
            for (const comment of comments)
                if (comment.attachments) {
                    comment.audio = []
                    for (const attachment of comment.attachments) {
                        if (attachment.type === 'audio') {
                            comment.audio.push(attachment.audio)
                        }
                    }
                }
            this.setState({comments, commenters})
        })
    }

    componentWillUnmount() {
        this.props.setFormData("radio_volume", {volume: this.state.volume})
    }

    toggleRadio() {
        this.setState({isPlaying: !this.state.isPlaying})
        this._radio.volume = this.state.volume
    }

    volumeChange(volume) {
        this.setState({volume})
        this._radio.volume = this.state.volume
    }

    render() {
        const {id} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>Радио Amazing</PanelHeader>
                <Div>
                    <Cell
                        size={"l"}
                        before={<Avatar mode="image"
                                        src="https://sun9-60.userapi.com/Lt-G-lLRG3cM7LeT_AKb5I4ai0H22cyXhdar-w/qU6dZKESAZA.jpg"
                                        size={80}/>}
                        description="Официальное радио"
                        multiline
                        style={{marginBottom: 64}}
                        asideContent={<Button mode="outline" onClick={() => this.toggleRadio()}>{this.state.isPlaying ?
                            <Icon28Pause/> :
                            <Icon28Play/>}</Button>}
                        bottomContent={
                            this.props.platform === IOS ? "" :
                                <Slider
                                    min={0}
                                    max={1}
                                    value={Number(this.state.volume)}
                                    onChange={volume => this.volumeChange(volume)}
                                />}>

                        Amazing Live
                    </Cell>

                    {/*<Placeholder
                        icon={<Icon28HeadphonesOutline width={56} height={56}/>}
                        header="Другие радиостанции"
                    >
                        Скоро мы добавим дополнительные радиостанции, <br/> чтобы играть было гораздо веселее!
                    </Placeholder>*/}
                    <Group>
                        <Header mode="secondary">Музыкальные пожелания</Header>
                        {this.state.comments.map((comment) => {
                            const commenter = this.state.commenters[comment.from_id]
                            console.log(comment)
                            return (
                                <RichCell
                                    key={`radiocomment_${comment.id}`}
                                    before={<Avatar size={48} src={commenter.photo_50}/>}
                                    text={comment.text}
                                    caption={moment(comment.date * 1000).fromNow()}
                                    href={`//vk.com/topic-${getCommentsData.group_id}_${getCommentsData.topic_id}?post=${comment.id}`}
                                    target="_blank"
                                    style={{margin: '10px 0'}}
                                    multiline={true}
                                    bottom={comment.audio && <div>{comment.audio.map((audio) => (
                                        <SimpleCell
                                            disabled
                                            key={`commentaudio_${audio.id}`}
                                            before={<Avatar
                                                mode="image"
                                                size={48}
                                                style={{background: "var(--background_light)"}}>
                                                <Icon28SongOutline/>
                                            </Avatar>}
                                            description={audio.artist}>
                                            {audio.title}
                                        </SimpleCell>
                                    ))}</div>}
                                >
                                    {commenter.name ?? `${commenter.first_name} ${commenter.last_name}`}
                                </RichCell>
                            )
                        })}
                        <div style={{marginTop: 12}}>
                            <Button mode={"primary"}
                                    href={`//vk.com/topic-${getCommentsData.group_id}_${getCommentsData.topic_id}`}
                                    target="_blank"
                                    stretched>
                                Оставить пожелание
                            </Button>
                        </div>
                    </Group>
                </Div>
                <audio src={this.state.isPlaying && this.props.isAppOpen ? "https://radio.amazing-rp.ru/live" : ""}
                       autoPlay={true}
                       ref={(a) => this._radio = a}/>
            </Panel>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        inputData: state.formData.forms,
        isAppOpen: state.vkui.isAppOpen,
        platform: state.vkui.platform
    };
};

const mapDispatchToProps = {
    setPage,
    setStory,
    goBack,
    openPopout,
    closePopout,
    openModal,
    setFormData
};

export default connect(mapStateToProps, mapDispatchToProps)(RadioPanel);
