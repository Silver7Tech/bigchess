import React from 'react'
import { Button } from '@/components/UI'
import { ModeItem } from '@/components/UI/ModeItem.ui';
import { TimeItem } from '@/components/UI/TimeItem.ui';
import { ModeItem_1,ModeItem_2,ModeItem_3,ModeItem_4 } from '@/components/UI/SVG_ICONS';
export const Option : React.FC = () => {
    return(
        <div className='relative col-span-2 border border-sky-600 mx-2 bg-orange-100'>
            <div className='w-full flex justify-between px-4 py-4 bg-orange-300 border-b text-bold '>
                <p>
                    Play
                </p>
                <p>
                    Friends
                </p>
            </div>
            <div className='flex flex-col justify-between gap-2 p-4'>
                <div className='flex flex-col'>
                    <p className='font-bold'>
                        Game Mode:
                    </p>
                    <div className='flex gap-1'>
                        <ModeItem
                            SVG={<ModeItem_1 fill='#ffffff'/>}
                        />
                        <ModeItem
                            SVG={<ModeItem_2/>}
                        />
                        <ModeItem
                            SVG={<ModeItem_3/>}
                        />
                        <ModeItem
                            SVG={<ModeItem_4 />}
                        />
                    </div>
                </div>

                <div className='flex flex-col'>
                    <p className='font-bold'>
                        Time:
                    </p>
                    <div className='flex gap-2 justify-center'>
                        <TimeItem 
                            time='10 min'
                            activated={true} 
                        />
                        <TimeItem 
                            time='15/10'
                        />
                        <TimeItem 
                            time='30 min'
                        />
                    </div>
                </div>
                <div className='flex flex-col mt-6 gap-2'>
                    <Button
                        text='Play'
                        className='w-full border font-bold'
                    />

                    <Button
                        text='Invite a Friend'
                        className='w-full border font-bold'
                    />
                </div>
            </div>
        </div>
    )
}