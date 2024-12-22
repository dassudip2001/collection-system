import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex justify-center flex col items-center h-screen'>
        <SignUp />
    </div>
  )
}