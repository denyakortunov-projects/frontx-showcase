import { Avatar, AvatarFallback, AvatarGroup } from '@gears-frontx/ui-kit';
import '@gears-frontx/ui-kit/theme.css';

export default function PeopleExample() {
  return <AvatarGroup aria-label="Project members">
    <Avatar aria-label="Alex Morgan"><AvatarFallback>AM</AvatarFallback></Avatar>
    <Avatar aria-label="Jamie Kim"><AvatarFallback>JK</AvatarFallback></Avatar>
    <Avatar aria-label="Riley Lee"><AvatarFallback>RL</AvatarFallback></Avatar>
  </AvatarGroup>;
}
