import { FullSizeLoadingWrapper } from '@/Core/Layout'
import Loading from './Loading'
import { ComponentProps } from 'react'

const Fallback = (props: ComponentProps<typeof Loading>) => {
  return (
    <FullSizeLoadingWrapper>
      <Loading {...props} /> 
    </FullSizeLoadingWrapper>
  )
}

export default Fallback