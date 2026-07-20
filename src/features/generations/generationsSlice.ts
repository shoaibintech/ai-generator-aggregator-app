import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import {
  exploreMediaFive,
  exploreMediaFour,
  exploreMediaOne,
  exploreMediaThree,
  exploreMediaTwo,
} from '../../assets/images'

export type GenerationKind = 'image' | 'text' | 'avatars'
export type GenerationStatus = 'queued' | 'generating' | 'complete' | 'failed'
export type GenerationAspectRatio = 'portrait' | 'landscape' | 'square'

export type GenerationSettings = {
  aspectRatio: '16:9' | '9:16' | '1:1'
  resolution: '360P' | '720P' | '1080P'
  duration: '5s' | '10s' | '15s'
  audio: boolean
  filter: 'None' | 'Cinematic' | 'Soft glow'
  attachmentName?: string
}

export type Generation = {
  id: string
  alt: string
  imageUrl: string
  aspectRatio: GenerationAspectRatio
  kind: GenerationKind
  mediaType: 'image' | 'video'
  prompt: string
  model: string
  settings: GenerationSettings
  status: GenerationStatus
  progress: number
  createdAt: string
  avatarName?: string
}

export type NewGeneration = Omit<Generation, 'id' | 'createdAt'>

const generationAdapter = createEntityAdapter<Generation>({
  sortComparer: (first, second) => second.createdAt.localeCompare(first.createdAt),
})

const defaultSettings: GenerationSettings = {
  aspectRatio: '16:9',
  resolution: '360P',
  duration: '5s',
  audio: false,
  filter: 'None',
}

const createdAt = (offset: number) => new Date(Date.now() - offset * 86_400_000).toISOString()

const mockGeneration = (
  id: string,
  imageUrl: string,
  alt: string,
  prompt: string,
  kind: GenerationKind,
  aspectRatio: GenerationAspectRatio,
  offset: number,
  avatarName?: string,
): Generation => ({
  id,
  imageUrl,
  alt,
  prompt,
  kind,
  aspectRatio,
  mediaType: kind === 'image' ? 'image' : 'video',
  model: 'Nano banana Pro',
  settings: {
    ...defaultSettings,
    aspectRatio: aspectRatio === 'portrait' ? '9:16' : aspectRatio === 'square' ? '1:1' : '16:9',
  },
  status: 'complete',
  progress: 100,
  createdAt: createdAt(offset),
  avatarName,
})

const generationSeed: Generation[] = [
  mockGeneration('amber-portrait', exploreMediaOne, 'Woman smiling inside a sunlit orange room', 'A joyful portrait in warm amber sunlight, cinematic grain', 'image', 'portrait', 1),
  mockGeneration('birds', exploreMediaThree, 'Hummingbirds surrounded by colorful flowers', 'Hummingbirds in a bright floral garden, slow motion', 'image', 'landscape', 2),
  mockGeneration('robot', exploreMediaTwo, 'Futuristic humanoid in profile', 'An elegant futuristic humanoid assistant in profile', 'text', 'landscape', 3),
  mockGeneration('flowers', exploreMediaFour, 'Bright summer flowers against blue sky', 'Wildflowers against an impossibly blue summer sky', 'image', 'portrait', 4),
  mockGeneration('image-robot', exploreMediaTwo, 'Futuristic assistant in a quiet landscape', 'A polished future assistant standing in a quiet garden', 'image', 'landscape', 5),
  mockGeneration('image-selfie', exploreMediaFive, 'Sunny creator selfie', 'A creator welcomes the morning from a tropical terrace', 'image', 'portrait', 6),
  mockGeneration('image-bloom', exploreMediaThree, 'Birds moving through a colorful sky', 'A flock of tiny birds crossing a bright spring sky', 'image', 'landscape', 7),
  mockGeneration('selfie', exploreMediaFive, 'Woman smiling up at the sky', 'Selfie perspective, a woman laughs in soft morning light', 'text', 'portrait', 5),
  mockGeneration('text-amber', exploreMediaOne, 'Warm sunset character portrait', 'A woman tells a heartfelt story in a sunlit studio', 'text', 'portrait', 6),
  mockGeneration('text-flowers', exploreMediaFour, 'Vivid wildflower scene', 'A summer breeze moves through a field of poppies', 'text', 'portrait', 7),
  mockGeneration('text-birds', exploreMediaThree, 'Birds in an animated sky', 'Tiny birds trace a joyful arc through a blue sky', 'text', 'landscape', 8),
  mockGeneration('avatar-anya', exploreMediaOne, 'Anya, a garden storyteller avatar', 'Warm garden storyteller introducing a new creative idea', 'avatars', 'portrait', 6, 'Anya'),
  mockGeneration('avatar-zoe', exploreMediaFive, 'Zoë, a bright travel creator avatar', 'Travel creator recording a sunny day-in-the-life clip', 'avatars', 'portrait', 7, 'Zoë'),
  mockGeneration('avatar-nova', exploreMediaTwo, 'Nova, a future product guide avatar', 'Confident future product guide with a calm voice', 'avatars', 'portrait', 8, 'Nova'),
  mockGeneration('avatar-mira', exploreMediaFour, 'Mira, a colorful culture guide avatar', 'Creative culture guide sharing a spring collection', 'avatars', 'portrait', 9, 'Mira'),
  mockGeneration('avatar-rio', exploreMediaThree, 'Rio, a lively nature host avatar', 'Nature host narrating a vivid flight of birds', 'avatars', 'landscape', 10, 'Rio'),
  mockGeneration('avatar-leo', exploreMediaOne, 'Leo, a warm studio host avatar', 'Friendly studio host delivering a product update', 'avatars', 'portrait', 11, 'Leo'),
  mockGeneration('city-moment', exploreMediaThree, 'Colorful birds in flight', 'A surreal bright city moment with petals drifting through frame', 'text', 'landscape', 9),
]

const generationsSlice = createSlice({
  name: 'generations',
  initialState: generationAdapter.setAll(generationAdapter.getInitialState({ status: 'succeeded' as const }), generationSeed),
  reducers: {
    addGeneration: (state, action: PayloadAction<Generation>) => {
      generationAdapter.addOne(state, action.payload)
    },
    updateGenerationProgress: (state, action: PayloadAction<{ id: string; progress: number }>) => {
      generationAdapter.updateOne(state, { id: action.payload.id, changes: { progress: action.payload.progress, status: 'generating' } })
    },
    completeGeneration: (state, action: PayloadAction<string>) => {
      generationAdapter.updateOne(state, { id: action.payload, changes: { progress: 100, status: 'complete' } })
    },
  },
})

export const { addGeneration, completeGeneration, updateGenerationProgress } = generationsSlice.actions
export const generationSelectors = generationAdapter.getSelectors()
export const mockGenerationImages = [exploreMediaOne, exploreMediaTwo, exploreMediaThree, exploreMediaFour, exploreMediaFive]
export default generationsSlice.reducer
