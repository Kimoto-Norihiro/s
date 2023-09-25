import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { HeaderWithBody } from '../components/layouts/HeaderWithBody';
import axios from 'axios';
import { Paper } from '@/types/types';
import { PaperForm } from '../components/pages/paper_form';
import { PaperTable } from '../components/pages/paper_table';
import { JournalPage } from '@/components/pages/index/JournalPage';
import { InternationalConferencePage } from '@/components/pages/index/InternationalConferencePage';
import { DomesticConferencePage } from '@/components/pages/index/DomesticConferencePage';
import { AwardPage } from '@/components/pages/index/AwardPage';

type IndexKind = 'journal' 
| 'domestic_conference' 
| 'international_conference' 
| 'award'

export const Home: NextPage = () => {
  const [kind, setKind] = useState<IndexKind>('journal')
  return (
    <HeaderWithBody>
      <div className='w-full flex flex-col p-5 pb-10 justify-center'>
        <IndexTab kind={kind} setKind={setKind} />
        <div>
          {
            kind === 'journal' ? (
              <JournalPage/>
            ) : (
            kind === 'international_conference' ? (
              <InternationalConferencePage/>
            ) : (
            kind === 'domestic_conference' ? (
              <DomesticConferencePage />
            ) : (
            kind === 'award' ? (
              <AwardPage />
            ) : (
              <></>
            ))))
          }
        </div>
			</div>
    </HeaderWithBody>
  )
}

export default Home

type IndexTabProps = {
  kind: IndexKind
  setKind: React.Dispatch<React.SetStateAction<IndexKind>>
}

const IndexTab = ({kind, setKind}: IndexTabProps) => {
  const normalStyle = 'px-3 py-1'
  const selectedStyle = normalStyle+' bg-black text-white rounded-t-md'

  return (
    <div className='flex border-b-2 border-black'>
      <div className={kind=="journal" ? selectedStyle : normalStyle} onClick={() => setKind('journal')}>
        ジャーナル
      </div>
      <div className={kind=="international_conference" ? selectedStyle : normalStyle} onClick={() => setKind('international_conference')}>
        国際会議
      </div>
      <div className={kind=="domestic_conference" ? selectedStyle : normalStyle} onClick={() => setKind('domestic_conference')}>
        国内会議
      </div>
      <div className={kind=="award" ? selectedStyle : normalStyle} onClick={() => setKind('award')}>
        表彰
      </div>
    </div>
  )
}