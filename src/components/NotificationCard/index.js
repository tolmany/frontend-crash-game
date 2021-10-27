import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './styles.module.scss';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import { EVENT_CATEGORIES } from '../../constants/EventCategories';

const NotificationsItem = ({ notification, onMarkAsRead, events }) => {
  const markNotificationRead = () => {
    onMarkAsRead(notification);
  };

  const tryLoadEventFromPayload = () => {
    if (notification.payload?.eventId) {
      return events?.find(e => e._id === notification.payload.eventId);
    }
    return null;
  };

  const replaceEventWithLink = message => {
    let eventSlug = notification.payload?.eventSlug;
    if (!eventSlug) {
      const event = tryLoadEventFromPayload();
      if (event) {
        eventSlug = event.slug;
      }
    }
    if (eventSlug) {
      const [beforeLink, afterLink] = message.split('[event]');
      return (
        <>
          {beforeLink}
          <Link to={`/trade/${eventSlug}`} onClick={markNotificationRead}>
            event
          </Link>
          {afterLink}
        </>
      );
    }
  };

  const getStickerStyle = () => {
    const event = tryLoadEventFromPayload();
    if (!event) return {};

    const cat = EVENT_CATEGORIES.find(c => c.value === event.category);
    if (!cat) return {};

    return {
      backgroundImage: 'url("' + cat.image + '")',
    };
  };

  const getMessageContent = () => {
    let messageContent = notification.message;
    if (messageContent.indexOf('[event]') > -1) {
      messageContent = replaceEventWithLink(messageContent);
    }

    return (
      <p>
        {notification.payload?.betQuestion && (
          <em>{notification.payload?.betQuestion}</em>
        )}
        {messageContent}
      </p>
    );
  };

  const imageUrl = notification.payload?.imageUrl;

  return (
    <>
      <div key={notification.id} className={style.notificationCardUnread}>
        <div className={style.categorySticker} style={getStickerStyle()} />
        <Icon
          className={style.closeIcon}
          iconType={IconType.deleteInput}
          onClick={markNotificationRead}
        />
        <div className={style.notificationCardContent}>
          <div className={style.notificationMessage}>
            {getMessageContent()}
            {imageUrl ? (
              <img
                className={style.notificationCardThumbnail}
                alt={'notification'}
                src={imageUrl}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    events: state.event.events,
  };
};

export default connect(mapStateToProps, null)(NotificationsItem);
