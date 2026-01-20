import { create } from 'zustand'

export type UserRole = 'super_admin' | 'company_admin' | 'employee' | 'partner'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  companyId?: string
  sectorId?: string
  partnerId?: string
  acceptedTerms: boolean
}

interface UserState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  login: (role: UserRole) => void
  logout: () => void
  acceptTerms: () => void
}

const MOCK_USERS: Record<UserRole, User> = {
  super_admin: {
    id: 'u1',
    name: 'Dr. Fernando Silva',
    email: 'medico@plataforma.com',
    role: 'super_admin',
    acceptedTerms: true,
  },
  company_admin: {
    id: 'u2',
    name: 'Juliana Costa',
    email: 'rh@empresa.com',
    role: 'company_admin',
    companyId: 'c1',
    acceptedTerms: true,
  },
  employee: {
    id: 'u3',
    name: 'Carlos Mendes',
    email: 'carlos@empresa.com',
    role: 'employee',
    companyId: 'c1',
    sectorId: 's1',
    acceptedTerms: false,
  },
  partner: {
    id: 'u4',
    name: 'Roberto Partner',
    email: 'admin@healthcorp.com',
    role: 'partner',
    partnerId: 'p1',
    acceptedTerms: true,
  },
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  login: (role) => {
    // Simulate login by setting mock user
    const mockUser = MOCK_USERS[role]
    set({ user: mockUser, isAuthenticated: true })
  },
  logout: () => set({ user: null, isAuthenticated: false }),
  acceptTerms: () =>
    set((state) => ({
      user: state.user ? { ...state.user, acceptedTerms: true } : null,
    })),
}))

export default useUserStore
