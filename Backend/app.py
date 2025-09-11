from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer, util
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


# --- Step 1: Symptom dictionary ---
symptom_map = {
    "diarrhea": ["loose motion", "wet poop", "runny poop", "soft stool", "watery stool"],
    "vomiting": ["throwing up", "puking", "regurgitating"],
    "fever": ["high temperature", "hot body", "warm nose"],
    "cough": ["hacking", "choking sound"],
    "sneezing": ["snorting", "nasal discharge"],
    "loss of appetite": ["not eating", "refusing food", "won’t eat"],
    "lethargy": ["low energy", "weakness", "tired all the time"],
    "limping": ["favoring leg", "can’t walk properly", "hobbling"],
    "itching": ["scratching", "skin irritation", "rashes"],
    "hair loss": ["fur falling", "bald patches", "shedding excessively"],
    "ear infection": ["head shaking", "ear discharge", "smelly ears"],
    "eye discharge": ["teary eyes", "gunky eyes", "red eyes"],
    "dehydration": ["dry gums", "sunken eyes", "not drinking water"],
    "difficulty breathing": ["heavy breathing", "panting", "shortness of breath"],
    "seizure": ["shaking", "tremors", "fits", "convulsions"],
    "bloating": ["swollen belly", "stomach expansion"],
    "aggression": ["sudden biting", "irritability", "snapping"],
    "anxiety": ["restlessness", "pacing", "whining a lot"],
    "wounds": ["cuts", "injuries", "open sore"],
}

# --- Step 2: Condition recommendations ---
condition_recommendations = {
    # Low risk
    "itching": {"risk": "low", "advice": "Check for fleas, ticks, or skin irritation. Use anti-itch shampoo. If persistent, vet visit needed."},
    "hair loss": {"risk": "low", "advice": "May be due to shedding, parasites, or allergies. Monitor skin. If bald patches or sores, see vet."},
    "sneezing": {"risk": "low", "advice": "Often mild. Ensure no dust or strong smells. If discharge or frequent, possible infection → vet."},
    "loss of appetite": {"risk": "low", "advice": "Could be stress or mild upset. Try offering favorite food. If >24h, consult vet."},
    "lethargy": {"risk": "low", "advice": "Might be tiredness. If prolonged or combined with other symptoms, vet check is advised."},
    "limping": {"risk": "low", "advice": "Restrict activity. Check paws for cuts/thorns. If swelling, pain, or persists, see vet."},
    "wounds": {"risk": "low", "advice": "Clean with antiseptic. Bandage if needed. Watch for swelling/redness. Vet if deep."},
    "anxiety": {"risk": "low", "advice": "Provide comfort, toys, and safe space. If severe or ongoing, consult vet or behaviorist."},
    "aggression": {"risk": "low", "advice": "Could be fear or pain related. Avoid triggers. If sudden and unexplained, consult vet."},

    # Medium risk
    "diarrhea": {"risk": "medium", "advice": "Keep pet hydrated. Offer bland food (rice/chicken). If blood, vomiting, or >24h, see vet."},
    "vomiting": {"risk": "medium", "advice": "Withhold food for 12h, give small water. If repeated or with blood, vet is needed."},
    "cough": {"risk": "medium", "advice": "Could be kennel cough, allergies, or irritation. If persistent or with breathing issues → vet."},
    "eye discharge": {"risk": "medium", "advice": "Clean with damp cotton. If yellow/green discharge or redness, likely infection → vet."},
    "ear infection": {"risk": "medium", "advice": "Common signs: head shaking, odor. Clean gently. Vet needed for medication."},
    "dehydration": {"risk": "medium", "advice": "Check gums (should be moist). Encourage water. If severe, vet IV fluids needed."},
    "bloating": {"risk": "medium", "advice": "Monitor closely. Could be indigestion. If belly hard, painful, or vomiting → EMERGENCY vet."},

    # High risk
    "fever": {"risk": "high", "advice": "Check with thermometer. If >103°F, seek veterinary care immediately."},
    "seizure": {"risk": "high", "advice": "Keep pet safe during episode. Time it. If repeated or >5 minutes, urgent vet care."},

    # Emergency
    "difficulty breathing": {"risk": "emergency", "advice": "This is life-threatening. Get to an emergency vet immediately."},
}

# --- Step 3: Embedding model ---
model = SentenceTransformer("all-MiniLM-L6-v2")

known_symptoms = list(symptom_map.keys())
for key, synonyms in symptom_map.items():
    known_symptoms.extend(synonyms)

known_embeddings = model.encode(known_symptoms)

# --- Step 4: Normalizer function ---
def normalize_symptom(user_input):
    text = user_input.lower().strip()

    # Direct match
    for key, synonyms in symptom_map.items():
        if key in text:
            return key
        for s in synonyms:
            if s in text:
                return key

    # Embedding similarity fallback
    user_embedding = model.encode([text])
    scores = util.cos_sim(user_embedding, known_embeddings)[0]
    best_idx = int(scores.argmax())
    best_match = known_symptoms[best_idx]

    for key, synonyms in symptom_map.items():
        if best_match == key or best_match in synonyms:
            return key

    return best_match

# --- Step 5: Risk ranking helper ---
risk_priority = {"unknown": 0, "low": 1, "medium": 2, "high": 3, "emergency": 4}

# --- Step 6: Multi-symptom route with summary ---
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    user_input = data.get("symptom", "")

    if not user_input:
        return jsonify({"error": "No symptom provided"}), 400

    # Split into symptom phrases
    chunks = [c.strip() for c in user_input.replace(",", " and ").split("and")]

    results = []
    highest_risk = {"level": "unknown", "symptom": None}
    unknowns = []

    for chunk in chunks:
        if not chunk:
            continue

        normalized = normalize_symptom(chunk)
        details = condition_recommendations.get(normalized, {
            "risk": "unknown",
            "advice": "Symptom not recognized, please consult a vet."
        })

        results.append({
            "original_text": chunk,
            "normalized_symptom": normalized,
            "risk": details["risk"],
            "advice": details["advice"]
        })

        if details["risk"] == "unknown":
            unknowns.append(chunk)

        # Track highest risk
        if risk_priority[details["risk"]] > risk_priority[highest_risk["level"]]:
            highest_risk = {"level": details["risk"], "symptom": normalized}

    # --- Build summary ---
    summary_parts = []
    for r in results:
        summary_parts.append(f"- {r['normalized_symptom'].capitalize()} ({r['risk']} risk): {r['advice']}")
    summary_text = "\n".join(summary_parts)

    combined_summary = (
        f"I found {len(results)} symptoms in your description.\n\n"
        f"{summary_text}\n\n"
    )
    if highest_risk["level"] != "unknown":
        combined_summary += f"The most urgent concern is **{highest_risk['symptom']}** ({highest_risk['level']} risk)."
    if unknowns:
        combined_summary += f"\nSome symptoms were not recognized: {', '.join(unknowns)}."

    return jsonify({
        "user_input": user_input,
        "results": results,
        "highest_risk": highest_risk,
        "summary": combined_summary
    })

@app.route("/", methods=["GET"])
def home():
    return {"message": "Welcome to PetAidHub Symptom Checker API. Use /predict with POST request."}

if __name__ == "__main__":
    app.run(debug=True)
