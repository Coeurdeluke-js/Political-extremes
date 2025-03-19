document.addEventListener('DOMContentLoaded', () => {
    const scenarios = document.querySelectorAll('.scenario');
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popup-title');
    const popupMessage = document.getElementById('popup-message');
    const popupClose = document.getElementById('popup-close');
    const presentationPopup = document.getElementById('presentation-popup');
    const presentationContent = document.querySelector('.presentation-content');
    let currentScenario = 0;
    let nextScenario = 0;

    function showScenario(index) {
        // Remove active class from all scenarios
        scenarios.forEach((scenario) => {
            scenario.classList.remove('active');
        });
        
        // Hide all scenarios first
        scenarios.forEach((scenario, i) => {
            scenario.style.display = 'none';
        });
        
        // Show the current scenario
        scenarios[index].style.display = 'block';
        
        // Trigger a reflow to ensure the transition works
        scenarios[index].offsetHeight;
        
        // Add active class to fade it in
        setTimeout(() => {
            scenarios[index].classList.add('active');
        }, 50);
    }

    function showPopup(title, message) {
        popupTitle.innerHTML = title;
        popupMessage.innerHTML = message;
        popup.style.display = 'flex';
        
        // Trigger reflow
        popup.offsetHeight;
        
        // Add show class to fade in
        popup.classList.add('show');
    }

    function hidePopup() {
        popup.classList.remove('show');
        popup.classList.add('hide');
        
        setTimeout(() => {
            popup.style.display = 'none';
            popup.classList.remove('hide');
            
            // If there's a next scenario to show, show it after popup is hidden
            if (nextScenario !== currentScenario) {
                setTimeout(() => {
                    currentScenario = nextScenario;
                    showScenario(currentScenario);
                }, 300);
            }
        }, 500);
    }

    function showPresentation() {
        // Add the presentation-active class to the body to prevent scrolling
        document.body.classList.add('presentation-active');
        
        // Display the presentation popup
        presentationPopup.style.display = 'flex';
        
        // Trigger reflow
        presentationPopup.offsetHeight;
        
        // Add show class to fade in the popup
        presentationPopup.classList.add('show');
        
        // Show the content with a slight delay
        setTimeout(() => {
            presentationContent.classList.add('show');
            
            // Show logo after content is visible
            setTimeout(showLogo, 1000);
        }, 500);
    }

    function showLogo() {
        const logo = document.querySelector('.presentation-logo');
        logo.classList.add('show');
        
        // Show words after logo is visible
        setTimeout(showWords, 1000);
    }

    function showWords() {
        const words = document.querySelector('.presentation-words');
        words.classList.add('show');
        
        // Hide everything after words are shown
        setTimeout(() => {
            // First hide the content
            presentationContent.classList.remove('show');
            presentationContent.classList.add('hide');
            
            // Then hide the popup and background
            setTimeout(hidePresentation, 1000);
        }, 2000);
    }

    function hidePresentation() {
        // Hide the presentation popup
        presentationPopup.classList.remove('show');
        presentationPopup.classList.add('hide');
        
        // After transitions complete, clean up
        setTimeout(() => {
            presentationPopup.style.display = 'none';
            presentationPopup.classList.remove('hide');
            presentationContent.classList.remove('hide');
            document.body.classList.remove('presentation-active');
            
            // Reset logo and words
            document.querySelector('.presentation-logo').classList.remove('show');
            document.querySelector('.presentation-words').classList.remove('show');
            
            // Show the first scenario
            showScenario(currentScenario);
        }, 500);
    }

    scenarios.forEach((scenario, index) => {
        scenario.querySelectorAll('.buttons button').forEach(button => {
            button.addEventListener('click', () => {
                const choice = button.dataset.choice;
                const scenarioId = parseInt(button.dataset.scenario);
                let message = "";
                let title = "";

                if (scenarioId === 1) {
                    if (choice === 'left') {
                        title = `<span style="color: #ec4d58;">Left-Wing</span>`;
                        message = "Redistributing resources would help the outer rim planets, but the empire prioritizes military strength.";
                    } else {
                        title = `<span style="color: #ec4d58;">Right-Wing</span>`;
                        message = "Focusing on the military and core worlds strengthens imperial power, but neglects the outer rim.";
                    }
                    // Set up next scenario
                    nextScenario = 1;
                } else if (scenarioId === 2) {
                    if (choice === 'left') {
                        title = `<span style="color: #ec4d58;">Left-Wing</span>`;
                        message = "Dialogue could address the rebellion's root causes, but the Empire prefers force.";
                    } else {
                        title = `<span style="color: #ec4d58;">Right-Wing</span>`;
                        message = "Crushing the rebellion enforces order, but can lead to more resentment.";
                    }
                    // Set up next scenario
                    nextScenario = 2;
                } else if (scenarioId === 3) {
                    if (choice === 'left') {
                        title = `<span style="color: #ec4d58;">Left-Wing</span>`;
                        message = "Multiculturalism promotes equality, but the Empire favors a uniform culture.";
                    } else {
                        title = `<span style="color: #ec4d58;">Right-Wing</span>`;
                        message = "Enforcing a uniform culture maintains control, but suppresses diversity.";
                    }
                    // Set up next scenario - loop back to the beginning
                    nextScenario = 0;
                }

                // Move to the next scenario after the current one
                nextScenario = (index + 1) % scenarios.length;
                
                showPopup(title, message);
            });
        });
    });

    popupClose.addEventListener('click', () => {
        hidePopup();
    });

    // Start the presentation after a short delay to ensure DOM is fully loaded
    setTimeout(showPresentation, 100);
});