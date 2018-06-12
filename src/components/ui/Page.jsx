import sys from 'system-components';
import { Container } from './Container';
import { Column } from './Column';

export const Page = sys({
  is: Container,
  py: [1, 2]
});

export const Sidebar = sys({
  is: Column,
  py: [2, 3],
  w: [1, 1 / 3]
});

Page.Sidebar = Sidebar;

export const Body = sys({
  is: Column,
  py: [2, 3],
  w: [1, 2 / 3]
});

Page.Body = Body;

export default Page;
