import { create } from 'zustand'

const useStore = create((set) => ({
  formData: {
    title: '',
    description: '',
    photo: '',
    price: '',
    quantity: '',
    location: '',
    serviceType: '',
  },
  setFormData: (key, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [key]: value,
      },
    })),
  resetFormData: (newData) =>
    set(() => ({
      formData: newData,
    })),
}))

export default useStore
