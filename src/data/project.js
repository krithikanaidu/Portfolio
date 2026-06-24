import neuroguardImage from '../assets/neuroguard.png'
import forseeImage from '../assets/foeseeImage.png'

export const projects = [
    {
        slug: "neuroguard",
        title: "Neuroguard",
        bio: "An IoT based home monitoring ecosystem built for Alzheimer's and dementia patients — giving family caregivers real-time visibility into their loved one's safety, sleep, cognition, and location without cameras, wearables, or expensive hardware.",
        tags: ["Flutter", "Firebase", "ESP32", "IoT", "Healthcare", "Embedded Systems", "Dart", "OpenStreetMap", "Health-Tech"],
        image: neuroguardImage,
        links: {
            github: "https://github.com/krithikanaidu/neuroguard",
            ppt: "https://www.figma.com/deck/0YHDmvJCmIpm5iPUh7orSD",
            live: "",
        },
        overview: `NeuroGuard is a two-part system: a custom Velostat pressure mat connected to an ESP32 microcontroller handles hardware-based sensing, while a Flutter mobile application serves patients and caregivers through role-based interfaces backed by Firebase in real time.
                \n\nThe system is built around Digital Phenotyping — passive, continuous measurement of a patient's behavior and vitality at home, generating longitudinal health data that a 15-minute clinic visit cannot capture.
                \n\nSix modules work in concert: a Smart Bed Sensor detecting sleep states including unconsciousness; a gamified Cognitive Assessment capturing hesitation latency as a neurological biomarker; GPS Geo-fencing with progressive voice guidance; a novel Pocket Check algorithm for phone abandonment detection; a VoIP Spy Call for zero-touch remote audio monitoring; and QR-based secure caregiver pairing. Total hardware cost: ₹2,500.`,
        problem: `Alzheimer’s slowly erodes memory, orientation, and decision-making, turning everyday activities into potential risks. Patients may forget meals, miss medication, wander away from safe spaces, or remain inactive for dangerously long periods—often without realizing they need help. 
                \n\nIn home environments, these silent risks go unnoticed until they become emergencies, placing immense emotional and physical strain on caregivers. The challenge lies in ensuring continuous safety, cognitive support, and timely awareness while preserving the patient’s dignity, independence, and comfort at home.`,
        constraints: [
            { label: "No cameras ", text: " patient dignity and clinical ethics rule out visual surveillance, especially in bedrooms where the highest-risk events occur." },
            { label: "₹2,500 hardware ceiling", text: "ruled out commercial sensor modules, licensed mapping APIs, and paid cloud tiers." },
            { label: "Android OS security restrictions", text: " covert background camera activation and silent auto-call-answering are blocked by modern Android; emergency features had to be redesigned around these hard platform limits." },
        ],
        keyDecisions: [
            "Velostat + voltage divider on GPIO34 — Velostat was chosen for its thin profile, flexibility, and cost advantage over commercial FSRs. A 10kΩ voltage divider converts resistance variation (empty bed ~50kΩ, occupied ~5kΩ) into a 0–3.3V range readable by the ESP32's 12-bit ADC, producing readings from ~680 to ~2730 — sufficient resolution for reliable state classification.",
            "5 Hz windowed sampling with Schmitt trigger hysteresis — Sampling at 5 Hz captures breathing-frequency micro-movements (0.17–0.33 Hz) and cardiac micro-movements (0.8–1.3 Hz), which distinguish an UNRESPONSIVE patient from a sleeping one. A Schmitt trigger with a 100-unit dead zone prevents rapid false-switching at the occupancy boundary. Each 3-minute window (900 samples) yields four metrics: mean, variance, peak amplitude, and micro-movement count — feeding a decision tree that classifies six states including HYPERSOMNIA and UNRESPONSIVE.",
            "Time-in-Air as a cognitive biomarker — Rather than scoring clock drawings visually, the system measures millisecond-resolution hesitation between strokes using Flutter's raw pointer event stream. Every PointerUp → PointerDown transition is logged as a hesitation instance; their average is the session's Time-in-Air score. Based on Souillard-Mandar et al. (2016), rising TiA trends correlate with early Alzheimer's decline before other clinical indicators appear. The system tracks relative change over time — not cross-population diagnosis.",
            "Vibration damping physics for Pocket Check — Hard surfaces reflect vibration energy (high post-vibration accelerometer variance); soft surfaces like clothing and body tissue absorb it (low variance). The algorithm fires the haptic motor for 500ms, records Z-axis accelerometer data for 1200–1600ms immediately after, and computes variance as the abandonment discriminator. A passive component also monitors for sustained zero-variance periods — a phone on a body always shows micro-variance from breathing; a phone on a table does not. Thresholds were calibrated empirically across five surface types, achieving ~92% accuracy.",
            "Firebase Cloud Functions for alert escalation — Dart-side timers are killed by Android's app lifecycle manager. The T+0 → T+2min FCM push → T+5min FCM + Fast2SMS → T+10min SMS broadcast chain runs entirely in Cloud Functions, guaranteeing delivery regardless of app state.",
            "late final stream initialization in initState() — Storing Firestore listeners as late final fields initialized once prevents duplicate subscriptions on widget rebuilds, eliminating the location marker flickering and UI jitter that plagued earlier builds.",
            "OpenStreetMap over Google Maps — No API key, no billing account, no patient location data fed into advertising analytics. Consistent with the privacy-by-design philosophy required for a medical application."
        ],
        results: [
            "Bed sensor classifies six sleep states in real time, with HYPERSOMNIA and UNRESPONSIVE alerts reaching the caregiver dashboard within milliseconds.",
            "Fix the Clock captures full stroke-point arrays at millisecond resolution, with longitudinal TiA trend graphs rendered on the caregiver dashboard.",
            "RGeo-fencing triggers progressive TTS voice guidance on breach, with live GPS displayed on a flutter_map OpenStreetMap tile view.",
            "Pocket Check achieved ~92% surface classification accuracy across five tested surface types.",
            "VoIP Spy Call establishes a one-way audio stream from the patient's environment in 2–4 seconds without patient interaction.",
        ],
        takeaways: [
            "Sensor calibration is empirical, not theoretical. Every threshold — micro-movement counts, Schmitt trigger bounds, vibration variance cutoffs — came from labeled test runs on real hardware. The Pocket Check score inversion (hard surfaces produce higher variance, opposite to the initial assumption) would have been missed without this discipline.",
            "Background reliability requires infrastructure, not timers. Time-critical escalation chains belong in Firebase Cloud Functions — Dart timers die with the app.",
            "Single persistent stream listeners. Creating Firestore listeners inside build() causes duplicate subscriptions on every rebuild. late final initialization in initState() with a _disposed guard is now a non-negotiable pattern.",
            "Framing determines perception. Leading with hardware-software integration — not clinical outcomes — positions the project correctly for engineering audiences and keeps it out of IRB territory.",
        ],
    },
    {
        slug: "4see",
        title: "4See",
        bio: "An AI-powered platform that predicts student dropout risk in Indian schools using the ABC model (Attendance, Behavior, Course Performance), giving teachers actionable intervention strategies before it's too late.",
        tags: ["Flutter", "Firebase", "Dart", "AI/ML", "FastAPI", "EduTech", "LLM", "Code Parsing"],
        image: forseeImage,
        links: {
            github: "https://github.com/krithikanaidu/4see",
            
            ppt: "",
            live: "",
        },
        overview: "4See is an AI-powered early warning system built for Indian schools, designed to identify students at risk of dropping out 3–6 months before it happens. Teachers upload attendance, grades, and behavior data via CSV; the platform's machine learning pipeline classifies each student as high, medium, or low risk, then uses a Gemini-powered LLM to generate tiered intervention strategies — from general monitoring tips to urgent, tailored action plans. Built for low-resource environments with a minimal Flutter interface requiring under 5 minutes of daily input",
        problem: "Over 5.4 million students dropped out of Indian elementary schools in 2022–23. Warning signs — rising absences, declining grades, behavioral changes — go unnoticed until it's too late. Teachers lack unified tools to connect scattered data into a coherent early warning signal, and when risk is finally identified, there's no clear prescription for what to do next.",
        constraints: [
            { label: "Must work on low-end Android devices with intermittent connectivity", text: ""},
            { label: "Class imbalance in dropout datasets (minority class) needed SMOTE-based oversampling", text: ""},
            { label: "LLM has no memory between sessions — required Firestore-backed context injection per call", text: ""},
            { label: "Model must be interpretable to non-technical teachers, ruling out black-box deep learning", text: ""},
        ],
        keyDecisions: [
            "Scikit-learn over TensorFlow for risk classification. The ABC model input is structured tabular data — Random Forest, Gradient Boosting, and Logistic Regression outperform neural nets here while remaining interpretable. Feature importances let teachers understand why a student was flagged.",
            "Three-tier feature engineering pipeline. Features are prioritized by predictive weight: HIGH (grades G1–G3, absences), MEDIUM (failures, study time, family relations), LOW (static demographics). A composite weighted_risk_score encodes the full hierarchy as an explicit model hint.",
            "LLM context injection via Firestore. Since LLMs have no persistent memory, previous insights and trend deltas are stored in Firestore and injected into each Gemini API call as a structured briefing — enabling longitudinal, context-aware suggestions without fine-tuning.",
            "Split ML + LLM architecture. Risk classification runs via FastAPI (Python/scikit-learn). Intervention generation runs via Gemini API. These are deliberately decoupled — the classifier is deterministic and auditable; the LLM is generative and contextual. Flutter talks to Firebase Cloud Functions which orchestrate both.",
        ],
        results: [
            "Random Forest achieved highest F1 score among the three models (RF, Gradient Boosting, Logistic Regression) in the ensemble pipeline",
            "SMOTE oversampling successfully balanced the minority dropout class, improving recall on high-risk predictions",
            "Three-tier feature engineering expanded raw dataset columns into 29+ engineered features, with weighted_risk_score ranking consistently in top feature importances",
            "Grade velocity features (G1→G2→G3 trend, consecutive drop flags) emerged as dominant predictors over static demographics",
            "Mental health quiz scores fed into the risk model as an additional behavioral signal alongside teacher-logged ABC data",
            "FastAPI served predictions with sub-second response time for single-student inference",
        ],
        takeaways: [
            "Need to build systems which scale. Practice writing production level code.",
            "Interpretability matters more than raw accuracy when the end user is a classroom teacher, not a data scientist",
            "LLMs need engineered memory — building a Firestore-backed context loop is what makes AI suggestions feel longitudinal rather than generic",
            "Social impact projects demand domain research first: the ABC model, RTI/MTSS tiers, and UNESCO EWS guidelines shaped the ML architecture directly",
            "Class imbalance is the silent killer in dropout datasets — SMOTE was non-negotiable to prevent the model from learning to always predict - 'graduate'",
            "A mental health dimension (psychometric quiz) meaningfully enriched the risk signal beyond pure academic metrics",
        ],
    },
]