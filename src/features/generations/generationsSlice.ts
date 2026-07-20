import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

export type Generation = {
  id: string
  alt: string
  imageUrl: string
  aspectRatio: 'portrait' | 'landscape' | 'square'
  prompt: string
  model: string
}

const generationAdapter = createEntityAdapter<Generation>()

const generationSeed: Generation[] = [
  {
    id: 'amber-portrait',
    alt: 'Woman smiling inside a sunlit orange room',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=85',
    aspectRatio: 'portrait',
    prompt: 'A joyful portrait in warm amber sunlight, cinematic grain',
    model: 'Nano banana Pro',
  },
  {
    id: 'birds',
    alt: 'Hummingbirds surrounded by colorful flowers',
    imageUrl: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=700&q=85',
    aspectRatio: 'landscape',
    prompt: 'Hummingbirds in a bright floral garden, slow motion',
    model: 'Nano banana Pro',
  },
  {
    id: 'cat',
    alt: 'Cat wearing sunglasses and an orange hat',
    imageUrl: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=700&q=85',
    aspectRatio: 'portrait',
    prompt: 'A stylish cat in sunglasses and a tangerine sun hat',
    model: 'Nano banana Pro',
  },
  {
    id: 'flowers',
    alt: 'Bright summer flowers against blue sky',
    imageUrl: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=700&q=85',
    aspectRatio: 'portrait',
    prompt: 'Wildflowers against an impossibly blue summer sky',
    model: 'Nano banana Pro',
  },
  {
    id: 'woman',
    alt: 'Woman smiling up at the sky',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=85',
    aspectRatio: 'portrait',
    prompt: 'Selfie perspective, a woman laughs in soft morning light',
    model: 'Nano banana Pro',
  },
  {
    id: 'robot',
    alt: 'White futuristic robot in profile',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=700&q=85',
    aspectRatio: 'landscape',
    prompt: 'An elegant futuristic humanoid assistant in profile',
    model: 'Nano banana Pro',
  },
  {
    id: 'cinema',
    alt: 'Moody cinematic portrait',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=85',
    aspectRatio: 'portrait',
    prompt: 'Moody cinematic portrait under green and amber lighting',
    model: 'Nano banana Pro',
  },
  {
    id: 'city',
    alt: 'People walking through a wet city street',
    imageUrl: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=700&q=85',
    aspectRatio: 'landscape',
    prompt: 'Anonymous figures walking across a rain-slicked street',
    model: 'Nano banana Pro',
  },
]

const generationsSlice = createSlice({
  name: 'generations',
  initialState: generationAdapter.setAll(generationAdapter.getInitialState({ status: 'succeeded' as const }), generationSeed),
  reducers: {},
})

export const generationSelectors = generationAdapter.getSelectors()
export default generationsSlice.reducer
