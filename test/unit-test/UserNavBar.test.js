import { render, screen } from '../utils/test-query-provider';
import UserEvent from '@testing-library/user-event';
import UserAccountBtn from '@/components/navBar/UserAccountBtn';

jest.mock('@/components/navBar/UserMenu', () => ({
  //객체에서 key-value를 정의할 때와 비슷하다
  UserMenuList: () => {
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
  },
}));

describe('<UserAccountBtn />', () => {
  const user = UserEvent.setup();
  it('clicked', async () => {
    const { container } = render(
      <UserAccountBtn
        userInfo={{
          userId: jest.fn(),
          profile: {
            nickname: jest.fn(),
            avatarUrl: jest.fn(),
          },
        }}
      />,
    );

    const userAccountBtn = screen.getByRole('button');
    await user.click(userAccountBtn);
    //UserAccountBtn의 버튼 클릭 시 메뉴 리스트 등장
    expect(container.querySelector('#dummy-menu-list')).toBeInTheDocument();
    await user.click(userAccountBtn);
    //한 번 더 클릭하면 메뉴 리스트 사라짐
    expect(container.querySelector('#dummy-menu-list')).not.toBeInTheDocument();
  });
});
