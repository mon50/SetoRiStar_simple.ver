"use client";
import { createClient } from '@/utils/supabase/client';
import { Icon, IconButton } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const supabase = createClient();

export function AddScheduleButton ({ liveId, userId }: { liveId: number, userId: string|null}) {
    const [isScheduled, setIsScheduled] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchUserScheduleStatus = useCallback(async () => {
        if (!userId || !liveId) return;

        try {
            setLoading(true);

            const { data, error } = await supabase
                .from('user_live_schedules')
                .select('*')
                .eq('user_id', userId)
                .eq('live_id', liveId);

            console.log(data);

            if (error) {
                console.error('Error fetching schedule status:', error);
            } else {
                setIsScheduled(data.length > 0);
            }
        } catch (error) {
            console.error('Error fetching schedule status:', error);
        } finally {
            setLoading(false);
        }
    }, [liveId, userId]);

    useEffect(() => {
        fetchUserScheduleStatus();
    }, [fetchUserScheduleStatus]);

    const toggleSchedule = async () => {
        setLoading(true);

        try {
            if (isScheduled) {
                const { error } = await supabase
                    .from('user_live_schedules')
                    .delete()
                    .match({ user_id: userId, live_id: liveId });

                if (error) {
                    console.error('Error removing schedule:', error);
                } else {
                    setIsScheduled(false);
                }
            } else {
                const { error } = await supabase
                    .from('user_live_schedules')
                    .insert({ user_id: userId, live_id: liveId });

                if (error) {
                    console.error('Error adding schedule:', error);
                } else {
                    setIsScheduled(true);
                }
            }
        } catch (error) {
            console.error('Error toggling schedule:', error);
        } finally {
            setLoading(false);
        }
    };
  return (
    <IconButton disabled={loading} onClick={toggleSchedule}>
            {isScheduled ? <EventAvailableIcon/> : <EditCalendarIcon/>}
    </IconButton>
  );
}

export default AddScheduleButton