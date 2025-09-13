import { useEffect, useState } from "react";

function Recommendations() {
    const [recommendations, setRecommendations] = useState([]);
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                // Mock API calls (replace with backend later)
                const recRes = await fetch("http://localhost:5000/api/recommendations?userId=123").catch(() => null);
                const offerRes = await fetch("http://localhost:5000/api/offers").catch(() => null);

                let recData = [];
                let offerData = [];

                if (recRes && recRes.ok) recData = await recRes.json();
                if (offerRes && offerRes.ok) offerData = await offerRes.json();

                setRecommendations(
                    recData.length > 0
                        ? recData
                        : [
                            { id: 1, plan: "Gold Fibernet", reason: "You often exceed Basic quota" },
                            { id: 2, plan: "Premium Plus", reason: "Best value for heavy users" },
                        ]
                );

                setOffers(
                    offerData.length > 0
                        ? offerData
                        : [
                            { id: 1, title: "50% off on Premium", validTill: "2025-09-30" },
                            { id: 2, title: "Free 1-month Gold trial", validTill: "2025-10-15" },
                            { id: 3, title: "Extra 100GB on Gold Plan", validTill: "2025-09-20" },
                        ]
                );
            } catch (err) {
                setError("⚠️ Failed to fetch data. Showing defaults.");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    // Filter offers by search input
    const filteredOffers = offers.filter((offer) =>
        offer.title.toLowerCase().includes(search.toLowerCase())
    );

    // Function to check urgency
    const getUrgency = (validTill) => {
        const today = new Date();
        const expiry = new Date(validTill);
        if (isNaN(expiry)) return "❌ Invalid Date";

        const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

        if (diffDays <= 0) return "❌ Expired";
        if (diffDays <= 3) return "🔥 Expiring Soon";
        if (diffDays <= 7) return "⏳ Ends in a week";
        return "✅ Active";
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">Recommendations & Offers</h2>

            {loading && <p className="text-gray-600">Loading data...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {/* Recommendations */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">Recommended Plans</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {recommendations.map((rec) => (
                        <div key={rec.id} className="border p-4 rounded-xl shadow hover:shadow-md transition">
                            <h4 className="text-lg font-bold text-blue-600">{rec.plan}</h4>
                            <p className="text-gray-600">{rec.reason}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Offers */}
            <div>
                <h3 className="text-xl font-semibold mb-3">Available Offers</h3>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search offers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded mb-4 w-1/3"
                />

                <div className="grid md:grid-cols-2 gap-4">
                    {filteredOffers.map((offer) => (
                        <div
                            key={offer.id}
                            className="border p-4 rounded-xl bg-yellow-50 shadow hover:bg-yellow-100 transition"
                        >
                            <h4 className="text-lg font-bold">{offer.title}</h4>
                            <p className="text-gray-700">Valid till: {offer.validTill}</p>
                            <p
                                className={`mt-1 font-semibold ${getUrgency(offer.validTill).includes("🔥")
                                        ? "text-red-600"
                                        : getUrgency(offer.validTill).includes("⏳")
                                            ? "text-orange-600"
                                            : getUrgency(offer.validTill).includes("❌")
                                                ? "text-gray-500"
                                                : "text-green-600"
                                    }`}
                            >
                                {getUrgency(offer.validTill)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Recommendations;
