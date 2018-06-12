import sys from 'system-components';
import { Box } from 'rebass';

export const AvatarStyle = sys(
  {
    is: Box,
    border: 2,
    borderRadius: 2,
    bg: 'avatarBg'
  },
  props => ({
    background: props.avatar
      ? `url(${props.avatar}) no-repeat center center /cover`
      : undefined
  })
);

export const Avatar = sys({
  is: AvatarStyle,
  height: [100, 150, 240],
  width: [100, 150, 1]
});

export const MiniAvatar = sys({
  is: AvatarStyle,
  height: '70px',
  width: '70px'
});

export default Avatar;
