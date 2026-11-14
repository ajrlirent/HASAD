import { useMutation } from '@tanstack/react-query';

export function useSignOut() {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to sign out');
      }

      return response.json();

    },
  })

  return mutation
}

// import { useMutation } from '@tanstack/react-query';
// import axios from '@/lib/axios';

// export function useSignOut(accessToken: string) {
//   const mutation = useMutation({
//     mutationFn: async () => {
//       return axios.post("/api/auth/signout", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`
//         }
//       })
//     },
//   })

//   return mutation
// }