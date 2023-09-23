import React from 'react'
import type { NextPage } from 'next'
import { HeaderWithBody } from '../components/layouts/HeaderWithBody';
import { AuthorForm } from '@/components/pages/author_form';
import { PublisherForm } from '@/components/pages/publisher_form';
import { ConferenceAndJournalForm } from '@/components/pages/conference_and_journal_form';
import { AuthorTable } from '../components/pages/author_table';
import { PublisherTable } from '../components/pages/publisher_table';
import { ConferenceAndJournalTable } from '@/components/pages/conference_and_journal_table';

type SettingsKind = 'author' | 'conference' | 'publisher'

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
                <div className='p-4'>
                  <AuthorForm />
                  <AuthorTable />
                </div>
                
              ) : (
                kind === 'conference' ? (
                  <div className='p-4'>
                    <ConferenceAndJournalForm />
                    <ConferenceAndJournalTable />
                  </div>
                ) : (
                  <div className='p-4'>
                    <PublisherForm />
                    <PublisherTable />
                  </div>
                )
              )
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
      <div className={kind=="conference" ? selectedStyle : normalStyle} onClick={() => setKind('conference')}>
        会議、ジャーナル
      </div>
      <div className={kind=="publisher" ? selectedStyle : normalStyle} onClick={() => setKind('publisher')}>
        出版社
      </div>
    </div>
  )
}