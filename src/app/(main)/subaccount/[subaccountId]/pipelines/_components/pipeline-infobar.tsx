'use client'

import React from 'react'
import CreatePipelineForm from '@/components/forms/create-pipeline-form'
import CustomModal from '@/components/global/custom-modal'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu'
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import { useModal } from '@/providers/modal-provider'
import { Pipeline } from '@prisma/client'
import Link from 'next/link'

type Props = {
  subAccountId: string
  pipelines: Pipeline[]
  pipelineId: string
}

const PipelineInfoBar = ({ pipelineId, pipelines, subAccountId }: Props) => {
  const { setOpen: setOpenModal } = useModal()
  const [value, setValue] = React.useState(pipelineId)

  const handleClickCreatePipeline = () => {
    setOpenModal(
      <CustomModal
        title="Create A Pipeline"
        subheading="Pipelines allow you to group tickets into lanes and track your business processes all in one place."
      >
        <CreatePipelineForm subAccountId={subAccountId} />
      </CustomModal>
    )
  }

  return (
    <div className="flex items-end gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={!!value}
            className="w-[200px] justify-between"
          >
            {value
              ? pipelines.find((pipeline) => pipeline.id === value)?.name
              : 'Select a pipeline...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px] p-0">
          {pipelines.length === 0 ? (
            <div className="p-2 text-center text-gray-500">No pipelines found.</div>
          ) : (
            pipelines.map((pipeline) => (
              <DropdownMenuItem
                key={pipeline.id}
                onClick={() => setValue(pipeline.id)}
                className="flex items-center gap-2"
              >
                <Link
                  href={`/subaccount/${subAccountId}/pipelines/${pipeline.id}`}
                  className="flex items-center gap-2 w-full"
                >
                  <Check
                    className={value === pipeline.id ? 'opacity-100' : 'opacity-0'}
                  />
                  {pipeline.name}
                </Link>
              </DropdownMenuItem>
            ))
          )}
          <DropdownMenuItem
            onClick={handleClickCreatePipeline}
            className="flex gap-2 w-full mt-4"
          >
            <Plus size={15} />
            Create Pipeline
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default PipelineInfoBar
