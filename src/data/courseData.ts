import { Chapter, Question } from '../types';

export const CHAPTERS: Chapter[] = [
  {
    id: 0,
    title: "1. Introduction to Artificial Intelligence",
    topic: "ANI vs AGI & Foundation",
    videoTitle: "Video Lecture 1: What is AI?",
    duration: "02:45",
    iconName: "Brain",
    description: `
      <p class="mb-3">Artificial Intelligence (AI) refers to computer systems designed to perform tasks that typically require human intelligence, such as visual perception, speech recognition, and decision-making.</p>
      <div class="bg-indigo-950/40 p-3 rounded-xl border border-indigo-800/60 my-3">
        <h4 class="font-semibold text-indigo-300 mb-1 text-sm">Key Classifications:</h4>
        <p class="mb-2"><strong>Narrow AI (ANI):</strong> Specialized AI engineered to solve a single specific task (e.g., facial recognition, spam filtering, or chess engines).</p>
        <p><strong>General AI (AGI):</strong> Hypothetical AI capable of understanding, learning, and applying knowledge across any human-level cognitive domain seamlessly.</p>
      </div>
    `,
    keyTakeaways: [
      "AI mimics human cognitive functions using mathematical models and data.",
      "Artificial Narrow Intelligence (ANI) powers 100% of current real-world applications.",
      "Artificial General Intelligence (AGI) remains a theoretical future milestone."
    ],
    transcript: "Welcome to Chapter 1. Artificial Intelligence is the foundation of modern digital automation. Today we differentiate Narrow AI, which excels at single specialized tasks like playing chess or analyzing medical scans, from General AI, which represents human-equivalent adaptability across all cognitive fields."
  },
  {
    id: 1,
    title: "2. Machine Learning Fundamentals",
    topic: "Supervised & Unsupervised Learning",
    videoTitle: "Video Lecture 2: How ML Works",
    duration: "03:10",
    iconName: "Cpu",
    description: `
      <p class="mb-3">Machine Learning (ML) is a core subset of AI enabling software applications to become accurate in predicting outcomes without being explicitly programmed with hardcoded rules.</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
        <div class="bg-slate-800/90 p-3 rounded-xl border border-slate-700">
          <span class="text-xs font-bold text-emerald-400 block mb-1">Supervised Learning</span>
          <p class="text-xs text-slate-300">Training models on labeled datasets where inputs correspond to known target outputs (e.g. predicting house prices).</p>
        </div>
        <div class="bg-slate-800/90 p-3 rounded-xl border border-slate-700">
          <span class="text-xs font-bold text-cyan-400 block mb-1">Unsupervised Learning</span>
          <p class="text-xs text-slate-300">Discovering hidden structures or clusters in unlabeled datasets (e.g. customer segmentation).</p>
        </div>
      </div>
    `,
    keyTakeaways: [
      "Supervised learning relies on labeled training data with ground-truth inputs and outputs.",
      "Unsupervised learning discovers intrinsic groupings and patterns in raw data without labels.",
      "Reinforcement learning trains agents through trial-and-error feedback loops using rewards."
    ],
    transcript: "In Chapter 2, we explore Machine Learning. Rather than writing manual IF-THEN rules, we feed data into algorithms. Supervised learning learns from labeled examples, whereas unsupervised learning organizes unlabeled data into meaningful clusters automatically."
  },
  {
    id: 2,
    title: "3. Deep Learning & Neural Networks",
    topic: "Artificial Neural Networks (ANN)",
    videoTitle: "Video Lecture 3: Neural Networks Demystified",
    duration: "03:40",
    iconName: "Network",
    description: `
      <p class="mb-3">Deep Learning uses artificial neural networks inspired by the biological structures of the human brain to process multi-layered unstructured data.</p>
      <p class="mb-3">Unlike traditional machine learning, deep neural networks automatically extract feature hierarchies directly from raw input like pixels or soundwaves without manual feature engineering.</p>
      <div class="bg-purple-950/40 p-3 rounded-xl border border-purple-800/60">
        <span class="text-xs font-mono text-purple-300 font-bold">Architecture Layering:</span>
        <span class="text-xs text-slate-300 block mt-1">Input Layer &rarr; Hidden Deep Layers (Weights & Biases) &rarr; Activation Function &rarr; Output Layer</span>
      </div>
    `,
    keyTakeaways: [
      "Inspired by biological neurons connected in weighted layers.",
      "Automatically extracts high-level abstract features from raw unstructured data.",
      "Forms the engine behind Large Language Models, deep vision, and modern speech synthesis."
    ],
    transcript: "Welcome to Deep Learning. Deep Neural Networks pass information through multiple layers of synthetic neurons. As data flows deeper into the hidden layers, the network automatically extracts complex abstractions, enabling breakthroughs in computer vision and natural language processing."
  },
  {
    id: 3,
    title: "4. Natural Language Processing (NLP)",
    topic: "Text & Voice AI Systems",
    videoTitle: "Video Lecture 4: Understanding Human Language",
    duration: "03:15",
    iconName: "MessageSquareText",
    description: `
      <p class="mb-3">Natural Language Processing (NLP) allows computers to synthesize, understand, parse, and translate human speech and written language.</p>
      <div class="space-y-2 text-xs">
        <div class="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
          <strong class="text-indigo-300">Tokenization & Embeddings:</strong> Breaking down human sentences into mathematical numerical vectors that capture semantic meaning.
        </div>
        <div class="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
          <strong class="text-indigo-300">Transformers & LLMs:</strong> Attention mechanisms that allow models to contextualize words across long paragraphs simultaneously.
        </div>
      </div>
    `,
    keyTakeaways: [
      "NLP converts unstructured text and speech into vector embeddings.",
      "Powers voice assistants (Siri, Alexa), machine translation, and Large Language Models.",
      "Transformer architectures utilize attention mechanisms for contextual text generation."
    ],
    transcript: "Chapter 4 covers Natural Language Processing. NLP bridges human communication and binary computation. By converting text into high-dimensional vector embeddings, AI systems can decipher sentiment, summarize text, and converse naturally in real-time."
  },
  {
    id: 4,
    title: "5. Computer Vision & Perception",
    topic: "Visual Data & Image Analysis",
    videoTitle: "Video Lecture 5: How Machines See",
    duration: "02:55",
    iconName: "Eye",
    description: `
      <p class="mb-3">Computer Vision enables AI systems to derive meaningful information, context, and structural geometry from digital images, video streams, and visual sensors.</p>
      <div class="bg-amber-950/30 p-3 rounded-xl border border-amber-800/50 text-xs">
        <strong class="text-amber-300 block mb-1">Real-World Implementations:</strong>
        <ul class="list-disc list-inside space-y-1 text-slate-300">
          <li>Autonomous vehicle navigation (detecting traffic lights & pedestrians)</li>
          <li>Optical Character Recognition (OCR) and document scanning</li>
          <li>Medical imaging diagnostics (detecting tumors in X-rays/MRIs)</li>
        </ul>
      </div>
    `,
    keyTakeaways: [
      "Computer Vision parses multi-channel pixel matrices to recognize visual patterns.",
      "Convolutional Neural Networks (CNNs) specialize in spatial feature extraction.",
      "Essential for autonomous robotics, medical diagnostics, and spatial computing."
    ],
    transcript: "In Chapter 5, we explore Computer Vision. Cameras provide pixel grids, but computer vision algorithms interpret shapes, movement, and depth. This perception enables self-driving cars to navigate traffic safely and medical AI to identify anomalies in scans."
  },
  {
    id: 5,
    title: "6. AI Ethics & Responsible Development",
    topic: "Bias, Privacy & Safety",
    videoTitle: "Video Lecture 6: Ethics & Governance",
    duration: "03:30",
    iconName: "ShieldCheck",
    description: `
      <p class="mb-3">Ethical consideration in AI focuses on mitigating algorithmic bias, protecting user data privacy, and establishing governance standards for accountability.</p>
      <div class="space-y-2 text-xs">
        <div class="p-2.5 bg-rose-950/30 rounded-lg border border-rose-800/50 text-rose-200">
          <strong>Mitigating Algorithmic Bias:</strong> Ensuring training datasets represent diverse demographics to prevent discriminatory predictions.
        </div>
        <div class="p-2.5 bg-emerald-950/30 rounded-lg border border-emerald-800/50 text-emerald-200">
          <strong>Transparency & Explainability:</strong> Designing AI systems whose internal reasoning can be audited and understood by human operators.
        </div>
      </div>
    `,
    keyTakeaways: [
      "Algorithmic bias occurs when training data reflects historical human skewed distributions.",
      "Responsible AI requires strict privacy protection, safety guardrails, and transparency.",
      "Human-in-the-loop oversight is critical for high-stakes decisions in healthcare and law."
    ],
    transcript: "Our final chapter covers AI Ethics and Governance. As AI systems assume responsibility in high-stakes decisions, we must ensure datasets are un-biased, user privacy is safeguarded, and models remain explainable and accountable to society."
  }
];

export const QUESTIONS: Question[] = [
  {
    id: 1,
    chapterId: 0,
    question: "1. What is the key distinction of Artificial Narrow Intelligence (ANI)?",
    options: [
      "It possesses full human-like consciousness and general cognition.",
      "It is designed and trained to perform a specific dedicated task.",
      "It can independently learn any job without training data.",
      "It operates exclusively on mechanical hardware without software."
    ],
    correct: 1,
    explanation: "Artificial Narrow Intelligence (ANI) is designed and optimized for a specific domain or single task (like playing chess or facial recognition), unlike theoretical AGI which handles any cognitive task."
  },
  {
    id: 2,
    chapterId: 0,
    question: "2. Which theoretical concept describes AI capable of performing ANY intellectual task a human can do?",
    options: [
      "Artificial General Intelligence (AGI)",
      "Artificial Narrow Intelligence (ANI)",
      "Rule-Based Expert System",
      "Deterministic Algorithm"
    ],
    correct: 0,
    explanation: "Artificial General Intelligence (AGI) refers to a human-level AI capable of learning and reasoning across any cognitive domain."
  },
  {
    id: 3,
    chapterId: 1,
    question: "3. Supervised Learning algorithms require which of the following dataset types?",
    options: [
      "Unlabeled raw data",
      "Labeled training dataset",
      "Random unformatted text",
      "Encrypted server logs"
    ],
    correct: 1,
    explanation: "Supervised Learning requires a labeled training dataset where each sample is explicitly paired with a target ground-truth output label."
  },
  {
    id: 4,
    chapterId: 1,
    question: "4. Which machine learning approach is primarily used for finding hidden customer segments in unlabeled data?",
    options: [
      "Supervised Regression",
      "Unsupervised Learning / Clustering",
      "Manual Hand-coded Rules",
      "Linear Optimization"
    ],
    correct: 1,
    explanation: "Unsupervised Learning algorithms (such as K-Means clustering) group unlabeled data into natural clusters without requiring pre-defined labels."
  },
  {
    id: 5,
    chapterId: 2,
    question: "5. Deep Learning models are fundamentally inspired by which biological structure?",
    options: [
      "The human circulatory system",
      "Biological neural networks in the human brain",
      "Plant cellular division",
      "DNA strand replication"
    ],
    correct: 1,
    explanation: "Deep Learning utilizes artificial neural networks structured after the interconnected neurons in the human cerebral cortex."
  },
  {
    id: 6,
    chapterId: 2,
    question: "6. What advantage does Deep Learning offer over classical machine learning algorithms?",
    options: [
      "It requires zero computational power.",
      "It automatically extracts feature hierarchies from complex raw data.",
      "It never makes mistakes.",
      "It does not require any input data."
    ],
    correct: 1,
    explanation: "Deep Learning automatically extracts hierarchical features from raw data (like audio or image pixels) without requiring manual human feature engineering."
  },
  {
    id: 7,
    chapterId: 3,
    question: "7. Which branch of AI enables virtual voice assistants to understand human spoken commands?",
    options: [
      "Computer Vision",
      "Natural Language Processing (NLP)",
      "Robotic Hardware Design",
      "Quantum Cryptography"
    ],
    correct: 1,
    explanation: "Natural Language Processing (NLP) handles text analysis, speech recognition, sentiment understanding, and conversational language synthesis."
  },
  {
    id: 8,
    chapterId: 4,
    question: "8. Self-driving cars rely primarily on which AI domain to perceive traffic signals and pedestrians?",
    options: [
      "Computer Vision",
      "Audio Synthesizer",
      "Database Indexing",
      "Natural Language Processing"
    ],
    correct: 0,
    explanation: "Computer Vision processes visual data from cameras and LiDAR sensors to identify objects, traffic signs, lane markers, and pedestrians."
  },
  {
    id: 9,
    chapterId: 5,
    question: "9. Why is dataset diversity critical in Responsible AI development?",
    options: [
      "To increase video rendering speed.",
      "To prevent and mitigate algorithmic bias.",
      "To make the file size smaller.",
      "To bypass network firewalls."
    ],
    correct: 1,
    explanation: "Diverse training data prevents algorithmic bias by ensuring AI models perform accurately and equitably across all user demographics."
  },
  {
    id: 10,
    chapterId: 5,
    question: "10. Which factor is a core pillar of ethical AI governance?",
    options: [
      "Data privacy and algorithmic transparency",
      "Maximizing data mining without consent",
      "Hiding software source code",
      "Eliminating human oversight entirely"
    ],
    correct: 0,
    explanation: "Data privacy, algorithmic transparency, fairness, safety, and explainability form the core foundation of responsible AI governance."
  }
];
