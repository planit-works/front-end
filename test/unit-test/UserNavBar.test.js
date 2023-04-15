import {
  render,
  screen,
  renderHook,
  useCustomHook,
  createQueryWrapper,
  waitFor,
  logRoles,
} from '../utils/test-query-provider';
import UserEvent from '@testing-library/user-event';
import UserAccountBtn from '@/components/navBar/UserAccountBtn';
import { getParsedLocalStorageItem } from '../../utils/localStorage';
import { UserMenuLinked, UserMenuBtn } from '@/components/navBar/UserMenu';

jest.mock('@/components/navBar/UserMenu', () => {
  return function UserMenuList() {
    return (
      <ul id="dummy-menu-list">
        <li>
          <button>My Page</button>
        </li>
        <li>
          <button>LogOut</button>
        </li>
      </ul>
    );
  };
});

describe('<UserAccountBtn />', () => {
  const user = UserEvent.setup();
  it('clicked', async () => {
    const { container } = render(
      <UserAccountBtn
        userInfo={{
          userId: 3,
          profile: {
            nickname: 'testtzzz',
            avatarUrl: 'avatars/1680088872165',
          },
        }}
      />,
    );

    const userAccountBtn = screen.getByRole('button', { name: 'testtzzz' });
    await user.click(userAccountBtn);
    //UserAccountBtn의 버튼 클릭 시 메뉴 리스트 등장
    expect(container.querySelector('#dummy-menu-list')).toBeInTheDocument();
    await user.click(userAccountBtn);
    //한 번 더 클릭하면 메뉴 리스트 사라짐
    expect(container.querySelector('#dummy-menu-list')).not.toBeInTheDocument();
    logRoles(container);
  });
});
