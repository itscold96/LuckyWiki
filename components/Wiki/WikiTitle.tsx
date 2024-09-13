import ProfileType from '@/types/types';
import Image from 'next/image';
import styles from './WikiTitle.module.scss';
import { useCopyLink } from '@/hooks/useCopyLink';
import { useSnackBar } from '@/contexts/SnackbarProvider';

interface WikiTitleProps {
  profile: ProfileType;
  isEditing: boolean;
  sameId: boolean;
  onOpenModalButtonClick: () => void;
}

export default function WikiTitle({ profile, isEditing, sameId, onOpenModalButtonClick }: WikiTitleProps) {
  const { copyLink } = useCopyLink();
  const { openSnackBar } = useSnackBar();
  const LINK_URL = `https://www.wikied.kr/wiki/${profile.code}`;

  const handleCopyButtonClick = () => {
    copyLink(LINK_URL);
    openSnackBar({ type: 'success', content: '링크가 복사되었습니다.' });
  };

  return (
    <>
      <div className={styles.wikiTitle}>
        <header>
          <h1>{profile.name}</h1>
          {sameId ? (
            <button onClick={onOpenModalButtonClick}>이어서 편집</button>
          ) : (
            <button disabled={isEditing} onClick={onOpenModalButtonClick}>
              {isEditing ? '편집 중' : '위키 참여하기'}
            </button>
          )}
        </header>
        <button className={styles.linkButton} onClick={handleCopyButtonClick}>
          <Image src="/icon/icon-link.png" alt="링크 아이콘" width={20} height={20} />
          <p>{LINK_URL}</p>
        </button>
      </div>
    </>
  );
}
