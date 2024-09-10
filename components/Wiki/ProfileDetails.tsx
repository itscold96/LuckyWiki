import ProfileType from '@/types/types';
import Image from 'next/image';
import styles from './ProfileDetail.module.scss';
import { useState } from 'react';

interface ProfileDetailProps {
  profile: ProfileType;
}

export default function ProfileDetails({ profile }: ProfileDetailProps) {
  const profileImage = profile.image || '/icon/icon-profile.png';
  const [isMoreView, setIsMoreView] = useState(false);

  const handleButtonClick = () => {
    setIsMoreView(prev => !prev);
  };

  const hideOrView = isMoreView ? '' : styles.hide;

  return (
    <>
      <div className={styles.profileDetail}>
        <section className={styles.profileImage}>
          <Image src={profileImage} className={styles.image} alt="프로필 이미지" width={200} height={200} />
        </section>
        <div className={styles.profileInfo}>
          <section className={styles.profileKey}>
            <p>거주 도시</p>
            <p>MBTI</p>
            <p>직업</p>
            <p className={hideOrView}>SNS 계정</p>
            <p className={hideOrView}>생일</p>
            <p className={hideOrView}>별명</p>
            <p className={hideOrView}>혈액형</p>
            <p className={hideOrView}>국적</p>
          </section>
          <section className={styles.profileValue}>
            <p>{profile.city}</p>
            <p>{profile.mbti}</p>
            <p>{profile.job}</p>
            <a className={hideOrView} href={profile.sns} target="_blank" rel="noopener noreferrer">
              <Image src="/icon/icon-instagram.png" alt="sns 아이콘" width={24} height={24} />
            </a>
            <p className={hideOrView}>{profile.birthday}</p>
            <p className={hideOrView}>{profile.nickname}</p>
            <p className={hideOrView}>{profile.bloodType}</p>
            <p className={hideOrView}>{profile.nationality}</p>
          </section>
        </div>
      </div>
      <button onClick={handleButtonClick}>
        <Image
          className={styles.profileButton}
          src={isMoreView ? '/icon/icon-less-button.png' : '/icon/icon-more-button.png'}
          alt="프로필 토글 버튼 아이콘"
          width={24}
          height={24}
        />
      </button>
    </>
  );
}
