import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import {Button, Cell, Panel, PanelHeader, Separator, Title} from "@vkontakte/vkui"
import Carousel from "../../components/Carousel/Carousel";
import Icon28ChevronRightOutline from '@vkontakte/icons/dist/28/chevron_right_outline';

import "./newsfeed.css"
import {setFormData} from "../../store/formData/actions";

class HomePanel extends React.Component {

    render() {
        const {id, banners, news, setPage, setFormData} = this.props;
        const posts = news.length > 0
            && news.map((post) => (
                <div key={post.id}>
                    <Cell
                        size="l"
                        multiline
                        asideContent={<Icon28ChevronRightOutline />}
                        onClick={() => {
                            setFormData("postview", post)
                            setPage("home", "postview")
                        }}
                        bottomContent={(
                            <div>
                                <div className="post_td">
                                    <div className="post_tags">
                                        {post.tags.map((tag, id) => (
                                            <Button mode="secondary" key={id}
                                                    style={{marginRight: "10px"}}>{`#${tag.toLowerCase()}`}</Button>
                                        ))}
                                    </div>
                                </div>
                                <div className="post_bot">
                                    <div className="post_date">
                                        {`${post.date} в ${post.time}`}
                                    </div>
                                    <div className="post_author">
                                        {` · ${post.author}`}
                                    </div>
                                </div>
                            </div>
                        )}
                    >
                        <Title level="2" weight="semibold">{post.title}</Title>
                    </Cell>
                    <Separator/>
                </div>
            ));

        return (
            <Panel id={id}>
                <PanelHeader>Новости</PanelHeader>
                <Carousel
                    list={banners}
                    autoplay
                    autoplaySpeed={2500}
                    sizePadding={52.63}
                />
                <div className="posts">{posts}</div>
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

export default connect(null, mapDispatchToProps)(HomePanel);
