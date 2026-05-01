interface PageProps{
    params: Promise<{
        executionId: string
    }>
}

const page = async ({params}: PageProps) => {

  const {executionId} = await params;
  
  return (
    <div>
      Execution Id:{executionId}
    </div>
  )
}

export default page
