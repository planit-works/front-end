import {
  render,
  screen,
  fireEvent,
  renderHook,
  useCustomHook,
  createQueryWrapper,
  waitFor,
  logRoles,
} from '../utils/test-query-provider';
import UserEvent from '@testing-library/user-event';
import TodoItemPlus from '@/components/home/MainSide/TodoItemPlus';
import {
  getParsedLocalStorageItem,
} from '../../utils/localStorage';

describe.skip('<TodoInput />', () => {
  const user = UserEvent.setup();
  it('checkItemInLocalStorage', async () => {
    const { container } = render(<TodoItemPlus />);
    logRoles(container);
    const TodoInput = screen.getByPlaceholderText('New Todo');
    //input 타이핑 후 엔터 -> 로컬 스토리지 등록 확인
    await user.clear(TodoInput);
    await user.type(TodoInput, 'test');
    await user.keyboard('[Enter]');
    expect(getParsedLocalStorageItem('todo-list')[0].title).toBe('test');
  });
});

describe.skip('test react-query', () => {
  const { result } = renderHook(() => useCustomHook(), {
    wrapper: createQueryWrapper(),
  });
  it('useGetUserProfile', async () => {
    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual('Hello');
  });
});
