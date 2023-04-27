import { render, screen, logRoles } from '../utils/test-query-provider';
import UserEvent from '@testing-library/user-event';
import AuthBtnTemplate from '@/components/auth/AuthBtnTemplate';

describe('<AuthBtnTemplate />', () => {
  const user = UserEvent.setup();
  it('clicked', async () => {
    const { container } = render(
      <AuthBtnTemplate />,
    );

    Object.defineProperty(window, "location", {
        value: new URL("http://localhost:8000/login"),
        configurable: true,
        writable: true,
      });
    
    const linkBtn = screen.getByText('계정이 없어도 이용할 수 있습니다!');
    expect(location.pathname).toEqual('/login');
    await user.click(linkBtn);
    logRoles(container);
    

  });
});
