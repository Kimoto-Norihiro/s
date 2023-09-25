import React from 'react'
import type { NextPage } from 'next'
import { HeaderWithBody } from '../components/layouts/HeaderWithBody';
import { AuthorPage } from '@/components/pages/settings/AuthorPage';
import { PublisherPage } from '@/components/pages/settings/PublisherPage';
import { TagPage } from '@/components/pages/settings/TagPage';
import { JournalInfoPage }  from '@/components/pages/settings/JournalInfoPage';
import { JournalEvaluationPage } from '@/components/pages/settings/JournalEvaluationPage';
import { InternationalConferenceInfoPage } from '@/components/pages/settings/InternationalConferenceInfoPage';
import { InternationalConferenceEvaluationPage } from '@/components/pages/settings/InternationalConferenceEvaluationPage';
import { DomesticConferenceInfoPage } from '@/components/pages/settings/DomesticConferenceInfoPage';
import { AwardOrganizationPage } from '@/components/pages/settings/AwardOrganizationPage';
import { CountryPage } from '@/components/pages/settings/CountryPage';

type SettingsKind = 'author' 
| 'publisher' 
| 'tag' 
| 'country'
| 'journal_info' 
| 'journal_evaluation' 
| 'international_conference_info' 
| 'international_conference_evaluation'
| 'domestic_conference_info'
| 'award_organization'


export const Settings: NextPage = () => {
	const [kind, setKind] = React.useState<SettingsKind>('author')

  return (
    <HeaderWithBody>
			<div className='flex flex-col items-center'>
        <div className='w-full flex flex-col p-5 pb-10 justify-center'>
          <SettingTab kind={kind} setKind={setKind} />
          <div>
            {
              kind === 'author' ? (
                <AuthorPage/>
              ) : (
              kind === 'publisher' ? (
                <PublisherPage/>
              ) : (
              kind === 'tag' ? (
                <TagPage />
              ) : (
              kind === 'country' ? (
                <CountryPage />
              ) : (
              kind === 'journal_info' ? (
                <JournalInfoPage />
              ) : (
              kind === 'journal_evaluation' ? (
                <JournalEvaluationPage />
              ) : (
              kind === 'international_conference_info' ? (
                <InternationalConferenceInfoPage />
              ) : (
              kind === 'international_conference_evaluation' ? (
                <InternationalConferenceEvaluationPage />
              ) : (
              kind === 'domestic_conference_info' ? (
                <DomesticConferenceInfoPage />
              ) : (
              kind === 'award_organization' ? (
                <AwardOrganizationPage />
              ) : 
                <></>
              )))))))))
            }
          </div>
				</div>
			</div>
    </HeaderWithBody>
  )
}

export default Settings

type SettingTabProps = {
  kind: SettingsKind
  setKind: React.Dispatch<React.SetStateAction<SettingsKind>>
}

const SettingTab = ({kind, setKind}: SettingTabProps) => {
  const normalStyle = 'px-3 py-1'
  const selectedStyle = normalStyle+' bg-black text-white rounded-t-md'

  return (
    <div className='flex border-b-2 border-black'>
      <div className={kind=="author" ? selectedStyle : normalStyle} onClick={() => setKind('author')}>
        著者
      </div>
      <div className={kind=="publisher" ? selectedStyle : normalStyle} onClick={() => setKind('publisher')}>
        出版社
      </div>
      <div className={kind=="tag" ? selectedStyle : normalStyle} onClick={() => setKind('tag')}>
        分野タグ
      </div>
      <div className={kind=="country" ? selectedStyle : normalStyle} onClick={() => setKind('country')}>
        国
      </div>
      <div className={kind=="journal_info" ? selectedStyle : normalStyle} onClick={() => setKind('journal_info')}>
        ジャーナル情報
      </div>
      <div className={kind=="journal_evaluation" ? selectedStyle : normalStyle} onClick={() => setKind('journal_evaluation')}>
        ジャーナル評価
      </div>
      <div className={kind=="international_conference_info" ? selectedStyle : normalStyle} onClick={() => setKind('international_conference_info')}>
        国際会議情報
      </div>
      <div className={kind=="international_conference_evaluation" ? selectedStyle : normalStyle} onClick={() => setKind('international_conference_evaluation')}>
        国際会議評価
      </div>
      <div className={kind=="domestic_conference_info" ? selectedStyle : normalStyle} onClick={() => setKind('domestic_conference_info')}>
        国内会議情報
      </div> 
      <div className={kind=="award_organization" ? selectedStyle : normalStyle} onClick={() => setKind('award_organization')}>
        表彰団体
      </div>
    </div>
  )
}