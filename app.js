// State Management
const state = {
    currentScreen: 'screen-welcome',
    diagnosticScores: {},
    retestScores: {},
    currentQuestionIndex: 0,
    currentQuiz: [],
    weakTopics: [],
    currentLearningTopicIndex: 0,
    isRetest: false,
};

// Topics list
const TOPICS = ['Variables', 'Conditions', 'Loops', 'Arrays'];

// DOM Elements
const elements = {
    screens: document.querySelectorAll('.screen'),
    nav: document.getElementById('progress-nav'),
    navTopic: document.getElementById('nav-topic'),
    navProgress: document.getElementById('nav-progress-fill'),
    
    // Welcome
    btnStartDiag: document.getElementById('btn-start-diagnostic'),
    
    // Quiz
    quizTitle: document.getElementById('quiz-title'),
    qNum: document.getElementById('current-q-num'),
    qTotal: document.getElementById('total-q-num'),
    qText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    feedbackMsg: document.getElementById('feedback-message'),
    btnNextQ: document.getElementById('btn-next-question'),
    
    // Analysis
    overallScore: document.getElementById('overall-score'),
    topicsGrid: document.getElementById('topics-grid'),
    learningPath: document.getElementById('learning-path'),
    btnStartLearning: document.getElementById('btn-start-learning'),
    
    // Learning
    learningTopicTitle: document.getElementById('learning-topic-title'),
    learningStatusBadge: document.getElementById('learning-status-badge'),
    learningExplanation: document.getElementById('learning-explanation'),
    learningExample: document.getElementById('learning-example'),
    learningHint: document.getElementById('learning-hint'),
    hintSection: document.getElementById('hint-section'),
    practiceQText: document.getElementById('practice-question-text'),
    practiceOptions: document.getElementById('practice-options-container'),
    practiceFeedback: document.getElementById('practice-feedback'),
    btnNextPractice: document.getElementById('btn-next-practice'),
    
    // Dashboard
    finalDiagScore: document.getElementById('final-diag-score'),
    finalRetestScore: document.getElementById('final-retest-score'),
    finalImprovement: document.getElementById('final-improvement'),
    comparisonTbody: document.getElementById('comparison-tbody'),
    btnRestart: document.getElementById('btn-restart')
};

// --- Initialization ---

function init() {
    // Event Listeners
    elements.btnStartDiag.addEventListener('click', startDiagnostic);
    elements.btnNextQ.addEventListener('click', handleNextQuestion);
    elements.btnStartLearning.addEventListener('click', startLearningModule);
    elements.btnNextPractice.addEventListener('click', handleNextPractice);
    elements.btnRestart.addEventListener('click', resetApp);
    
    showScreen('screen-welcome');
}

function showScreen(screenId) {
    elements.screens.forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    state.currentScreen = screenId;
    
    if (screenId === 'screen-quiz' || screenId === 'screen-learning') {
        elements.nav.classList.remove('hidden');
    } else {
        elements.nav.classList.add('hidden');
    }
}

function updateProgress(current, total, topicText) {
    const percentage = (current / total) * 100;
    elements.navProgress.style.width = `${percentage}%`;
    if (topicText) elements.navTopic.textContent = topicText;
}

// --- Diagnostic Quiz ---

function startDiagnostic() {
    state.isRetest = false;
    state.currentQuiz = [...questionsDB]; // Assuming questionsDB is shuffled or used as is
    state.currentQuestionIndex = 0;
    
    // Initialize scores
    TOPICS.forEach(t => state.diagnosticScores[t] = { correct: 0, total: 0 });
    
    elements.quizTitle.textContent = "Diagnostic Assessment";
    elements.qTotal.textContent = state.currentQuiz.length;
    
    loadQuestion();
    showScreen('screen-quiz');
}

function loadQuestion() {
    const q = state.currentQuiz[state.currentQuestionIndex];
    elements.qNum.textContent = state.currentQuestionIndex + 1;
    elements.qText.textContent = q.text;
    updateProgress(state.currentQuestionIndex, state.currentQuiz.length, `Diagnostic: ${q.topic}`);
    
    elements.optionsContainer.innerHTML = '';
    elements.feedbackMsg.className = 'feedback hidden';
    elements.btnNextQ.classList.add('hidden');
    
    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => selectOption(btn, index, q);
        elements.optionsContainer.appendChild(btn);
    });
}

function selectOption(btn, selectedIndex, q) {
    // Disable all options
    const allBtns = elements.optionsContainer.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true);
    
    const isCorrect = selectedIndex === q.correctAnswer;
    
    // Record score
    const scoreObj = state.isRetest ? state.retestScores : state.diagnosticScores;
    scoreObj[q.topic].total++;
    if (isCorrect) scoreObj[q.topic].correct++;
    
    // Visual feedback
    btn.classList.add('selected');
    allBtns[q.correctAnswer].classList.add('correct');
    if (!isCorrect) {
        btn.classList.add('incorrect');
    }
    
    elements.feedbackMsg.textContent = isCorrect ? '✅ Correct! ' + q.explanation : '❌ Incorrect. ' + q.explanation;
    elements.feedbackMsg.className = `feedback ${isCorrect ? 'success' : 'error'}`;
    
    elements.btnNextQ.classList.remove('hidden');
    
    if (state.isRetest && !isCorrect && state.currentQuestionIndex === state.currentQuiz.length -1) {
       elements.btnNextQ.textContent = 'Finish Retest';
    } else if (!state.isRetest && state.currentQuestionIndex === state.currentQuiz.length - 1) {
        elements.btnNextQ.textContent = 'Analyze Results';
    } else {
        elements.btnNextQ.textContent = 'Next';
    }
}

function handleNextQuestion() {
    state.currentQuestionIndex++;
    if (state.currentQuestionIndex < state.currentQuiz.length) {
        loadQuestion();
    } else {
        if (state.isRetest) {
            showDashboard();
        } else {
            showAnalysis();
        }
    }
}

// --- Analysis Screen ---

function getStatusInfo(percentage) {
    if (percentage >= 80) return { label: 'Strong', class: 'strong' };
    if (percentage >= 60) return { label: 'Moderate', class: 'moderate' };
    if (percentage >= 40) return { label: 'Weak', class: 'weak' };
    return { label: 'Needs Attention', class: 'attention' };
}

function showAnalysis() {
    let totalCorrect = 0;
    let totalQs = 0;
    
    elements.topicsGrid.innerHTML = '';
    state.weakTopics = [];
    
    TOPICS.forEach(topic => {
        const stats = state.diagnosticScores[topic];
        const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
        
        totalCorrect += stats.correct;
        totalQs += stats.total;
        
        const status = getStatusInfo(pct);
        
        if (pct < 80) {
            state.weakTopics.push({ topic, pct });
        }
        
        const card = document.createElement('div');
        card.className = `topic-card ${status.class}`;
        card.innerHTML = `
            <h4>${topic}</h4>
            <div style="font-size: 1.5rem; font-weight: bold; margin: 0.5rem 0;">${pct}%</div>
            <div class="status-badge">${status.label}</div>
        `;
        elements.topicsGrid.appendChild(card);
    });
    
    const overallPct = Math.round((totalCorrect / totalQs) * 100);
    elements.overallScore.textContent = `${overallPct}%`;
    
    // Sort weak topics by lowest score first
    state.weakTopics.sort((a, b) => a.pct - b.pct);
    
    elements.learningPath.innerHTML = '';
    if (state.weakTopics.length === 0) {
        elements.learningPath.innerHTML = '<p>Great job! You have a strong grasp of all concepts. No targeted learning required.</p>';
        elements.btnStartLearning.textContent = 'Take Retest Anyway';
    } else {
        state.weakTopics.forEach((t, i) => {
            const step = document.createElement('div');
            step.className = 'path-step';
            step.innerHTML = `
                <div class="step-number">${i + 1}</div>
                <div>
                    <strong>${t.topic}</strong>
                    <div style="font-size: 0.9rem; color: var(--text-muted)">Currently at ${t.pct}%. Needs improvement.</div>
                </div>
            `;
            elements.learningPath.appendChild(step);
        });
        elements.btnStartLearning.textContent = 'Start Adaptive Learning';
    }
    
    showScreen('screen-analysis');
}

// --- Learning Module ---

function startLearningModule() {
    if (state.weakTopics.length === 0) {
        startRetest();
        return;
    }
    
    state.currentLearningTopicIndex = 0;
    loadLearningTopic();
    showScreen('screen-learning');
}

function loadLearningTopic() {
    const topicData = state.weakTopics[state.currentLearningTopicIndex];
    const moduleInfo = learningModules[topicData.topic];
    
    elements.learningTopicTitle.textContent = `Learning: ${topicData.topic}`;
    elements.learningStatusBadge.textContent = 'Reviewing';
    
    elements.learningExplanation.textContent = moduleInfo.explanation;
    elements.learningExample.textContent = moduleInfo.example;
    elements.learningHint.textContent = moduleInfo.hint;
    
    // Show hint by default to provide extra support for weak topics
    elements.hintSection.classList.remove('hidden');
    
    updateProgress(state.currentLearningTopicIndex, state.weakTopics.length, `Learning: ${topicData.topic}`);
    
    // Load Practice Question
    elements.practiceQText.textContent = moduleInfo.practice.text;
    elements.practiceOptions.innerHTML = '';
    elements.practiceFeedback.className = 'feedback hidden';
    elements.btnNextPractice.classList.add('hidden');
    
    moduleInfo.practice.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => selectPracticeOption(btn, index, moduleInfo.practice);
        elements.practiceOptions.appendChild(btn);
    });
}

function selectPracticeOption(btn, selectedIndex, practiceInfo) {
    const allBtns = elements.practiceOptions.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true);
    
    const isCorrect = selectedIndex === practiceInfo.correctAnswer;
    
    btn.classList.add('selected');
    allBtns[practiceInfo.correctAnswer].classList.add('correct');
    if (!isCorrect) btn.classList.add('incorrect');
    
    elements.practiceFeedback.textContent = isCorrect ? '✅ Spot on! ' + practiceInfo.explanation : '💡 Let\'s try again. ' + practiceInfo.explanation;
    elements.practiceFeedback.className = `feedback ${isCorrect ? 'success' : 'error'}`;
    
    elements.btnNextPractice.classList.remove('hidden');
    
    if (state.currentLearningTopicIndex === state.weakTopics.length - 1) {
        elements.btnNextPractice.textContent = 'Proceed to Retest';
    } else {
        elements.btnNextPractice.textContent = 'Next Topic';
    }
}

function handleNextPractice() {
    state.currentLearningTopicIndex++;
    if (state.currentLearningTopicIndex < state.weakTopics.length) {
        loadLearningTopic();
    } else {
        startRetest();
    }
}

// --- Retest ---

function startRetest() {
    state.isRetest = true;
    
    // Only retest weak topics
    const topicsToRetest = state.weakTopics.length > 0 ? state.weakTopics.map(t => t.topic) : TOPICS;
    
    state.currentQuiz = retestDB.filter(q => topicsToRetest.includes(q.topic));
    
    if (state.currentQuiz.length === 0) {
         // Fallback if no specific retest questions (should not happen based on DB)
         showDashboard();
         return;
    }
    
    state.currentQuestionIndex = 0;
    
    TOPICS.forEach(t => state.retestScores[t] = { correct: 0, total: 0 });
    
    elements.quizTitle.textContent = "Reassessment";
    elements.qTotal.textContent = state.currentQuiz.length;
    
    loadQuestion();
    showScreen('screen-quiz');
}

// --- Dashboard ---

function showDashboard() {
    let diagCorrect = 0, diagTotal = 0;
    let retestCorrect = 0, retestTotal = 0;
    
    elements.comparisonTbody.innerHTML = '';
    
    TOPICS.forEach(topic => {
        const dStats = state.diagnosticScores[topic];
        const rStats = state.retestScores[topic];
        
        const dPct = dStats.total > 0 ? Math.round((dStats.correct / dStats.total) * 100) : 0;
        
        diagCorrect += dStats.correct;
        diagTotal += dStats.total;
        
        // If topic wasn't retested, copy old score, else use new score
        const rPct = rStats.total > 0 
            ? Math.round((rStats.correct / rStats.total) * 100)
            : dPct;
            
        if (rStats.total > 0) {
            retestCorrect += rStats.correct;
            retestTotal += rStats.total;
        } else {
            retestCorrect += dStats.correct;
            retestTotal += dStats.total;
        }
        
        const diff = rPct - dPct;
        const diffStr = diff > 0 ? `+${diff}%` : (diff < 0 ? `${diff}%` : `0%`);
        const statusClass = diff > 0 ? 'improvement-up' : 'improvement-same';
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${topic}</strong></td>
            <td>${dPct}%</td>
            <td>${rPct}%</td>
            <td class="${statusClass}">${diffStr}</td>
        `;
        elements.comparisonTbody.appendChild(tr);
    });
    
    const overallDiagPct = Math.round((diagCorrect / diagTotal) * 100);
    const overallRetestPct = Math.round((retestCorrect / retestTotal) * 100);
    const overallDiff = overallRetestPct - overallDiagPct;
    
    elements.finalDiagScore.textContent = `${overallDiagPct}%`;
    elements.finalRetestScore.textContent = `${overallRetestPct}%`;
    
    elements.finalImprovement.textContent = overallDiff > 0 ? `+${overallDiff}%` : `${overallDiff}%`;
    elements.finalImprovement.className = `score-lg ${overallDiff > 0 ? 'positive' : ''}`;
    
    showScreen('screen-dashboard');
}

function resetApp() {
    init();
}

// Start
document.addEventListener('DOMContentLoaded', init);
