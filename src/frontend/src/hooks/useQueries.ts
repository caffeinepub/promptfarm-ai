import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { PromptRecord, UserProfile, BlogPost, PromptCategory } from '../backend';

// Prompts
export function useGetAllPrompts() {
  const { actor, isFetching } = useActor();

  return useQuery<PromptRecord[]>({
    queryKey: ['prompts'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllPrompts();
      } catch (error) {
        console.error('Failed to fetch prompts:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchOnMount: 'always',
  });
}

export function useGetPrompt(id: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<PromptRecord | null>({
    queryKey: ['prompt', id?.toString()],
    queryFn: async () => {
      if (!actor || !id) return null;
      try {
        return await actor.getPrompt(id);
      } catch (error) {
        console.error('Failed to fetch prompt:', error);
        return null;
      }
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useGetPromptsByCategory(category: PromptCategory) {
  const { actor, isFetching } = useActor();

  return useQuery<PromptRecord[]>({
    queryKey: ['prompts', 'category', category],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getPromptsByCategory(category);
      } catch (error) {
        console.error('Failed to fetch prompts by category:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchOnMount: 'always',
  });
}

// Admin check
export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  const query = useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch (error) {
        console.error('Failed to check admin status:', error);
        return false;
      }
    },
    enabled: !!actor && !actorFetching && !!identity,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

// Add prompt (admin only)
export function useAddPrompt() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (record: PromptRecord) => {
      if (!actor) throw new Error('Actor not available');
      return await actor.addPrompt(record);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prompts'] });
    },
  });
}

// Favorites
export function useGetFavoritePrompts() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<PromptRecord[]>({
    queryKey: ['favorites'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getFavoritePrompts();
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useToggleFavorite() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (promptId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      await actor.toggleFavoritePrompt(promptId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
}

// User Profile
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      try {
        return await actor.getCallerUserProfile();
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        return null;
      }
    },
    enabled: !!actor && !actorFetching && !!identity,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Blog
export function useGetAllBlogPosts() {
  const { actor, isFetching } = useActor();

  return useQuery<BlogPost[]>({
    queryKey: ['blogPosts'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllBlogPosts();
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetBlogPost(id: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<BlogPost | null>({
    queryKey: ['blogPost', id?.toString()],
    queryFn: async () => {
      if (!actor || !id) return null;
      try {
        return await actor.getBlogPost(id);
      } catch (error) {
        console.error('Failed to fetch blog post:', error);
        return null;
      }
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

// Newsletter
export function useSubscribeToNewsletter() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.subscribeToNewsletter(email);
    },
  });
}

// Contact
export function useSubmitContactForm() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({ name, email, message }: { name: string; email: string; message: string }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.submitContactForm(name, email, message);
    },
  });
}
