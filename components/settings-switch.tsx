"use client"
import React, { useState } from 'react'
import { Switch } from './ui/switch'
import { updateSetting } from '@/actions/settings'
import { Loader2 } from 'lucide-react'

interface Setting {
    id: string
    value: string
    toggle: boolean
}

const SettingsSwitch = ({ setting }: { setting: Setting }) => {
    const [loading, setLoading] = useState(false)
    const handleToggleChange = async (settingId: string, newValue: boolean) => {
        setLoading(true)
        try {
            await updateSetting(settingId, newValue)
            setLoading(false)
        } catch (error) {
            console.error("Failed to update setting:", error)
            setLoading(false)
        }
    }
    return (
        loading ? (
            <Loader2 className='animate-spin' />
        ) : (
            <Switch
                checked={!setting.toggle}
                onCheckedChange={(checked) => handleToggleChange(setting.id, !checked)}
                disabled={setting.value === 'admin'}
                className={`${setting.value === 'admin' ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
        )
    )
}

export default SettingsSwitch
