document.addEventListener('DOMContentLoaded', () => {
    // Quiz elements
    const sections = document.querySelectorAll('.quiz-section');
    const progressBar = document.querySelector('.progress');
    const ageSlider = document.getElementById('ageSlider');
    const sliderThumb = document.querySelector('.slider-thumb');
    
    let currentSection = 0;
    const totalSections = sections.length;
    const userAnswers = {};
    let selectedScentCount = 0;

    // Initialize first section and progress
    updateSection(currentSection);
    updateProgress();

    // Handle age slider
    if (ageSlider && document.querySelector('.slider-thumb')) {
        const updateSliderValue = () => {
            const value = ageSlider.value;
            const percent = (value - ageSlider.min) / (ageSlider.max - ageSlider.min) * 100;
            const thumb = document.querySelector('.slider-thumb');
            
            // Update thumb position and text
            thumb.style.left = `${percent}%`;
            thumb.textContent = value;
            
            userAnswers['age'] = value;
            enableNextButton(sections[currentSection]);
        };

        // Set initial value
        updateSliderValue();
        
        // Update on slider movement
        ageSlider.addEventListener('input', updateSliderValue);
        ageSlider.addEventListener('change', updateSliderValue);
    }

    // Handle section transitions
    document.addEventListener('click', (e) => {
        // Arrow down button handling
        if (e.target.closest('.arrow-down')) {
            moveToNextSection();
        }

        // Option selection handling
        if (e.target.closest('.option') || e.target.closest('.split-half')) {
            const option = e.target.closest('.option') || e.target.closest('.split-half');
            const section = option.closest('.quiz-section');
            
            // Handle scent family special case (max 2 selections)
            if (section.id === 'scentFamily') {
                handleScentFamilySelection(option);
            } else if (section.id === 'gender') {
                // Remove selection and tick from all options
                section.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                    const tick = opt.querySelector('.tick-mark');
                    if (tick) {
                        tick.style.animation = 'none';
                        tick.offsetHeight; // Trigger reflow
                        tick.style.animation = null;
                    }
                });
                
                // Add selection and animate tick
                option.classList.add('selected');
                const tick = option.querySelector('.tick-mark');
                if (tick) {
                    tick.style.animation = 'tickAppear 0.3s cubic-bezier(.68,-0.55,.27,1.55) forwards';
                }
                
                userAnswers[section.id] = option.dataset.value;
                setTimeout(moveToNextSection, 500);
                return;
            } else if (section.id === 'skinTone') {
                // Single selection for skin tone section with tick mark
                section.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                    const tick = opt.querySelector('.tick-mark');
                    if (tick) {
                        tick.style.animation = 'none';
                        tick.offsetHeight; // Trigger reflow
                        tick.style.animation = null;
                    }
                });
                option.classList.add('selected');
                const tick = option.querySelector('.tick-mark');
                if (tick) {
                    tick.style.animation = 'tickAppear 0.3s cubic-bezier(.68,-0.55,.27,1.55) forwards';
                }
                userAnswers[section.id] = option.dataset.value;
                setTimeout(moveToNextSection, 500);
                return;
            } else if (section.id === 'securityVsAdventure') {
                handleSecurityVsAdventureSelection(option);
                return;
            } else {
                // Single selection for other sections
                section.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                option.classList.add('selected');
                
                // Store answer
                userAnswers[section.id] = option.dataset.value;
                
                // Enable next button or auto-advance
                if (section.querySelector('.next-btn')) {
                    enableNextButton(section);
                } else {
                    setTimeout(moveToNextSection, 500);
                }
            }
        }

        // Next button handling
        if (e.target.classList.contains('next-btn')) {
            moveToNextSection();
        }
    });

    // Skin tone hover animation (expand/shrink with keyframes)
    const skinToneOptions = document.querySelectorAll('#skinTone .skin-right .option');
    skinToneOptions.forEach(option => {
        option.addEventListener('mouseenter', () => {
            option.classList.remove('skin-animate-shrink');
            option.classList.add('skin-animate-expand');
        });
        option.addEventListener('mouseleave', () => {
            option.classList.remove('skin-animate-expand');
            option.classList.add('skin-animate-shrink');
            // Remove shrink class after animation so it can be triggered again
            option.addEventListener('animationend', function handler(e) {
                if (e.animationName === 'skinToneShrink') {
                    option.classList.remove('skin-animate-shrink');
                    option.removeEventListener('animationend', handler);
                }
            });
        });
    });

    // Add mouse move tracking for split section hover effect
    const splitSection = document.querySelector('#securityVsAdventure');
    if (splitSection) {
        const splitHalves = splitSection.querySelectorAll('.split-half');
        
        splitHalves.forEach(half => {
            half.addEventListener('mousemove', (e) => {
                const rect = half.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element
                const y = e.clientY - rect.top;  // y position within the element
                
                // Update CSS variables for the gradient
                half.style.setProperty('--mouse-x', `${x}px`);
                half.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    function handleScentFamilySelection(option) {
        if (option.classList.contains('selected')) {
            option.classList.remove('selected');
            selectedScentCount--;
        } else if (selectedScentCount < 2) {
            option.classList.add('selected');
            selectedScentCount++;
        }

        // Store selected scents
        const selectedScents = Array.from(option.closest('.options').querySelectorAll('.selected'))
            .map(opt => opt.dataset.value);
        userAnswers.scentFamily = selectedScents;

        // Enable next button if at least one scent is selected
        if (selectedScentCount > 0) {
            enableNextButton(option.closest('.quiz-section'));
        }
    }

    function handleSecurityVsAdventureSelection(selectedOption) {
        const securityOption = document.querySelector('#securityVsAdventure .left-option');
        const adventureOption = document.querySelector('#securityVsAdventure .right-option');
        
        // Remove any existing animation classes
        securityOption.classList.remove('selected', 'fade-out', 'animating');
        adventureOption.classList.remove('selected', 'fade-out', 'animating');
        
        // Add animating class to both to disable hover
        securityOption.classList.add('animating');
        adventureOption.classList.add('animating');
        
        // Add selected class to clicked option
        selectedOption.classList.add('selected');
        
        // Make sure tick mark exists and is properly positioned
        let tickMark = selectedOption.querySelector('.tick-mark');
        if (!tickMark) {
            tickMark = document.createElement('div');
            tickMark.className = 'tick-mark';
            tickMark.innerHTML = '✓';
            selectedOption.appendChild(tickMark);
        }
        
        // Add fade-out to non-selected option
        const nonSelectedOption = selectedOption === securityOption ? adventureOption : securityOption;
        nonSelectedOption.classList.add('fade-out');
        
        // Store the selection
        userAnswers['securityVsAdventure'] = selectedOption.dataset.value;
        
        // Remove animating class after animation completes
        setTimeout(() => {
            securityOption.classList.remove('animating');
            adventureOption.classList.remove('animating');
        }, 1000);
        
        // Delay the transition to next section
        setTimeout(() => {
            moveToNextSection();
        }, 2000);
    }

    document.querySelector('#securityVsAdventure .left-option').addEventListener('click', function(e) {
        handleSecurityVsAdventureSelection(this);
    });

    document.querySelector('#securityVsAdventure .right-option').addEventListener('click', function(e) {
        handleSecurityVsAdventureSelection(this);
    });

    function moveToNextSection() {
        if (currentSection < totalSections - 1) {
            currentSection++;
            updateSection(currentSection);
            updateProgress();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            showResults();
        }
    }

    function updateSection(index) {
        sections.forEach((section, i) => {
            section.classList.remove('active');
            if (i === index) {
                section.classList.add('active');
            }
        });
    }

    function updateProgress() {
        const progress = ((currentSection + 1) / totalSections) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function enableNextButton(section) {
        const nextBtn = section.querySelector('.next-btn');
        if (nextBtn) {
            nextBtn.classList.add('active');
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
        }
    }

    function showResults() {
        // Analyze answers and generate recommendation
        const recommendation = generateRecommendation(userAnswers);
        
        // Update UI with recommendation
        const quizContainer = document.querySelector('.quiz-container');
        quizContainer.innerHTML = `
            <div class="results-container">
                <div class="recommendation-card">
                    <img src="${recommendation.image}" alt="${recommendation.name}">
                    <h2>${recommendation.name}</h2>
                    <p>${recommendation.description}</p>
                    <p class="price">${recommendation.price}</p>
                    <button onclick="window.location.href='${recommendation.link}'" class="shop-now-btn">Shop Now</button>
                </div>
            </div>
        `;
    }

    function generateRecommendation(answers) {
        // Map user preferences to fragrance recommendations
        const recommendations = {
            freshElegant: {
                male: {
                    woody: {
                        image: '../img/perfumes-transparent/bleu-de-chanel.png',
                        name: 'Bleu de Chanel',
                        description: 'A fresh and elegant woody fragrance with citrus notes.',
                        price: '€270',
                        link: 'all-fragrances.html'
                    }
                },
                female: {
                    floral: {
                        image: '../img/perfumes-transparent/burberry-her.png',
                        name: 'Burberry Her',
                        description: 'A fresh and vibrant floral fragrance.',
                        price: '€200',
                        link: 'all-fragrances.html'
                    }
                }
            },
            seductiveBold: {
                male: {
                    oriental: {
                        image: '../img/perfumes-transparent/spicebomb-extreme.png',
                        name: 'Spicebomb Extreme',
                        description: 'An intense and seductive oriental fragrance.',
                        price: '€270',
                        link: 'all-fragrances.html'
                    }
                },
                female: {
                    floral: {
                        image: '../img/perfumes-transparent/flower-bomb.png',
                        name: 'Flower Bomb',
                        description: 'A seductive and bold floral fragrance.',
                        price: '€200',
                        link: 'all-fragrances.html'
                    }
                }
            }
        };

        // Default recommendation
        let recommendation = {
            image: '../img/perfumes-transparent/bleu-de-chanel.png',
            name: 'Bleu de Chanel',
            description: 'A versatile and sophisticated fragrance suitable for any occasion.',
            price: '€270',
            link: 'fragrances-page'
        };

        // Logic to choose recommendation based on answers
        const style = answers.desiredFeeling === 'fresh' ? 'freshElegant' : 'seductiveBold';
        const gender = answers.gender || 'neutral';
        const scent = answers.scentFamily ? answers.scentFamily[0] : 'woody';

        try {
            if (recommendations[style][gender][scent]) {
                recommendation = recommendations[style][gender][scent];
            }
        } catch (e) {
            // Use default recommendation if specific combination not found
        }

        return recommendation;
    }
});