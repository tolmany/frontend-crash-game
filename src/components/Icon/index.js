import classNames                        from 'classnames';
import IconType                          from './IconType';
import React                             from 'react';
import SelectionHelper                   from '../../helper/SelectionHelper';
import style                             from './styles.module.scss';
import { ReactComponent as IconCheck }   from '../../data/icons/check.svg';
import { ReactComponent as IconError }   from '../../data/icons/error.svg';
import { ReactComponent as IconInfo }    from '../../data/icons/info.svg';
import { ReactComponent as IconSuccess } from '../../data/icons/success.svg';
import { ReactComponent as IconX }       from '../../data/icons/x-circle.svg';

const Icon = ({ className, iconType, onClick }) => {
    const renderIcon = () => {
        return SelectionHelper.get(
            iconType,
            {
                [IconType.check]:   <IconCheck />,
                [IconType.error]:   <IconError />,
                [IconType.info]:    <IconInfo />,
                [IconType.success]: <IconSuccess />,
                [IconType.x]:       <IconX />,
            },
        );
    };

    return (
        <span
            className={classNames(style.icon, className)}
            onClick={onClick}
        >
            {renderIcon()}
        </span>
    );
};

export default Icon;
