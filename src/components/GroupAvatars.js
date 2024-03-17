import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

export default function GroupAvatars({ images }) {
    return (
        <AvatarGroup max={4}>
            {
                images.map((item, index) => {
                    return (
                        <Avatar alt="Remy Sharp" src={item} key={index} />
                    )
                })
            }
        </AvatarGroup>
    );
}