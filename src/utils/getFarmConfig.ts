import { farmsConfig } from 'config/constants'

const getFarmConfig = (key: number) => farmsConfig.find((f) => f.key === key)

export default getFarmConfig
