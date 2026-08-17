import Link from "next/link"

export default function BuyNftPage() {
    return (
        <main className="min-h-screen bg-zinc-50 px-4 py-16">
            <div className="mx-auto max-w-2xl rounded-xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-blue-600">
                    Buy NFT
                </p>
                <h1 className="mb-4 text-3xl font-bold text-zinc-800">
                    Select an NFT to purchase
                </h1>
                <p className="mb-8 text-zinc-600">
                    Visit the marketplace home page to choose a currently listed NFT and view its
                    purchase details.
                </p>
                <Link
                    href="/"
                    className="inline-block rounded-md bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                >
                    Back to Marketplace
                </Link>
            </div>
        </main>
    )
}
