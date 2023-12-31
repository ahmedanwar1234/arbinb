import type { Metadata } from 'next'
import {  Nunito} from 'next/font/google'
import './globals.css'
import NavBar from '@/components/NavBar'
import Register from '@/components/modals/Register'
import { Toaster } from "@/components/ui/toaster"
import LoginModal from '@/components/modals/Login'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from '@/components/modals/RentModel'
import SearchModal from '@/components/modals/SearchModal'
const faont = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Team Chat Application',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
const currentUser=await getCurrentUser()


  return (
       
    <html lang="en" suppressContentEditableWarning>
      <body className={"bg-white dark:bg-[#313338] "} >
<Register/>
<LoginModal/>
<RentModal/>
<SearchModal/>
           <NavBar currentUser={currentUser}/>
           

           <div className=' pb-20 pt-28'>
            {children}
           </div>
                    
                    <Toaster />

   
        </body>
    </html>
      
  )
}
