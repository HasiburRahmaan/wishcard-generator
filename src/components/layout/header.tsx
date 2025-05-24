'use client'
import React from 'react'
import ToastListener from '../common/toast/toastListener'
import { useToast } from '@/hooks/useToast'
import { useAppSelector } from '@/store/hooks'

type Props = {}

const Header = (props: Props) => {

  return (
    <div>Header


      <ToastListener />
    </div>
  )
}

export default Header