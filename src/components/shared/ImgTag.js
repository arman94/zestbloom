import React from 'react';
import { Tag } from 'components/shared';
import { NavLink } from 'react-router-dom';

const ImgTag = ({ src, alt, tag, className, asset_id }) => {
    return (
        <div className={`img-tag ${className}`}>
            <NavLink to={asset_id ? `/asset/${asset_id}` : '/'} className="img-tag-link">
                {tag && <Tag text={tag} className="secondary sm top-left rotated" />}
                <img src={src} alt={alt} />
            </NavLink>
        </div>
    );
};

export default ImgTag;
