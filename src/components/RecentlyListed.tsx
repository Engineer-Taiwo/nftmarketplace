import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import NFTBox from "./NFTBox"
import Link from "next/link"

// Main component that uses the custom hook
export default function RecentlyListedNFTs() {

    interface listedNfts {
        nftAddress: string
        price: string
        rindexerId: string
        seller: string
        tokenId: string
        blockNumber: string
    }

    interface boughtCancelled {
        nftAddress: string
        tokenId: string
    }

    interface NFTQueryResponse {
        data: {
            allItemListeds: { 
                nodes: listedNfts[] 
            }
            allItemBoughts: { 
                nodes: boughtCancelled[] 
            }
            allItemCanceleds: { 
                nodes: boughtCancelled[] 
            }
        }
    }

    const RECENT_NFTS = `
            query AllItemListeds {
                allItemListeds(first: 20, orderBy: [BLOCK_NUMBER_DESC, TX_INDEX_DESC]) {
                    nodes {
                        nftAddress
                        price
                        rindexerId
                        contractAddress
                        seller
                        tokenId
                        blockNumber
                    }
                }
                allItemBoughts {
                    nodes {
                        nftAddress
                        tokenId
                    }
                }
                allItemCanceleds {
                    nodes {
                        nftAddress
                        tokenId
                    }
                }
            }
        `
    async function fetchNFTS(): Promise<NFTQueryResponse> {
        const response = fetch('/api/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                query: RECENT_NFTS 
            }),
        }).then((response) => response.json());

        return (await response)
    }
    function useRecentlyListedNFTs() {
        const { data, isLoading, isError, error } = useQuery({
            queryKey: ["recentlyListedNFTs"],
            queryFn: fetchNFTS,
        });
        
        const nftDataList = useMemo(() => {
            if(!data) return []

            const boughtNfts = new Set<string>()
            const canceledNfts = new Set<string>()

            data.data.allItemBoughts.nodes.forEach((item) => {
                boughtNfts.add(`${item.nftAddress}-${item.tokenId}`)
            })

            data.data.allItemCanceleds.nodes.forEach((item) => {
                canceledNfts.add(`${item.nftAddress}-${item.tokenId}`)
            })

            const availNfts = data.data.allItemListeds.nodes.filter((item) => {
                const key = `${item.nftAddress}-${item.tokenId}`
                return !boughtNfts.has(key) && !canceledNfts.has(key)
            })

            const activeNfts = availNfts.slice(0, 100)
            return activeNfts.map(nft => ({
                tokenId: nft.tokenId,
                contractAddress: nft.nftAddress,
                price: nft.price
            }))
        }, [data])

        return { isLoading, error, nftDataList }
    }

    const {isLoading, error, nftDataList} = useRecentlyListedNFTs()
    
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mt-8 text-center">
                <Link
                    href="/list-nft"
                    className="inline-block py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    List Your NFT
                </Link>
            </div>
            <h2 className="text-2xl font-bold mb-6">Recently Listed NFTs</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {nftDataList.map(nft => (
                    <NFTBox 
                        key = {`${nft.contractAddress}-${nft.tokenId}`}
                        tokenId = {nft.tokenId}
                        contractAddress = {nft.contractAddress}
                        price = {nft.price}
                    />
                    ))
                }
            </div>
        </div>
    )
}