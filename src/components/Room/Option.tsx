import React, {useContext} from 'react'
import { Button } from '@/components/UI'
import { ModeItem } from '@/components/UI/ModeItem.ui';
import { TimeItem } from '@/components/UI/TimeItem.ui';
import { ModeItem_1,ModeItem_2,ModeItem_3,ModeItem_4 } from '@/components/UI/SVG_ICONS';
import { StateContext } from '@/Provider';
export interface OptionInterface {
    isPlaying : boolean
}
export const Option : React.FC<OptionInterface> = ({isPlaying} : OptionInterface) => {
    const {
        gameMode, 
        timeMode
    } = useContext(StateContext)
    return(
        <div className= {`relative col-span-2 max-w-[348px] border border-sky-600 mx-2 bg-orange-100 ${isPlaying ? '' : 'pointer-events-none' }`}>
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
                        {
                            gameMode === 1 
                            ?
                            <ModeItem
                                activated = {true}
                                mode_number = {1}
                                SVG={<ModeItem_1 fill='#ffffff'/>}
                            />
                            :
                            <ModeItem
                                activated = {false}
                                mode_number = {1}
                                SVG={<ModeItem_1 />}
                            />
                        }
                        {
                            gameMode === 2 
                            ?
                            <ModeItem
                                activated = {true}
                                mode_number = {2}
                                SVG={<ModeItem_2 fill='#ffffff'/>}
                            />
                            :
                            <ModeItem
                                activated = {false}
                                mode_number = {2}
                                SVG={<ModeItem_2 />}
                            />
                        }
                        {
                            gameMode === 3 
                            ?
                            <ModeItem
                                activated = {true}
                                mode_number = {3}
                                SVG={<ModeItem_3 fill='#ffffff'/>}
                            />
                            :
                            <ModeItem
                                activated = {false}
                                mode_number = {3}
                                SVG={<ModeItem_3 />}
                            />
                        }
                        {
                            gameMode === 4 
                            ?
                            <ModeItem
                                activated = {true}
                                mode_number = {4}
                                SVG={<ModeItem_4 fill='#ffffff'/>}
                            />
                            :
                            <ModeItem
                                activated = {false}
                                mode_number = {4}
                                SVG={<ModeItem_4 />}
                            />
                        }
                    </div>
                </div>

                <div className='flex flex-col mt-8'>
                    <p className='font-bold'>
                        Time:
                    </p>
                    <div className='flex gap-2 justify-center'>
                        {
                            timeMode === 1
                            ?
                            <TimeItem 
                                time='10 min'
                                time_mode={1}
                                activated={true} 
                            />
                            :
                            <TimeItem 
                                time='10 min'
                                time_mode={1}
                                activated={false} 
                            />
                        }
                        {
                            timeMode === 2
                            ?
                            <TimeItem 
                                time='15/10'
                                time_mode={2}
                                activated={true} 
                            />
                            :
                            <TimeItem 
                                time='15/10'
                                time_mode={2}
                                activated={false} 
                            />
                        }
                        {
                            timeMode === 3
                            ?
                            <TimeItem 
                                time='30 min'
                                time_mode={3}
                                activated={true} 
                            />
                            :
                            <TimeItem 
                                time='30 min'
                                time_mode={3}
                                activated={false} 
                            />
                        }
                    </div>
                </div>
                <div className='flex flex-col mt-6 gap-2'>
                    <Button
                        text='Play'
                        className='w-full border font-bold'
                        height='h-12'
                    />

                    <Button
                        text='Invite a Friend'
                        className='w-full border font-bold'
                        height='h-12'
                    />
                </div>
            </div>
        </div>
    )
}