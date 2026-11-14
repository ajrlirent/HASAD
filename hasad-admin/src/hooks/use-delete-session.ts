import { useMutation } from "@tanstack/react-query";

export function useDeleteSession() {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/session', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete session');
      }

      return response.json();
    }
  })

  return mutation
}