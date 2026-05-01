interface PageProps{
    params: Promise<{
        workflowId: string
    }>
}

const page = async ({params}: PageProps) => {

  const {workflowId} = await params;
  
  return (
    <div>
      Execution Id:{workflowId}
    </div>
  )
}

export default page
