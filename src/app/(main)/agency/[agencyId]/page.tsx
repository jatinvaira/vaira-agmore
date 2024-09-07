import Sidebar from '@/components/sidebar'
import React from 'react'

const Page = async ({params}:{params:{agencyId: string}}) => {
  return (
    <div>{params.agencyId}
    {/* <Sidebar id={params.agencyId} type="agency"> </Sidebar> */}
    </div>
  )
}

export default Page