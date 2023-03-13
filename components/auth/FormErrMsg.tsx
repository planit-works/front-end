import useAuthValid from 'hooks/useAuthValid';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
type ErrCheck = {
  error: FieldErrors<{
    email: string;
    password: string;
    pwdCheck: string;
    nickname: string;
    imageFile: Array<File>;
  }>;
  checkDirty: boolean;
};

export function EmailErrMsg({ error, checkDirty }: ErrCheck) {
  const { patternErr, LengthErr } = useAuthValid(error.email?.type);

  return (
    <div className={`${checkDirty || 'invisible'} mt-2 text-amber-500`}>
      <p className={`${patternErr || ' invisible'} `}>
        이메일 형식을 지켜주세요
      </p>
      <p className={`${LengthErr || 'invisible'} `}>
        10자 이상 40자 이하로 작성해주세요
      </p>
    </div>
  );
}

export function PwdErrMsg({ error, checkDirty }: ErrCheck) {
  const { patternErr, LengthErr } = useAuthValid(error.password?.type);

  return (
    <div className={`${checkDirty || 'invisible'} mt-2 text-amber-500`}>
      <p className={`${patternErr || ' invisible'} `}>
        소문자/숫자/특수문자($@$!%*?&만 허용) 최소 1자 포함
      </p>
      <p className={`${LengthErr || 'invisible'} `}>
        8자 이상 16자 이하로 작성해주세요
      </p>
    </div>
  );
}

export function PwdCheckErrMsg({ error, checkDirty }: ErrCheck) {
  return (
    <div className={`${checkDirty || 'invisible'} mt-2 text-amber-500`}>
      <p className={`${error.pwdCheck?.type || ' invisible'} `}>
        Password가 일치하지 않습니다
      </p>
    </div>
  );
}

export function NickNameErrMsg({ error, checkDirty }: ErrCheck) {
  return (
    <div className={`${checkDirty || 'invisible'} mt-2 text-amber-500`}>
      <p className={`${error.nickname?.type || ' invisible'} `}>
        2자 이상 10자 이하로 작성해주세요
      </p>
    </div>
  );
}

export function ProfileImgErrMsg({ error, checkDirty }: ErrCheck) {
  return (
    <div className={`${checkDirty || 'invisible'} mt-2 text-amber-500`}>
      <p className={`${error.imageFile?.type || ' invisible'} `}>
        이미지 형식의 파일만 등록할 수 있습니다
      </p>
    </div>
  );
}
