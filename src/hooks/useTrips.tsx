import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { Tables, TablesInsert } from '@/integrations/supabase/types';

type Trip = Tables<'trips'>;
type Activity = Tables<'activities'>;

export const useTrips = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: trips = [], isLoading } = useQuery({
    queryKey: ['trips', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const createTrip = useMutation({
    mutationFn: async (trip: Omit<TablesInsert<'trips'>, 'user_id'>) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('trips')
        .insert({ ...trip, user_id: user.id })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
    },
  });

  const deleteTrip = useMutation({
    mutationFn: async (tripId: string) => {
      // First delete all activities associated with the trip
      const { error: activitiesError } = await supabase
        .from('activities')
        .delete()
        .eq('trip_id', tripId);
      
      if (activitiesError) throw activitiesError;

      // Then delete the trip
      const { error: tripError } = await supabase
        .from('trips')
        .delete()
        .eq('id', tripId);
      
      if (tripError) throw tripError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
    },
  });

  return {
    trips,
    isLoading,
    createTrip: createTrip.mutate,
    deleteTrip: deleteTrip.mutate,
    isCreating: createTrip.isPending,
    isDeleting: deleteTrip.isPending,
  };
};

export const useActivities = (tripId: string) => {
  const queryClient = useQueryClient();

  const { data: activities = [], isLoading } = useQuery({
    queryKey: ['activities', tripId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('trip_id', tripId)
        .order('day_number', { ascending: true })
        .order('start_time', { ascending: true });
      
      if (error) throw error;
      return data;
    },
    enabled: !!tripId,
  });

  const createActivity = useMutation({
    mutationFn: async (activity: Omit<TablesInsert<'activities'>, 'trip_id'>) => {
      const { data, error } = await supabase
        .from('activities')
        .insert({ ...activity, trip_id: tripId })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities', tripId] });
    },
  });

  const updateActivity = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Activity> & { id: string }) => {
      const { data, error } = await supabase
        .from('activities')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities', tripId] });
    },
  });

  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('activities')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities', tripId] });
    },
  });

  return {
    activities,
    isLoading,
    createActivity: createActivity.mutate,
    updateActivity: updateActivity.mutate,
    deleteActivity: deleteActivity.mutate,
    isCreating: createActivity.isPending,
    isUpdating: updateActivity.isPending,
    isDeleting: deleteActivity.isPending,
  };
};
