import React from 'react'
export const GamePool: React.FC = () => {
    return(
        <div className='relative col-span-2 border border-sky-600 mx-2 bg-orange-100'>
            <p className='w-full px-4 py-4 bg-orange-300 border-b text-bold '>
                Game Pools
            </p>
            {/* <div className='absolute w-full bottom-4 flex justify-between h-100 flex px-2 gap-2'>
                <Input type = 'text' className='w-8/12 border-black h-[40px]'/>
                <Button text='Send' bg_color='bg-purple-100' className= 'w-4/12 h-[40px]' />
            </div> */}
        </div>
    )
}
