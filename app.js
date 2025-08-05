// Codebreaker Challenge Application
class CodebreakerChallenge {
    constructor() {
        this.gameState = {
            currentScreen: 'welcome',
            playerName: '',
            difficulty: 'medium',
            currentStage: 1,
            startTime: null,
            endTime: null,
            score: {
                stage1: 0,
                stage2: 0,
                stage3: 0,
                hintsUsed: 0,
                totalCorrect: 0,
                totalQuestions: 0
            },
            currentPuzzle: null,
            currentTrivia: null,
            currentWordScramble: null,
            currentCodeArrange: null,
            earnedBadges: [],
            leaderboard: this.loadLeaderboard(),
            stageAnswered: false
        };

        this.puzzleData = {
            logic_puzzles: [
                {
                    id: 1,
                    type: "visual_bug",
                    title: "Find the Bug",
                    description: "Look at this code snippet and identify the syntax error",
                    code: "for i in range(10)\n    print(i)",
                    correct_answer: "Missing colon",
                    options: ["Missing colon", "Wrong indentation", "Missing parentheses", "Variable error"],
                    difficulty: "easy"
                },
                {
                    id: 2,
                    type: "logic_grid",
                    title: "Binary Logic",
                    description: "What is the binary representation of 15?",
                    correct_answer: "1111",
                    options: ["1010", "1111", "1100", "1001"],
                    difficulty: "medium"
                },
                {
                    id: 3,
                    type: "pattern_recognition",
                    title: "Sequence Pattern",
                    description: "Complete the sequence: 2, 4, 8, 16, ?",
                    correct_answer: "32",
                    options: ["24", "32", "28", "30"],
                    difficulty: "easy"
                }
            ],
            tech_trivia: [
                {
                    id: 1,
                    question: "Which programming language is known as the 'mother of all languages'?",
                    correct_answer: "C",
                    options: ["Python", "Java", "C", "Assembly"],
                    category: "Programming Languages",
                    difficulty: "medium"
                },
                {
                    id: 2,
                    question: "What does API stand for?",
                    correct_answer: "Application Programming Interface",
                    options: ["Advanced Programming Interface", "Application Programming Interface", "Automated Program Integration", "Applied Programming Instructions"],
                    category: "Software Development",
                    difficulty: "easy"
                },
                {
                    id: 3,
                    question: "Which company developed the React JavaScript library?",
                    correct_answer: "Facebook",
                    options: ["Google", "Microsoft", "Facebook", "Twitter"],
                    category: "Web Development",
                    difficulty: "easy"
                },
                {
                    id: 4,
                    question: "What is the time complexity of binary search?",
                    correct_answer: "O(log n)",
                    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
                    category: "Algorithms",
                    difficulty: "medium"
                },
                {
                    id: 5,
                    question: "Which protocol is used for secure web communication?",
                    correct_answer: "HTTPS",
                    options: ["HTTP", "HTTPS", "FTP", "SMTP"],
                    category: "Networking",
                    difficulty: "easy"
                }
            ],
            word_scrambles: [
                {
                    id: 1,
                    scrambled: "TPYHON",
                    correct_answer: "PYTHON",
                    hint: "Popular programming language with snake logo",
                    category: "Programming Languages"
                },
                {
                    id: 2,
                    scrambled: "TAABAEDS",
                    correct_answer: "DATABASE",
                    hint: "Storage system for organized data",
                    category: "Data Management"
                },
                {
                    id: 3,
                    scrambled: "GORHLITMA",
                    correct_answer: "ALGORITHM",
                    hint: "Step-by-step problem-solving procedure",
                    category: "Computer Science"
                },
                {
                    id: 4,
                    scrambled: "GNINRAEL",
                    correct_answer: "LEARNING",
                    hint: "Process of acquiring knowledge",
                    category: "Education"
                },
                {
                    id: 5,
                    scrambled: "KROWTEN",
                    correct_answer: "NETWORK",
                    hint: "Connected system of computers",
                    category: "Technology"
                }
            ],
            drag_drop_code: [
                {
                    id: 1,
                    title: "Complete the Python Function",
                    description: "Arrange the code blocks to create a function that prints 'Hello World'",
                    code_blocks: ["def hello():", "    print('Hello World')", "hello()"],
                    correct_order: [0, 1, 2],
                    difficulty: "easy"
                },
                {
                    id: 2,
                    title: "For Loop Structure",
                    description: "Create a proper for loop that prints numbers 1 to 5",
                    code_blocks: ["for i in range(1, 6):", "    print(i)"],
                    correct_order: [0, 1],
                    difficulty: "medium"
                }
            ]
        };

        this.badgesConfig = {
            speed_coder: {
                name: "Speed Coder",
                description: "Completed all challenges in under 60 seconds",
                icon: "⚡",
                criteria: { time_limit: 60, completion_rate: 100 }
            },
            tech_guru: {
                name: "Tech Guru",
                description: "Answered all tech trivia questions correctly",
                icon: "🧠",
                criteria: { trivia_accuracy: 100 }
            },
            puzzle_master: {
                name: "Puzzle Master",
                description: "Solved all logic puzzles without hints",
                icon: "🧩",
                criteria: { puzzle_accuracy: 100, hints_used: 0 }
            },
            code_ninja: {
                name: "Code Ninja",
                description: "Perfect completion of all drag-drop challenges",
                icon: "🥷",
                criteria: { code_accuracy: 100 }
            },
            word_wizard: {
                name: "Word Wizard",
                description: "Unscrambled all words correctly",
                icon: "📝",
                criteria: { word_accuracy: 100 }
            },
            bronze_challenger: {
                name: "Bronze Challenger",
                description: "Completed the basic challenge",
                icon: "🥉",
                criteria: { completion_rate: 50 }
            },
            silver_achiever: {
                name: "Silver Achiever",
                description: "Completed challenge with good performance",
                icon: "🥈",
                criteria: { completion_rate: 75, accuracy: 75 }
            },
            gold_champion: {
                name: "Gold Champion",
                description: "Excellent performance across all challenges",
                icon: "🥇",
                criteria: { completion_rate: 90, accuracy: 90 }
            }
        };

        this.socialSharing = {
            instagram: {
                template: "I conquered the Codebreaker challenge at SRM Ramapuram Project Club! 🚀 Got the {badge_name} badge! #SRMProjectClub #CampusCoders #TechChallenge"
            },
            linkedin: {
                template: "Just completed the Codebreaker challenge at SRM Ramapuram Project Club and earned the {badge_name} badge! Excited to be part of this amazing tech community. #SRMProjectClub #TechSkills #StudentAchievement"
            },
            twitter: {
                template: "🎉 Conquered the Codebreaker challenge @SRMProjectClub! Earned {badge_name} badge in {completion_time}s! #SRMProjectClub #CampusCoders"
            }
        };

        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.bindEvents();
                this.showScreen('welcome');
                this.updateMiniLeaderboard();
            });
        } else {
            this.bindEvents();
            this.showScreen('welcome');
            this.updateMiniLeaderboard();
        }
    }

    bindEvents() {
        // Debug log
        console.log('Binding events...');

        // Difficulty selection - ensure both cards and QR codes work
        const difficultyElements = document.querySelectorAll('.difficulty-card, .qr-code');
        console.log('Found difficulty elements:', difficultyElements.length);

        difficultyElements.forEach((card, index) => {
            console.log(`Binding event to element ${index}:`, card.dataset.level);
            card.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const level = e.currentTarget.dataset.level || 'medium';
                console.log('Difficulty selected:', level);
                this.gameState.difficulty = level;
                this.showScreen('registration');
            });
        });

        // Start challenge button
        const startBtn = document.getElementById('start-challenge-btn');
        if (startBtn) {
            startBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const nameInput = document.getElementById('player-name');
                const name = nameInput ? nameInput.value.trim() : '';
                console.log('Start challenge clicked, name:', name);
                if (name) {
                    this.gameState.playerName = name;
                    this.startChallenge();
                } else {
                    this.showError('Please enter your name to continue!');
                    if (nameInput) nameInput.focus();
                }
            });
        }

        // Enhanced input field handling
        const nameInput = document.getElementById('player-name');
        if (nameInput) {
            // Multiple event listeners to ensure input works
            nameInput.addEventListener('input', (e) => {
                console.log('Input value changed:', e.target.value);
            });
            nameInput.addEventListener('keyup', (e) => {
                console.log('Keyup:', e.target.value);
            });
            nameInput.addEventListener('focus', (e) => {
                console.log('Input focused');
            });
        }

        // Submit answer button
        const submitBtn = document.getElementById('submit-answer-btn');
        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Submit answer clicked, stage:', this.gameState.currentStage, 'answered:', this.gameState.stageAnswered);
                if (!this.gameState.stageAnswered) {
                    this.submitAnswer();
                }
            });
        }

        // Hint button
        const hintBtn = document.getElementById('hint-btn');
        if (hintBtn) {
            hintBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showHint();
            });
        }

        // Social sharing buttons
        const shareInstagram = document.getElementById('share-instagram');
        const shareLinkedin = document.getElementById('share-linkedin');
        const shareTwitter = document.getElementById('share-twitter');

        if (shareInstagram) shareInstagram.addEventListener('click', () => this.shareOnSocial('instagram'));
        if (shareLinkedin) shareLinkedin.addEventListener('click', () => this.shareOnSocial('linkedin'));
        if (shareTwitter) shareTwitter.addEventListener('click', () => this.shareOnSocial('twitter'));

        // Navigation buttons
        const viewLeaderboardBtn = document.getElementById('view-leaderboard-btn');
        const playAgainBtn = document.getElementById('play-again-btn');
        const backToResultsBtn = document.getElementById('back-to-results-btn');
        const newChallengeBtn = document.getElementById('new-challenge-btn');

        if (viewLeaderboardBtn) viewLeaderboardBtn.addEventListener('click', () => this.showLeaderboard());
        if (playAgainBtn) playAgainBtn.addEventListener('click', () => this.resetGame());
        if (backToResultsBtn) backToResultsBtn.addEventListener('click', () => this.showScreen('results'));
        if (newChallengeBtn) newChallengeBtn.addEventListener('click', () => this.resetGame());

        // Option selection with event delegation
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('option-button')) {
                console.log('Option clicked:', e.target.textContent);
                // Clear all previous selections in the same container
                const container = e.target.parentNode;
                const allOptions = container.querySelectorAll('.option-button');
                allOptions.forEach(btn => {
                    btn.classList.remove('selected', 'correct', 'incorrect');
                });
                // Select the clicked option
                e.target.classList.add('selected');
                console.log('Option selected:', e.target.dataset.answer);
            }
        });

        console.log('Events bound successfully');
    }

    showScreen(screenName) {
        console.log('Showing screen:', screenName);
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        const targetScreen = document.getElementById(`${screenName}-screen`);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.gameState.currentScreen = screenName;
        } else {
            console.error('Screen not found:', screenName);
        }
    }

    startChallenge() {
        console.log('Starting challenge...');
        this.gameState.startTime = Date.now();
        this.gameState.currentStage = 1;
        this.gameState.stageAnswered = false;
        this.gameState.score = {
            stage1: 0,
            stage2: 0,
            stage3: 0,
            hintsUsed: 0,
            totalCorrect: 0,
            totalQuestions: 0
        };

        this.showScreen('challenge');
        this.startTimer();
        this.loadStage1();
    }

    startTimer() {
        console.log('Starting timer...');
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        this.timerInterval = setInterval(() => {
            if (this.gameState.startTime) {
                const elapsed = Math.floor((Date.now() - this.gameState.startTime) / 1000);
                const minutes = Math.floor(elapsed / 60);
                const seconds = elapsed % 60;
                const timerDisplay = document.getElementById('timer-display');
                if (timerDisplay) {
                    timerDisplay.textContent =
                        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                }
            }
        }, 1000);
    }

    stopTimer() {
        console.log('Stopping timer...');
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.gameState.endTime = Date.now();
    }

    loadStage1() {
        console.log('Loading Stage 1...');
        this.gameState.currentStage = 1;
        this.gameState.stageAnswered = false;
        this.updateProgress(1);

        const currentStageEl = document.getElementById('current-stage');
        if (currentStageEl) currentStageEl.textContent = 'Stage 1';

        // Show stage 1
        document.querySelectorAll('.challenge-stage').forEach(stage => {
            stage.classList.remove('active');
        });
        const stage1 = document.getElementById('stage-1');
        if (stage1) stage1.classList.add('active');

        // Load random puzzle based on difficulty
        const puzzles = this.puzzleData.logic_puzzles.filter(p =>
            this.gameState.difficulty === 'easy' ? p.difficulty === 'easy' :
                this.gameState.difficulty === 'medium' ? ['easy', 'medium'].includes(p.difficulty) :
                    true
        );

        this.gameState.currentPuzzle = this.getRandomItem(puzzles);
        console.log('Selected puzzle:', this.gameState.currentPuzzle);
        this.renderPuzzle();
    }

    renderPuzzle() {
        const puzzle = this.gameState.currentPuzzle;
        console.log('Rendering puzzle:', puzzle.title);

        const titleEl = document.getElementById('puzzle-title');
        const descEl = document.getElementById('puzzle-description');
        const codeEl = document.getElementById('code-display');
        const optionsEl = document.getElementById('puzzle-options');

        if (titleEl) titleEl.textContent = puzzle.title;
        if (descEl) descEl.textContent = puzzle.description;

        if (puzzle.code && codeEl) {
            codeEl.textContent = puzzle.code;
            codeEl.style.display = 'block';
        } else if (codeEl) {
            codeEl.style.display = 'none';
        }

        if (optionsEl) {
            optionsEl.innerHTML = '';
            puzzle.options.forEach(option => {
                const button = document.createElement('div');
                button.className = 'option-button';
                button.textContent = option;
                button.dataset.answer = option;
                optionsEl.appendChild(button);
            });
        }
    }

    loadStage2() {
        console.log('Loading Stage 2...');
        this.gameState.currentStage = 2;
        this.gameState.stageAnswered = false;
        this.updateProgress(2);

        const currentStageEl = document.getElementById('current-stage');
        if (currentStageEl) currentStageEl.textContent = 'Stage 2';

        // Show stage 2
        document.querySelectorAll('.challenge-stage').forEach(stage => {
            stage.classList.remove('active');
        });
        const stage2 = document.getElementById('stage-2');
        if (stage2) stage2.classList.add('active');

        // Load random trivia
        this.gameState.currentTrivia = this.getRandomItem(this.puzzleData.tech_trivia);
        console.log('Selected trivia:', this.gameState.currentTrivia);
        this.renderTrivia();
    }

    renderTrivia() {
        const trivia = this.gameState.currentTrivia;
        console.log('Rendering trivia:', trivia.question);

        const questionEl = document.getElementById('trivia-text');
        const optionsEl = document.getElementById('trivia-options');

        if (questionEl) questionEl.textContent = trivia.question;

        if (optionsEl) {
            optionsEl.innerHTML = '';
            trivia.options.forEach(option => {
                const button = document.createElement('div');
                button.className = 'option-button';
                button.textContent = option;
                button.dataset.answer = option;
                optionsEl.appendChild(button);
            });
        }
    }

    loadStage3() {
        console.log('Loading Stage 3...');
        this.gameState.currentStage = 3;
        this.gameState.stageAnswered = false;
        this.updateProgress(3);

        const currentStageEl = document.getElementById('current-stage');
        if (currentStageEl) currentStageEl.textContent = 'Stage 3';

        // Show stage 3
        document.querySelectorAll('.challenge-stage').forEach(stage => {
            stage.classList.remove('active');
        });
        const stage3 = document.getElementById('stage-3');
        if (stage3) stage3.classList.add('active');

        // Load word scramble and code arrangement
        this.gameState.currentWordScramble = this.getRandomItem(this.puzzleData.word_scrambles);
        this.gameState.currentCodeArrange = this.getRandomItem(this.puzzleData.drag_drop_code);

        console.log('Selected word scramble:', this.gameState.currentWordScramble);
        console.log('Selected code arrange:', this.gameState.currentCodeArrange);

        this.renderStage3();
    }

    renderStage3() {
        // Word scramble
        const wordScramble = this.gameState.currentWordScramble;
        const scrambledEl = document.getElementById('scrambled-word');
        const hintEl = document.getElementById('word-hint');
        const answerEl = document.getElementById('word-answer');

        if (scrambledEl) scrambledEl.textContent = wordScramble.scrambled;
        if (hintEl) hintEl.textContent = `Hint: ${wordScramble.hint}`;
        if (answerEl) answerEl.value = '';

        // Code arrangement
        const codeArrange = this.gameState.currentCodeArrange;
        const descEl = document.getElementById('code-description');
        const codeContainer = document.getElementById('code-blocks');

        if (descEl) descEl.textContent = codeArrange.description;

        if (codeContainer) {
            codeContainer.innerHTML = '';

            // Shuffle code blocks
            const shuffledBlocks = [...codeArrange.code_blocks];
            this.shuffleArray(shuffledBlocks);

            shuffledBlocks.forEach((block, index) => {
                const blockElement = document.createElement('div');
                blockElement.className = 'code-block-item';
                blockElement.textContent = block;
                blockElement.dataset.originalIndex = codeArrange.code_blocks.indexOf(block);
                blockElement.dataset.currentIndex = index;
                codeContainer.appendChild(blockElement);
            });

            // Add drag and drop functionality (simplified with click to reorder)
            this.initCodeReordering();
        }
    }

    initCodeReordering() {
        const codeBlocks = document.querySelectorAll('.code-block-item');
        let selectedBlock = null;

        codeBlocks.forEach(block => {
            block.addEventListener('click', () => {
                if (selectedBlock === null) {
                    selectedBlock = block;
                    block.style.backgroundColor = 'var(--color-primary)';
                    block.style.color = 'var(--color-btn-primary-text)';
                } else if (selectedBlock === block) {
                    selectedBlock = null;
                    block.style.backgroundColor = '';
                    block.style.color = '';
                } else {
                    // Swap blocks
                    const container = block.parentNode;
                    const tempNextSibling = selectedBlock.nextSibling;
                    container.insertBefore(selectedBlock, block.nextSibling);
                    container.insertBefore(block, tempNextSibling);

                    selectedBlock.style.backgroundColor = '';
                    selectedBlock.style.color = '';
                    selectedBlock = null;
                }
            });
        });
    }

    submitAnswer() {
        const currentStage = this.gameState.currentStage;
        console.log('Submitting answer for stage:', currentStage);

        if (currentStage === 1) {
            this.checkStage1Answer();
        } else if (currentStage === 2) {
            this.checkStage2Answer();
        } else if (currentStage === 3) {
            this.checkStage3Answer();
        }
    }

    checkStage1Answer() {
        console.log('Checking Stage 1 answer...');
        const selectedOption = document.querySelector('#puzzle-options .option-button.selected');
        console.log('Selected option:', selectedOption);

        if (!selectedOption) {
            this.showError('Please select an answer!');
            return;
        }

        this.gameState.stageAnswered = true;
        const userAnswer = selectedOption.dataset.answer;
        const correctAnswer = this.gameState.currentPuzzle.correct_answer;

        console.log('User answer:', userAnswer);
        console.log('Correct answer:', correctAnswer);

        this.gameState.score.totalQuestions++;

        if (userAnswer === correctAnswer) {
            console.log('Correct answer!');
            this.gameState.score.stage1 = 100;
            this.gameState.score.totalCorrect++;
            selectedOption.classList.add('correct');
        } else {
            console.log('Incorrect answer!');
            selectedOption.classList.add('incorrect');
            // Show correct answer
            document.querySelectorAll('#puzzle-options .option-button').forEach(btn => {
                if (btn.dataset.answer === correctAnswer) {
                    btn.classList.add('correct');
                }
            });
        }

        console.log('Advancing to Stage 2 in 2 seconds...');
        setTimeout(() => {
            this.loadStage2();
        }, 2000);
    }

    checkStage2Answer() {
        console.log('Checking Stage 2 answer...');
        const selectedOption = document.querySelector('#trivia-options .option-button.selected');
        console.log('Selected option:', selectedOption);

        if (!selectedOption) {
            this.showError('Please select an answer!');
            return;
        }

        this.gameState.stageAnswered = true;
        const userAnswer = selectedOption.dataset.answer;
        const correctAnswer = this.gameState.currentTrivia.correct_answer;

        console.log('User answer:', userAnswer);
        console.log('Correct answer:', correctAnswer);

        this.gameState.score.totalQuestions++;

        if (userAnswer === correctAnswer) {
            console.log('Correct answer!');
            this.gameState.score.stage2 = 100;
            this.gameState.score.totalCorrect++;
            selectedOption.classList.add('correct');
        } else {
            console.log('Incorrect answer!');
            selectedOption.classList.add('incorrect');
            // Show correct answer
            document.querySelectorAll('#trivia-options .option-button').forEach(btn => {
                if (btn.dataset.answer === correctAnswer) {
                    btn.classList.add('correct');
                }
            });
        }

        console.log('Advancing to Stage 3 in 2 seconds...');
        setTimeout(() => {
            this.loadStage3();
        }, 2000);
    }

    checkStage3Answer() {
        console.log('Checking Stage 3 answer...');
        const wordInput = document.getElementById('word-answer');
        const wordAnswer = wordInput ? wordInput.value.toUpperCase().trim() : '';
        const correctWord = this.gameState.currentWordScramble.correct_answer;

        if (!wordAnswer) {
            this.showError('Please enter your answer for the word scramble!');
            return;
        }

        this.gameState.stageAnswered = true;

        const codeBlocks = Array.from(document.querySelectorAll('.code-block-item'));
        const currentOrder = codeBlocks.map(block => parseInt(block.dataset.originalIndex));
        const correctOrder = this.gameState.currentCodeArrange.correct_order;

        let wordCorrect = wordAnswer === correctWord;
        let codeCorrect = JSON.stringify(currentOrder) === JSON.stringify(correctOrder);

        console.log('Word answer:', wordAnswer, 'Correct:', correctWord, 'Match:', wordCorrect);
        console.log('Code order:', currentOrder, 'Correct:', correctOrder, 'Match:', codeCorrect);

        this.gameState.score.totalQuestions += 2;

        if (wordCorrect) {
            this.gameState.score.totalCorrect++;
        }
        if (codeCorrect) {
            this.gameState.score.totalCorrect++;
        }

        this.gameState.score.stage3 = ((wordCorrect ? 1 : 0) + (codeCorrect ? 1 : 0)) * 50;

        // Show feedback
        if (wordInput) {
            if (wordCorrect) {
                wordInput.style.borderColor = 'var(--color-success)';
                wordInput.style.backgroundColor = 'var(--color-bg-3)';
            } else {
                wordInput.style.borderColor = 'var(--color-error)';
                wordInput.style.backgroundColor = 'var(--color-bg-4)';
            }
        }

        console.log('Completing challenge in 2 seconds...');
        setTimeout(() => {
            this.completeChallenge();
        }, 2000);
    }

    completeChallenge() {
        console.log('Completing challenge...');
        this.stopTimer();
        this.calculateBadges();
        this.updateLeaderboard();
        this.showResults();
    }

    calculateBadges() {
        const completionTime = (this.gameState.endTime - this.gameState.startTime) / 1000;
        const accuracy = (this.gameState.score.totalCorrect / this.gameState.score.totalQuestions) * 100;
        const completionRate = ((this.gameState.score.stage1 + this.gameState.score.stage2 + this.gameState.score.stage3) / 300) * 100;

        console.log('Calculating badges:', { completionTime, accuracy, completionRate });

        this.gameState.earnedBadges = [];

        // Check each badge criteria
        Object.entries(this.badgesConfig).forEach(([key, badge]) => {
            let earned = true;

            if (badge.criteria.time_limit && completionTime > badge.criteria.time_limit) {
                earned = false;
            }
            if (badge.criteria.completion_rate && completionRate < badge.criteria.completion_rate) {
                earned = false;
            }
            if (badge.criteria.accuracy && accuracy < badge.criteria.accuracy) {
                earned = false;
            }
            if (badge.criteria.hints_used !== undefined && this.gameState.score.hintsUsed > badge.criteria.hints_used) {
                earned = false;
            }
            if (badge.criteria.trivia_accuracy && this.gameState.score.stage2 < badge.criteria.trivia_accuracy) {
                earned = false;
            }
            if (badge.criteria.puzzle_accuracy && this.gameState.score.stage1 < badge.criteria.puzzle_accuracy) {
                earned = false;
            }
            if (badge.criteria.code_accuracy && this.gameState.score.stage3 < badge.criteria.code_accuracy) {
                earned = false;
            }
            if (badge.criteria.word_accuracy && this.gameState.score.stage3 < badge.criteria.word_accuracy) {
                earned = false;
            }

            if (earned) {
                this.gameState.earnedBadges.push({ key, ...badge });
            }
        });

        // Ensure at least bronze badge
        if (this.gameState.earnedBadges.length === 0) {
            this.gameState.earnedBadges.push({
                key: 'bronze_challenger',
                ...this.badgesConfig.bronze_challenger
            });
        }

        console.log('Earned badges:', this.gameState.earnedBadges);
    }

    showResults() {
        console.log('Showing results...');
        this.showScreen('results');

        const completionTime = (this.gameState.endTime - this.gameState.startTime) / 1000;
        const accuracy = (this.gameState.score.totalCorrect / this.gameState.score.totalQuestions) * 100;

        const winnerNameEl = document.getElementById('winner-name');
        const completionTimeEl = document.getElementById('completion-time');
        const accuracyEl = document.getElementById('accuracy-score');
        const hintsUsedEl = document.getElementById('hints-used');

        if (winnerNameEl) winnerNameEl.textContent = this.gameState.playerName;
        if (completionTimeEl) completionTimeEl.textContent = `${Math.floor(completionTime)}s`;
        if (accuracyEl) accuracyEl.textContent = `${Math.round(accuracy)}%`;
        if (hintsUsedEl) hintsUsedEl.textContent = this.gameState.score.hintsUsed;

        // Show badges
        const badgesContainer = document.getElementById('badges-container');
        if (badgesContainer) {
            badgesContainer.innerHTML = '';

            this.gameState.earnedBadges.forEach(badge => {
                const badgeElement = document.createElement('div');
                badgeElement.className = 'badge-item earned';
                badgeElement.innerHTML = `
                    <div class="badge-icon">${badge.icon}</div>
                    <div class="badge-name">${badge.name}</div>
                    <div class="badge-description">${badge.description}</div>
                `;
                badgesContainer.appendChild(badgeElement);
            });
        }

        // Certificate
        const certNameEl = document.getElementById('certificate-name');
        const certDateEl = document.getElementById('certificate-date');
        const primaryBadgeEl = document.getElementById('primary-badge');

        if (certNameEl) certNameEl.textContent = this.gameState.playerName;
        if (certDateEl) certDateEl.textContent = new Date().toLocaleDateString();

        const primaryBadge = this.gameState.earnedBadges[0];
        if (primaryBadgeEl) primaryBadgeEl.textContent = primaryBadge.icon;

        // Trigger celebration animation
        setTimeout(() => {
            this.showCelebration();
        }, 500);
    }

    showCelebration() {
        // Add balloons or confetti effect
        const celebration = document.querySelector('.celebration');
        if (celebration) celebration.classList.add('pulse');

        // Create floating badges animation
        this.gameState.earnedBadges.forEach((badge, index) => {
            setTimeout(() => {
                const badgeElements = document.querySelectorAll('.badge-item');
                if (badgeElements[index]) {
                    badgeElements[index].classList.add('pulse');
                }
            }, index * 200);
        });
    }

    showHint() {
        this.gameState.score.hintsUsed++;

        let hintText = '';

        if (this.gameState.currentStage === 1) {
            hintText = 'Look for missing punctuation or syntax errors in the code.';
        } else if (this.gameState.currentStage === 2) {
            hintText = 'Think about fundamental concepts in computer science and programming.';
        } else if (this.gameState.currentStage === 3) {
            hintText = `Word hint: ${this.gameState.currentWordScramble.hint}`;
        }

        alert(`💡 Hint: ${hintText}`);
    }

    shareOnSocial(platform) {
        const primaryBadge = this.gameState.earnedBadges[0];
        const completionTime = Math.floor((this.gameState.endTime - this.gameState.startTime) / 1000);

        let message = this.socialSharing[platform].template
            .replace('{badge_name}', primaryBadge.name)
            .replace('{completion_time}', completionTime);

        const encodedMessage = encodeURIComponent(message);
        let url = '';

        switch (platform) {
            case 'instagram':
                // Instagram doesn't support direct sharing, so copy to clipboard
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(message).then(() => {
                        alert('Message copied to clipboard! Paste it in your Instagram post.');
                    }).catch(() => {
                        alert(`Share this message on Instagram:\n\n${message}`);
                    });
                } else {
                    alert(`Share this message on Instagram:\n\n${message}`);
                }
                return;
            case 'linkedin':
                url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodedMessage}`;
                break;
            case 'twitter':
                url = `https://twitter.com/intent/tweet?text=${encodedMessage}`;
                break;
        }

        if (url) {
            window.open(url, '_blank');
        }
    }

    updateLeaderboard() {
        const completionTime = Math.floor((this.gameState.endTime - this.gameState.startTime) / 1000);
        const accuracy = Math.round((this.gameState.score.totalCorrect / this.gameState.score.totalQuestions) * 100);
        const primaryBadge = this.gameState.earnedBadges[0];

        const entry = {
            name: this.gameState.playerName,
            time: completionTime,
            accuracy: accuracy,
            badge: primaryBadge.name,
            timestamp: Date.now()
        };

        this.gameState.leaderboard.push(entry);
        this.gameState.leaderboard.sort((a, b) => a.time - b.time);
        this.gameState.leaderboard = this.gameState.leaderboard.slice(0, 10); // Keep top 10

        this.saveLeaderboard();
        this.updateMiniLeaderboard();
    }

    showLeaderboard() {
        this.showScreen('leaderboard');

        const leaderboardContainer = document.getElementById('full-leaderboard');
        if (leaderboardContainer) {
            leaderboardContainer.innerHTML = '';

            this.gameState.leaderboard.forEach((entry, index) => {
                const entryElement = document.createElement('div');
                entryElement.className = 'leaderboard-entry';
                if (entry.name === this.gameState.playerName && Math.abs(entry.timestamp - this.gameState.endTime) < 1000) {
                    entryElement.classList.add('current-user');
                }

                entryElement.innerHTML = `
                    <div class="entry-rank">#${index + 1}</div>
                    <div class="entry-info">
                        <div class="entry-name">${entry.name}</div>
                        <div class="entry-badge">${entry.badge}</div>
                    </div>
                    <div class="entry-stats">
                        <div class="entry-time">${entry.time}s</div>
                        <div class="entry-accuracy">${entry.accuracy}%</div>
                    </div>
                `;

                leaderboardContainer.appendChild(entryElement);
            });
        }
    }

    updateMiniLeaderboard() {
        const miniLeaderboard = document.getElementById('mini-leaderboard');
        if (!miniLeaderboard) return;

        miniLeaderboard.innerHTML = '';

        const topEntries = this.gameState.leaderboard.slice(0, 3);

        if (topEntries.length === 0) {
            // Show placeholder entries
            const placeholders = [
                { name: 'Anonymous', time: '45s', rank: '1st' },
                { name: 'Anonymous', time: '52s', rank: '2nd' },
                { name: 'Anonymous', time: '58s', rank: '3rd' }
            ];

            placeholders.forEach(entry => {
                const entryElement = document.createElement('div');
                entryElement.className = 'leader-entry';
                entryElement.innerHTML = `
                    <span class="rank">${entry.rank}</span>
                    <span class="name">${entry.name}</span>
                    <span class="time">${entry.time}</span>
                `;
                miniLeaderboard.appendChild(entryElement);
            });
        } else {
            topEntries.forEach((entry, index) => {
                const entryElement = document.createElement('div');
                entryElement.className = 'leader-entry';
                const ranks = ['1st', '2nd', '3rd'];
                entryElement.innerHTML = `
                    <span class="rank">${ranks[index]}</span>
                    <span class="name">${entry.name}</span>
                    <span class="time">${entry.time}s</span>
                `;
                miniLeaderboard.appendChild(entryElement);
            });
        }
    }

    resetGame() {
        console.log('Resetting game...');
        this.stopTimer();
        this.gameState = {
            currentScreen: 'welcome',
            playerName: '',
            difficulty: 'medium',
            currentStage: 1,
            startTime: null,
            endTime: null,
            score: {
                stage1: 0,
                stage2: 0,
                stage3: 0,
                hintsUsed: 0,
                totalCorrect: 0,
                totalQuestions: 0
            },
            currentPuzzle: null,
            currentTrivia: null,
            currentWordScramble: null,
            currentCodeArrange: null,
            earnedBadges: [],
            leaderboard: this.gameState.leaderboard, // Keep leaderboard
            stageAnswered: false
        };

        const nameInput = document.getElementById('player-name');
        if (nameInput) nameInput.value = '';
        this.showScreen('welcome');
    }

    updateProgress(stage) {
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            const percentage = (stage / 3) * 100;
            progressFill.style.width = `${percentage}%`;
        }
    }

    showError(message) {
        alert(`❌ ${message}`);
    }

    loadLeaderboard() {
        try {
            const saved = localStorage.getItem('codebreaker-leaderboard');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    }

    saveLeaderboard() {
        try {
            localStorage.setItem('codebreaker-leaderboard', JSON.stringify(this.gameState.leaderboard));
        } catch (e) {
            // LocalStorage not available, continue without saving
            console.log('LocalStorage not available');
        }
    }

    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing Codebreaker Challenge...');
    new CodebreakerChallenge();
});