import { defineStore } from 'pinia'
import portraitImage from '@/assets/images/portrait.jpg'

interface BaseConfig {
  title: string
  portrait: string
  subtitle: string
  location: string
  cvPath: string
  cvLastUpdateDate: string
  description: string
}

interface NavItem {
  path: string
  name: string
  icon: string
  showName?: boolean
}

interface HeaderState {
  navItems: NavItem[]
}


const useBaseConfig = defineStore('baseConfig', {
  state: (): BaseConfig => ({
    title: "Yzz's Blog",
    portrait: portraitImage,
    subtitle: '',
    location: 'Beijing, China',
    cvPath: '',
    cvLastUpdateDate: '2025-04-07',
    description: 'A blog for note, thinking and life.'
  }),
  actions: {
    descriptionClean() {
      return this.description.replace(/(?:\r\n|\r|\n)/g, '<br>')
    }
  }
}
)

const useHeaderStore = defineStore('header', {
  state: (): HeaderState => ({
    navItems: [
      {
        path: '/posts',
        name: 'Posts',
        icon: 'mingcute:inbox-fill'
      },
      {
        path: '/categories',
        name: 'Categories',
        icon: 'mingcute:classify-3-fill'
      },
      {
        path: '/tags',
        name: 'Tags',
        icon: 'mingcute:tag-2-fill'
      },
    ]
  })
})

export {
  useBaseConfig,
  useHeaderStore
}
