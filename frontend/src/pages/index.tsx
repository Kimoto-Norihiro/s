import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { HeaderWithBody } from '../components/layouts/HeaderWithBody';
import axios from 'axios';
import { Paper } from '@/types/types';
import { PaperForm } from '../components/pages/paper_form';
import { PaperTable } from '../components/pages/paper_table';

export const Home: NextPage = () => {
  return (
    <HeaderWithBody>
      <div className='p-4'>
        <PaperForm />
        <PaperTable />
      </div>
    </HeaderWithBody>
  )
}

export default Home
