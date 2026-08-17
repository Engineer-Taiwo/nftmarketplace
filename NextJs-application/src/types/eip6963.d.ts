import type { EIP1193Provider } from "viem"

export {}

type EIP6963ProviderDetail = {
    info: {
        icon: `data:image/${string}`
        name: string
        rdns: string
        uuid: string
    }
    provider: EIP1193Provider
}

interface EIP6963AnnounceProviderEvent extends CustomEvent<EIP6963ProviderDetail> {
    type: "eip6963:announceProvider"
}

interface EIP6963RequestProviderEvent extends Event {
    type: "eip6963:requestProvider"
}

declare global {
    interface WindowEventMap {
        "eip6963:announceProvider": EIP6963AnnounceProviderEvent
        "eip6963:requestProvider": EIP6963RequestProviderEvent
    }
}
