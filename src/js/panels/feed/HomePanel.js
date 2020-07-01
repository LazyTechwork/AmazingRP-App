import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import {Cell, Panel, PanelHeader, Separator, Title, Button} from "@vkontakte/vkui"
import Carousel from "../../components/Carousel/Carousel";

import "./newsfeed.css"

class HomePanel extends React.Component {

    render() {
        const {id, banners, news} = this.props;
        const posts = news.length > 0
            && news.map((post) => (
                <div key={post.id}>
                    <Cell
                        size="l"
                        expandable
                        multiline
                        onClick={() => {

                        }}
                        bottomContent={(
                            <div>
                                <div className="post_td">
                                    <div className="post_tags">
                                        {post.tags.map((tag, id) => (
                                            <Button mode="secondary" key={id} style={{marginRight: "10px"}}>{`#${tag.toLowerCase()}`}</Button>
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
    openModal
};

export default connect(null, mapDispatchToProps)(HomePanel);
