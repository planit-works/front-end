import axios from 'axios';

export const getPresignedUrl = async () => {
  const S3FolderName = 'avatars';
  try {
    const { data } = await axios.post(`/getPresignedUrl`, {
      folder: `${S3FolderName}`,
    });
    const endpoint = data.substring(
      data.indexOf(`${S3FolderName}`) + (`${S3FolderName}`.length + 1),
    );

    return endpoint;
  } catch (error) {
    if (error instanceof Error) {
      throw Error('이미지 업로드에 실패하였습니다');
    }
  }
};

export const uploadProfileImg = async (EndPoint: string, File: File) => {
  try {
    const { data } = await axios.put(`/upload-s3/${EndPoint}`, File, {
      headers: {
        'Content-Type': File?.type,
      },
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error('이미지 업로드에 실패하였습니다');
    }
  }
};
