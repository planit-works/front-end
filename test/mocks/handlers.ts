import { rest } from 'msw';

const BaseURL: string = 'https://www.planit.p-e.kr/api';
//verifyLogin
export const handlers = [
  rest.get(`${BaseURL}/auth/verify`, (req, res, ctx) => {
    return res(
      ctx.json({
        userId: 3,
        profile: {
          nickname: 'testtzzz',
          avatarUrl: 'avatars/1680088872165',
        },
      }),
    );
  }),

  // rest.get(`${BaseURL}/users?q=ttest&page=1`, (req, res, ctx) => {
  //   return res(
  //     ctx.json([
  //       {
  //         profiles: [
  //           {
  //             profileId: 15,
  //             userId: 14,
  //             nickname: 'testt2',
  //             avatarUrl: 'avatars/undefined',
  //             bio: null,
  //             isFollowing: false,
  //           },
  //           {
  //             profileId: 16,
  //             userId: 15,
  //             nickname: 'testt3',
  //             avatarUrl: 'avatars/undefined',
  //             bio: null,
  //             isFollowing: false,
  //           },
  //           {
  //             profileId: 17,
  //             userId: 16,
  //             nickname: 'testt4',
  //             avatarUrl: 'avatars/undefined',
  //             bio: null,
  //             isFollowing: false,
  //           },
  //           {
  //             profileId: 18,
  //             userId: 17,
  //             nickname: 'testt5',
  //             avatarUrl: 'avatars/undefined',
  //             bio: null,
  //             isFollowing: false,
  //           },
  //           {
  //             profileId: 4,
  //             userId: 3,
  //             nickname: 'testtzzz',
  //             avatarUrl: 'avatars/1680088872165',
  //             bio: '- jj\n1. sdssd\n## sss',
  //             isFollowing: false,
  //           },
  //         ],
  //         paginationInfo: {
  //           currentPage: 1,
  //           hasNextPage: true,
  //           hasPreviousPage: false,
  //         },
  //       },
  //     ]),
  //   );
  // }),
];
