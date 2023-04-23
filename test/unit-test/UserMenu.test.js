import { render, screen } from '../utils/test-query-provider';
import UserEvent from '@testing-library/user-event';
import { UserMenuLinked, UserMenuBtn } from '@/components/navBar/UserMenu';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('<UserMenuList />', () => {
  const user = UserEvent.setup();

  it('clicked rendered component <UserMenuLinked/>', async () => {
    const router = { push: jest.fn() };
    useRouter.mockReturnValue(router);

    render(<UserMenuLinked name="My Page" link="/my-page" />);
    const userMenuLinkedBtn = screen.getByRole('button');
    await user.click(userMenuLinkedBtn);
    expect(router.push).toHaveBeenCalled();
  });

  it('clicked rendered component <UserMenuBtn/>', async () => {
    const onLogOut = jest.fn();

    render(<UserMenuBtn name="Log Out" execution={onLogOut} />);
    const userMenuBtn = screen.getByRole('button');
    await user.click(userMenuBtn);
    expect(onLogOut).toHaveBeenCalled();
  });
});
