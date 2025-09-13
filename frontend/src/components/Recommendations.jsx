import { useEffect, useState } from "react";

function Recommendations() {
    const [recommendations, setRecommendations] = useState([]);
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        // Replace with backend API later
        fetch("http://localhost:5000/api/recommendations?userId=123")
            .then(res => res.json())
            .then(data => setRecommendations(data))
            .catch(() => {
                setRecommendations([
                    { id: 1, plan: "Gold Fibernet", reason: "You often exceed Basic quota" },
                    { id: 2, plan: "Premium Plus", reason: "Best value for heavy users" },
                ]);
            });

        fetch("http://localhost:5000/api/offers")
            .then(res => res.json())
            .then(data => setOffers(data))
            .catch(() => {
                setOffers([
                    { id: 1, title: "50% off on Premium", validTill: "2025-09-30" },
                    { id: 2, title: "Free 1-month Gold trial", validTill: "2025-10-15" },
                ]);
            });
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Recommendations & Offers</h2>

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Recommended Plans</h3>
                <div className="grid gap-4">
                    {recommendations.map((rec) => (
                        <div key={rec.id} className="border p-4 rounded-lg shadow-sm">
                            <h4 className="text-lg font-bold">{rec.plan}</h4>
                            <p className="text-gray-600">{rec.reason}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-2">Available Offers</h3>
                <div className="grid gap-4">
                    {offers.map((offer) => (
                        <div key={offer.id} className="border p-4 rounded-lg bg-yellow-100">
                            <h4 className="text-lg font-bold">{offer.title}</h4>
                            <p className="text-gray-700">Valid till: {offer.validTill}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Recommendations;
